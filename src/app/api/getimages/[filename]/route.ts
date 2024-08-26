import { NextResponse, type NextRequest } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export async function GET(request: NextRequest) {
  const accessKeyId = process.env.AWS_S3_ACCESS_KEY;
  const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;
  const s3BucketName = process.env.AWS_S3_BUCKET_NAME;
  if (!accessKeyId || !secretAccessKey || !s3BucketName) {
    return new Response(null, { status: 500 });
  }
  const searchParams = request.nextUrl.searchParams;
  const fileName = searchParams.get("filename");
  //   const contentType = searchParams.get("contentType");
  if (!fileName) {
    return new Response(null, { status: 500 });
  }

  const client = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
  const command = new GetObjectCommand({
    Bucket: s3BucketName,
    Key: `productimages/${fileName}`,
    // ContentType: contentType,
  });
  const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
  console.log(signedUrl);
  if (signedUrl) return NextResponse.json({ signedUrl });
  return new Response(null, { status: 500 });
}
