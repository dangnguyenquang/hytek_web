import axios from "axios";
import { APIdeleteFile, APIdeleteFolder } from "../../../APIService/localAPI";

function handleDeleteProduct(customerName, folderName, path, fileName) {
  axios
    .delete(APIdeleteFile + "/" + customerName + "/" + folderName + "/" + path + "/" + fileName)
    .then((response) => {
      window.location.reload(true);
    })
    .catch((error) => {});
}

function handleDeleteFolder(customerName, folderName) {
  axios
    .delete(APIdeleteFolder + "/" + customerName + "/" + folderName)
    .then((response) => {
      window.location.reload(true);
    })
    .catch((error) => {});
}

export { handleDeleteProduct, handleDeleteFolder };
