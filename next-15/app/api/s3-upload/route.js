import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
});

async function uploadFileToS3(fileBuffer, fileName) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body: fileBuffer,
    ContentType: "image/jpeg",
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return fileName;
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    const file = formData.get("cat");

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer, file.name);

    return NextResponse.json({ success: true, fileName });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
