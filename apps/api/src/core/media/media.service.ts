import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { getSlug } from '@nima/utils';
import { Express } from 'express';
import { CoreService } from '../core.service';
import { CreateMediaDto } from '../dto/media.dto';
import { MediaEntity } from '../entities/media.entity';
import { MediaRepository } from '../entities/media.repository';

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

		const media = await this.saveMedia({
			dto: {
				name: originalFilename,
				slug: getSlug(originalFilename),
				url: 'https://loom-cdn.indera.gr/' + res.Key,
				mimeType: file.mimetype ? file.mimetype : '',
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

	async list(): Promise<MediaEntity[]> {
		return this.mediaRepository.find();
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
