import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// ✅ Define storage settings
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = "SheLeadsFinance";
    let allowedFormats = ["jpg", "png", "jpeg"];

    // ✅ Handle different file types
    if (file.mimetype === "application/pdf") {
      folder = "SheLeadsFinance/PDFs";
      allowedFormats = ["pdf"];
    } else if (file.mimetype.startsWith("video/")) {
      folder = "SheLeadsFinance/Videos";
      allowedFormats = ["mp4", "mov", "avi"];
    }

    return {
      folder,
      format: allowedFormats.includes(file.mimetype.split("/")[1]) ? file.mimetype.split("/")[1] : "jpg",
      resource_type: file.mimetype.startsWith("video/") ? "video" : "auto",
    };
  },
});

// ✅ Define file filter for security
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf", "video/mp4", "video/mov", "video/avi"];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images, PDFs, and videos are allowed."), false);
  }
};

// ✅ Define upload settings
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
  fileFilter,
});

// ✅ Export different upload options
export const uploadImages = upload.array("images", 5);
export const uploadSingleImage = upload.single("image");
export const uploadPdf = upload.single("pdf");
export const uploadVideo = upload.single("video");

export default upload;
