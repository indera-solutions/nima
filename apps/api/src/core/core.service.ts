import { PutObjectCommand, PutObjectCommandInput, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

export const PUBLIC_UPLOADS = process.env['S3_BUCKET'] ? process.env['S3_BUCKET'] : 'loomstack-looms3publicuploadsloomuploads3b777ca6-19e4oyqa6rxpm';

export const DOMAIN = process.env['DOMAIN'] ? process.env['DOMAIN'] : 'TEST';

@Injectable()
export class CoreService {

	constructor() {
	}

	async uploadFileToS3(body: Buffer | string, key: string) {
		const s3Client = new S3Client({
			region: 'eu-central-1',
		});

		const uploadParams: PutObjectCommandInput = {
			Bucket: PUBLIC_UPLOADS,
			Key: `${ DOMAIN }/${ key }`,
			Body: body,
		};

		try {
			const res = await s3Client.send(new PutObjectCommand(uploadParams));
			return { ...res, Key: uploadParams.Key };
		} catch ( e ) {
			console.error(e);
			return undefined;
		}
	}
}
