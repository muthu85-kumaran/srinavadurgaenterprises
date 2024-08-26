"use server";
import { Product, ProductSchema } from "@/types/Product";
import { getErrorMessage } from "@/lib/utils";
import { ZodIssue } from "zod";
import db from "@/db/database";
import {
  S3Client,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const SaveProductAction = async (newProduct: Product) => {
  var responseData: unknown | Product;
  var error: unknown | string | ZodIssue[];

  const validation = ProductSchema.safeParse(newProduct);

  if (validation.error) {
    error = validation.error.format();
    return { data: null, error, success: false };
  }

  const data = validation.data!!; // Ensure data is not undefined

  try {
    if (validation.success && validation.data) {
      if (data.id !== null && data.id !== undefined && data.id !== "") {
        responseData = await db.product.update({
          where: { id: data.id as string },
          data: data,
        });
        return { data: responseData, error, success: true };
      } else {
        data.id = undefined;

        const existingProduct = await db.product.findFirst({
          where: { name: data.name },
        });
        if (existingProduct) {
          error = "Product already exists with this name.";
          return { data: null, error, success: false };
        }

        responseData = await db.product.create({
          data: data,
        });
        return { data: responseData, error, success: true };
      }
    } else {
      error = "Please Enter a valid Data.";
      return { data: null, error, success: false };
    }
  } catch (error) {
    error = getErrorMessage(error);
    return { data: null, error, success: false };
  }

  // if (data?.id) revalidatePath("/admin/product/add");
  // else revalidatePath(`/admin/product/${data?.id}`);
};

export const listProductAction = async () => {
  try {
    const data = await db.product.findMany({
      relationLoadStrategy: "join",
      include: GetProductInclude,
    });
    const s3BucketName = process.env.AWS_S3_BUCKET_NAME?.toString() || "";
    const client = new S3Client({
      credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
      },
      region: process.env.AWS_S3_REGION,
    });

    const result = await updataImageUrlsCall(data, s3BucketName, client);

    return { data: result, error: null, success: true };
  } catch (error) {
    error = getErrorMessage(error);
    return { error, success: false };
  }
};

async function updataImageUrlsCall(
  data: GetProductType[],
  s3BucketName: string,
  client: S3Client
) {
  data.map(async (item) => {
    const ss = await updateImageUrls(item.pImages, s3BucketName, client);
    item.pImages = ss;
    return item;
  });
  return data;
}

const getProductImagesInclude = Prisma.validator<Prisma.ProductImageInclude>()({
  product: true,
});

const GetProductInclude = Prisma.validator<Prisma.ProductInclude>()({
  productTax: true,
  discount: true,
  pImages: {
    include: getProductImagesInclude,
  },
});
export type GetProductType = Prisma.ProductGetPayload<{
  include: typeof GetProductInclude;
}>;

export const getProductAction = async (id: string) => {
  var data: unknown | Product;
  var error: unknown | string | ZodIssue[];
  try {
    data = await db.product.findUnique({ where: { id } });
    return { data, error, success: true };
  } catch (error) {
    error = getErrorMessage(error);
    return { data: null, error, success: false };
  }
};

export type getProductImagesType = Prisma.ProductImageGetPayload<{
  include: typeof getProductImagesInclude;
}>;
const updateImageUrls = async (
  data: getProductImagesType[],
  s3BucketName: string,
  client: S3Client
) => {
  const promises = data.map(async (p) => {
    const segments = p.imageUrl.split("/");
    const filename = segments[segments.length - 1];

    const command = new GetObjectCommand({
      Bucket: s3BucketName,
      Key: `productimages/${filename}`,
    });

    const url = await getSignedUrl(client, command, { expiresIn: 3600 * 10 }); //2 minute  ,
    p.imageUrl = url;
    return p;
  });

  return Promise.all(promises);
};
export const getProductImages = async (id: string) => {
  try {
    const data = await db.productImage.findMany({
      where: {
        productId: id,
      },
      include: getProductImagesInclude,
    });

    const s3BucketName = process.env.AWS_S3_BUCKET_NAME?.toString() || "";
    const client = new S3Client({
      credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
      },
      region: process.env.AWS_S3_REGION,
    });
    const ss = await updateImageUrls(data, s3BucketName, client);
    return { success: true, data: ss, error: null };
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export const SetDefaultImageAction = async (id: string) => {
  try {
    const res = await db.productImage.findUniqueOrThrow({
      where: {
        id,
      },
    });

    const data = await db.productImage.update({
      where: {
        id,
      },
      data: {
        isMain: true,
      },
    });
    const resetismain = await db.productImage.updateMany({
      where: {
        NOT: {
          id,
        },
      },
      data: {
        isMain: false,
      },
    });
    revalidatePath(`/admin/product/${id}/imageupload`);
    return { success: true, data: data };
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export const DeleteImageAction = async (id: string) => {
  try {
    const exists = await db.productImage.findUniqueOrThrow({
      where: {
        id,
      },
    });

    const s3BucketName = process.env.AWS_S3_BUCKET_NAME?.toString() || "";
    const client = new S3Client({
      credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
      },
      region: process.env.AWS_S3_REGION,
    });
    const segments = exists.imageUrl.split("/");
    const filename = segments[segments.length - 1];

    const command = new DeleteObjectCommand({
      Bucket: s3BucketName,
      Key: `productimages/${filename}`,
    });

    const delimg = await client.send(command);

    const deleteitem = await db.productImage.delete({
      where: {
        id,
      },
    });

    revalidatePath(`/product/${id}/imageupload`);
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
};
