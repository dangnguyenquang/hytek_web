import { useEffect, useState } from "react";
import { APIdownload } from "../../../APIService/localAPI";

function handleDownloadFile (folderName, path, fileName) {
  const URLdownload = APIdownload + folderName + "/" + path + "/" + fileName;
  window.location.href = URLdownload;
}

export default handleDownloadFile;
