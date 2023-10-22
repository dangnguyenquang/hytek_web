import axios from "axios";
import { useEffect, useState } from "react";
import { Img } from "react-image";

function RenderImg({ folderName, productImgNameList }) {
  const [imgURL, setImgURL] = useState("");
  useEffect(() => {
    axios
      .get(
        "http://localhost:3001/show/renderIMG/" +
          folderName +
          "/" +
          productImgNameList,
        {
          responseType: "blob",
        }
      )
      .then((response) => {
        let url = URL.createObjectURL(response.data);
        setImgURL(url);
      })
      .catch((error) => {});
  }, []);

  return <img src={imgURL} width={400} height={400} />;
}

export default RenderImg;
