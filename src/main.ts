import * as core from '@actions/core';
import { S3Service } from './s3-client';

const actionName = 'aws-s3-list';

const handleDebug = (str: string) => {
  core.debug(`[${actionName}]::${str}`);
};

const run = async (): Promise<void> => {
  const bucketName = core.getInput('bucket-name');

  const s3Client = new S3Service({ bucket: bucketName });

  const objects = await s3Client.listObjects();
  const objectskey = objects.Contents?.map(({ Key }) => Key);

  handleDebug(`Found "${objectskey?.length}" keys`);

  core.setOutput('objects-key', JSON.stringify(objectskey));
};

run().catch((err) => core.setFailed(err));
