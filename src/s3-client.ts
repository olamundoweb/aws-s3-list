import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';

type S3ServiceOptions = {
  bucket: string;
  region?: string;
};

export class S3Service {
  private s3Client: S3Client;

  constructor(private readonly config: S3ServiceOptions) {
    this.s3Client = new S3Client({ region: config.region });
  }

  async listObjects() {
    const command = new ListObjectsV2Command({
      Bucket: this.config.bucket,
    });

    return this.s3Client.send(command);
  }
}
