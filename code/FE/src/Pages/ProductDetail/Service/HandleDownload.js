import { useEffect, useState } from "react";
import {
  APIExportExcel,
  APIdownloadFolder,
  APIdownloadfile,
} from "../../../APIService/localAPI";

function handleDownloadFile(customerName, folderName, path, fileName) {
  const URLdownload =
    APIdownloadfile +
    "/" +
    customerName +
    "/" +
    folderName +
    "/" +
    path +
    "/" +
    fileName;
  window.location.href = URLdownload;
}

function handleDownloadFolder(customerName, folderName) {
  const URLdownload =
    APIdownloadFolder + "/" + customerName + "/" + folderName + ".rar";
  window.location.href = URLdownload;
}

function handleExportReportFile(customerName) {
  const URLdownload = APIExportExcel + "/" + customerName;
  window.location.href = URLdownload;
}

export { handleDownloadFile, handleDownloadFolder, handleExportReportFile };
