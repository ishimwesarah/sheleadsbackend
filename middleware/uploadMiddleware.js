import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "SheLeadsFinance",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });
export const uploadImages = upload.array("images", 5);

export default upload;
