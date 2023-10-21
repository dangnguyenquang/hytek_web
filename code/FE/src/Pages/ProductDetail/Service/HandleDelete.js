import axios from "axios";
import { APIdeleteFile, APIdeleteFolder } from "../../../APIService/localAPI";

function handleDeleteProduct(folderName, path, fileName) {
  axios
    .delete(APIdeleteFile + "/" + folderName + "/" + path + "/" + fileName)
    .then((response) => {
      window.location.reload(true);
    })
    .catch((error) => {});
}

function handleDeleteFolder(folderName) {
  axios
    .delete(APIdeleteFolder + "/" + folderName)
    .then((response) => {
      window.location.reload(true);
    })
    .catch((error) => {});
}

export { handleDeleteProduct, handleDeleteFolder };
