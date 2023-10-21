import { useEffect, useState } from "react";
import {
  APIdownloadFolder,
  APIdownloadfile,
} from "../../../APIService/localAPI";

function handleDownloadFile(folderName, path, fileName) {
  const URLdownload =
    APIdownloadfile + "/" + folderName + "/" + path + "/" + fileName;
  window.location.href = URLdownload;
}

function handleDownloadFolder(folderName) {
  const URLdownload = APIdownloadFolder + "/" + folderName + ".rar";
  window.location.href = URLdownload;
}

export { handleDownloadFile, handleDownloadFolder };
