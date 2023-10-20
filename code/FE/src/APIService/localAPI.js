const APIservice = "http://localhost:3001";
const APIupload = APIservice + "/upload";
const APIdownload = APIservice + "/show/download/";
const APIgetDataByFolderName = APIservice + "/show/detail?folderName=";
const APIdeleteFile = APIservice + "/delete/file/";

export { APIupload, APIdownload, APIgetDataByFolderName, APIdeleteFile };
