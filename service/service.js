import dotenv from "dotenv";
dotenv.config();

import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export const uploadFile = async (buffer, fileName) => {
  try {
    const result = await imagekit.upload({
      file: buffer.toString("base64"),
      fileName: fileName,
    });

    return result;
  } catch (error) {
    console.log("ImageKit upload failed");
    console.log(JSON.stringify(error, null, 2));

    throw error;
  }
};
