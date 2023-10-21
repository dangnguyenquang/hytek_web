const APIservice = "http://localhost:3001";
const APIupload = APIservice + "/upload";
const APIdownloadfile = APIservice + "/show/download";
const APIgetDataByFolderName = APIservice + "/show/detail?folderName=";
const APIdeleteFile = APIservice + "/delete/file";
const APIdownloadFolder = APIservice + "/show/download/rar";
const APIdeleteFolder = APIservice + "/delete/folder";

export {
  APIupload,
  APIdownloadfile,
  APIgetDataByFolderName,
  APIdeleteFile,
  APIdownloadFolder,
  APIdeleteFolder,
};
