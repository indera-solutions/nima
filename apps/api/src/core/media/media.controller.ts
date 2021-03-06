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
import { ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Express } from 'express';
import 'multer';
import { IsStaff } from '../../auth/auth.decorator';
import { ApiFile } from '../core.decorator';
import { MediaDto, MediaListPaginated } from '../dto/media.dto';
import { MediaService } from './media.service';


@Controller('media')
@ApiTags('Media')
@ApiBearerAuth()
export class MediaController {
	constructor(private readonly mediaService: MediaService) {
	}

	@Post()
	@UseInterceptors(FileInterceptor('file'))
	@ApiConsumes('multipart/form-data')
	@ApiCreatedResponse({ type: () => MediaDto })
	@ApiFile()
	@IsStaff()
	async createMedia(@UploadedFile() file: Express.Multer.File) {
		const res = await this.mediaService.handleUploadedFile(file);
		return MediaDto.prepare(res);
	}

	@Get()
	@ApiQuery({ type: Number, required: false, name: 'page' })
	@ApiQuery({ type: Number, required: false, name: 'pageSize' })
	@ApiQuery({ type: String, required: false, name: 'search' })
	@ApiOkResponse({ type: MediaListPaginated })
	@IsStaff()
	async listMedia(
		@Query('page') page?: number,
		@Query('pageSize') pageSize?: number,
		@Query('search') search?: string,
	): Promise<MediaListPaginated> {
		const res = await this.mediaService.list({
			page,
			pageSize,
			search,
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
	@IsStaff()
	async getById(@Param('id', ParseIntPipe) id: number) {
		const res = await this.mediaService.getById({ id: id });
		return MediaDto.prepare(res);
	}

	@Delete(':id')
	@ApiOkResponse({ type: MediaDto })
	@IsStaff()
	async deleteById(@Param('id', ParseIntPipe) id: number) {
		const res = await this.mediaService.deleteById({ id: id });
		return MediaDto.prepare(res);
	}
}
