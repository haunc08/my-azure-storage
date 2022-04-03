var express = require("express");
var router = express.Router();
const { v1: uuidv1 } = require("uuid");
const { BlobServiceClient } = require("@azure/storage-blob");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const auth = require("../middlewares/auth");

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING
);

const storageHost = "https://haublobstorage.blob.core.windows.net";

const getContainerClient = (containerName) => {
  return blobServiceClient.getContainerClient(containerName);
};

router.post(
  "/:containerName",
  auth,
  upload.single("file"),
  async ({ file, params }, res, next) => {
    try {
      const { containerName } = params;
      const blobNameArr = file.originalname.split(".");
      blobNameArr.splice(1, 0, "_", uuidv1(), ".");

      const blobName = blobNameArr.join("");

      const blockBlobClient =
        getContainerClient(containerName).getBlockBlobClient(blobName);

      const fileContent = fs.readFileSync(file.path);
      const uploadBlobResponse = await blockBlobClient.upload(
        fileContent,
        file.size
      );

      res.send({
        ...uploadBlobResponse,
        url: [storageHost, containerName, blobName].join("/"),
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:containerName/:name", auth, async ({ params }, res, next) => {
  try {
    const { containerName, name } = params;
    const blockBlobClient =
      getContainerClient(containerName).getBlockBlobClient(name);
    const deleteBlobResponse = await blockBlobClient.deleteIfExists();
    res.send(deleteBlobResponse);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
