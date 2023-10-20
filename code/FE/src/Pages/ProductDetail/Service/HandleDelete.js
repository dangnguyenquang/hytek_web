import axios from "axios";
import { APIdeleteFile } from "../../../APIService/localAPI";

function handleDeleteProduct(folderName, path, fileName) {
  axios
    .delete(APIdeleteFile + folderName + "/" + path + "/" + fileName)
    .then((response) => {
      window.location.reload(true)
    })
    .catch((error) => {});
}

export default handleDeleteProduct;
