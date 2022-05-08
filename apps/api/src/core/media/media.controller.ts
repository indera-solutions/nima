import { Controller, Delete, Get, Param, ParseIntPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Express } from 'express';
import 'multer';
import { ApiFile } from '../core.decorator';
import { MediaDto } from '../dto/media.dto';
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
	@ApiOkResponse({ type: [MediaDto] })
	async listMedia() {
		const res = await this.mediaService.list();
		return res.map(r => MediaDto.prepare(r));
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
