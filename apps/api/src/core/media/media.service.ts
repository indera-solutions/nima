import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { getSlug, PaginatedResults } from '@nima-cms/utils';
import { Express } from 'express';
import { CoreService } from '../core.service';
import { CreateMediaDto } from '../dto/media.dto';
import { MediaEntity } from '../entities/media.entity';
import { MediaRepository } from '../entities/media.repository';

const imageThumbnail = require('image-thumbnail');

@Injectable()
export class MediaService {

	constructor(
		private mediaRepository: MediaRepository,
		private coreService: CoreService,
	) {
	}

	async handleUploadedFile(file: Express.Multer.File): Promise<MediaEntity> {
		if ( file.mimetype === null ) throw new BadRequestException('INVALID_FILE_MIME_TYPE_IS_NULL');
		const originalFilename = file.originalname;
		if ( !originalFilename ) throw new Error('BAD_ORIGINAL_FILENAME');
		const res = await this.coreService.uploadFileToS3(file.buffer, originalFilename);
		if ( !res ) {
			throw new Error('S3_UPLOAD_FAILED');
		}

		let thumbnailUrl;
		if ( file.mimetype && file.mimetype.startsWith('image') ) {
			const thumbnail = await imageThumbnail(file.buffer, {
				width: 450,
				percentage: 60,
			});
			try {
				const thumbnails3res = await this.coreService.uploadFileToS3(thumbnail.buffer, 'thumbnail_' + originalFilename);
				if ( thumbnails3res ) {
					thumbnailUrl = 'https://loom-cdn.indera.gr/' + thumbnails3res.Key;
				}
			} catch ( e ) {
				console.log('Thumbnail failed', e);
			}
		}


		const media = await this.saveMedia({
			dto: {
				name: originalFilename,
				slug: getSlug(originalFilename),
				url: 'https://loom-cdn.indera.gr/' + res.Key,
				mimeType: file.mimetype ? file.mimetype : '',
				thumbnailUrl: thumbnailUrl,
				alt: {},
				byteSize: file.size,
			},
		});
		return media;
	}

	async saveMedia(params: { dto: CreateMediaDto }): Promise<MediaEntity> {
		const { dto } = params;
		if ( !dto ) throw new BadRequestException('INVALID_DTO');
		return this.mediaRepository.save(dto);
	}

	async list(params: { page?: number, pageSize?: number }): Promise<PaginatedResults<MediaEntity>> {
		const count = await this.mediaRepository.count();
		const pageSize = params.pageSize || 20;
		const take = pageSize;
		const skip = ((params.page || 1) - 1) * take;
		const res = await this.mediaRepository.find({
			skip,
			take,
			order: {
				created: 'DESC',
			},
		});

		return {
			items: res,
			pageNumber: params.page || 1,
			pageSize: pageSize,
			totalCount: count,
		};

	}

	async listOfMimeType(params: { mimeType: string }): Promise<MediaEntity[]> {
		const { mimeType } = params;
		if ( !mimeType ) throw new BadRequestException('INVALID_MIME_TYPE');
		return this.mediaRepository.listOfType(mimeType);
	}

	async getById(params: { id: number }): Promise<MediaEntity> {
		const { id } = params;
		if ( !id || typeof id !== 'number' ) throw new BadRequestException('INVALID_LOOM_MEDIA_ID');
		const res = await this.mediaRepository.findById(id);
		if ( !res ) throw new NotFoundException('LOOM_MEDIA_NOT_FOUND');
		return res;
	}

	async deleteById(params: { id: number }): Promise<MediaEntity> {
		const { id } = params;
		if ( !id || typeof id !== 'number' ) throw new BadRequestException('INVALID_LOOM_MEDIA_ID');
		const res = await this.mediaRepository.findById(id);
		if ( !res ) throw new NotFoundException('LOOM_MEDIA_NOT_FOUND');
		await this.mediaRepository.deleteById(id);
		return res;
	}
}