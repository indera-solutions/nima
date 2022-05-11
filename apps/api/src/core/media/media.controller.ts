import {
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Query,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Express } from 'express';
import 'multer';
import { ApiFile } from '../core.decorator';
import { MediaDto, MediaListPaginated } from '../dto/media.dto';
import { MediaService } from './media.service';


@Controller('media')
@ApiTags('Media')
export class MediaController {
	constructor(private readonly mediaService: MediaService) {
	}

	@Post()
	@UseInterceptors(FileInterceptor('file'))
	@ApiConsumes('multipart/form-data')
	@ApiCreatedResponse({ type: () => MediaDto })
	@ApiFile()
	async createMedia(@UploadedFile() file: Express.Multer.File) {
		const res = await this.mediaService.handleUploadedFile(file);
		return MediaDto.prepare(res);
	}

	@Get()
	@ApiQuery({ type: Number, required: false, name: 'page' })
	@ApiQuery({ type: Number, required: false, name: 'pageSize' })
	@ApiOkResponse({ type: MediaListPaginated })
	async listMedia(
		@Query('page') page?: number,
		@Query('pageSize') pageSize?: number,
	): Promise<MediaListPaginated> {
		const res = await this.mediaService.list({
			page,
			pageSize,
		});
		return {
			totalCount: res.totalCount,
			items: res.items.map(i => MediaDto.prepare(i)),
			pageSize: res.pageSize,
			pageNumber: res.pageNumber,
		};
	}

	@Get(':id')
	@ApiOkResponse({ type: MediaDto })
	async getById(@Param('id', ParseIntPipe) id: number) {
		const res = await this.mediaService.getById({ id: id });
		return MediaDto.prepare(res);
	}

	@Delete(':id')
	@ApiOkResponse({ type: MediaDto })
	async deleteById(@Param('id', ParseIntPipe) id: number) {
		const res = await this.mediaService.deleteById({ id: id });
		return MediaDto.prepare(res);
	}
}