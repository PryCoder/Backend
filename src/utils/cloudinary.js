import dotenv from 'dotenv';
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


cloudinary.config({
    cloud_name: "dijv9gtgo",
    api_key: "197425454285597",
    api_secret: "jKivvfd0EcG25n71lum1E7GKcnc"
});

  

const uploadOnCloudinary = async (localFilePath) => {
    console.log("Cloudinary Cloud Name: ", process.env.CLOUDINARY_CLOUD_NAME);
console.log("Cloudinary API Key: ", process.env.CLOUDINARY_API_KEY);
console.log("Cloudinary API Secret: ", process.env.CLOUDINARY_API_SECRET);

    try {
        if (!localFilePath) return null;

        // Upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // Check if the file exists before attempting to delete
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        } else {
            console.log(`Temporary file ${localFilePath} already deleted or does not exist.`);
        }

        return response;
    } catch (error) {
        // If the upload failed, check if the file exists before deleting
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath); // Remove the local file
        }
        console.error("Cloudinary upload failed: ", error);
        return null;
    }
};

export { uploadOnCloudinary };
