const APIservice = "http://localhost:3001";
const APIupload = APIservice + "/upload";
const APIshowItem = APIservice + "/show";
const APIgetIMG = APIservice + "/show/renderIMG";
const APIdownloadfile = APIservice + "/show/download";
const APIgetDataByFolderName = APIservice + "/show/detail?folderName=";
const APIdeleteFile = APIservice + "/delete/file";
const APIdownloadFolder = APIservice + "/show/download/rar";
const APIdeleteFolder = APIservice + "/delete/folder";
const APIExportExcel = APIservice + "/show/download/report";
const APIgetCustomer = APIservice + "/show/customerNameList";

export {
  APIupload,
  APIshowItem,
  APIgetIMG,
  APIdownloadfile,
  APIgetDataByFolderName,
  APIdeleteFile,
  APIdownloadFolder,
  APIdeleteFolder,
  APIExportExcel,
  APIgetCustomer
};
