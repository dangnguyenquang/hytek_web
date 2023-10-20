import { useEffect, useState } from "react";

function handleDownloadFile (folderName, path, fileName) {
  const URLdownload = "http://localhost:3001/show/download/" + folderName + "/" + path + "/" + fileName;
  window.location.href = URLdownload;
}

export default handleDownloadFile;
