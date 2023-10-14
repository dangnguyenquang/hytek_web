import axios from "axios";
import { useEffect, useState } from "react";

function RenderImg({folderName, productImgNameList}) {
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

  return <img src={imgURL}/>;
}

export default RenderImg;
