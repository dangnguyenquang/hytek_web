import "./AddProduct.scss";
import { Fragment, useState } from "react";
import axios from "axios";
import classNames from "classnames";
import styles from "./AddProduct.scss";
const cx = classNames.bind(styles);

function AddProduct() {
  const NameType = "mạch";

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [folderName, setFolderName] = useState("");

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleFolderNameChange = (e) => {
    setFolderName(e.target.value);
  };

  const handleUpload = async () => {
    if (!folderName && !selectedFiles) {
      alert("Vui lòng nhập tên thư mục.");
      return;
    }

    const formData = new FormData();
    formData.append("folderName", folderName);

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }

    // Gui data cho BE
    try {
      const response = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <div className={cx("addproduct__container")}>
        <div className={cx("addproduct__box")}>
          {/* Title */}
          <div className={cx("addproduct__title")}>
            <h1>Nhập thông tin sản phẩm</h1>
          </div>
          

          
          {/* Nhap ten */}
          <div className={cx("input__product-Name")}>
            <label>Nhập tên {NameType}</label>
            <input
              type="Name"
              name="Name"
              placeholder={`Tên` + " " + NameType}
            />
          </div>

          {/* Nhap ma */}
          <div className={cx("input__product-ID")}>
            <label>Nhập mã {NameType}</label>
            <input type="ID" name="ID" placeholder={`Mã` + " " + NameType} />
          </div>

          {/* Them hinh anh */}
          <div className={cx("input__product-upload Image")}>
            <label>Ảnh sản phẩm</label>
            <input type="file" onChange={handleFileChange} multiple />
            <input
              type="text"
              placeholder="Tên thư mục"
              value={folderName}
              onChange={handleFolderNameChange}
            />
            <button onClick={handleUpload}>Tải lên</button>
          </div>

          {/* Them file Design Data */}
          <div className={cx("input__product-upload DesignData")}>
            <label>Design Data</label>
            <input type="file" onChange={handleFileChange} multiple />
            <input
              type="text"
              placeholder="Tên thư mục"
              value={folderName}
              onChange={handleFolderNameChange}
            />
            <button onClick={handleUpload}>Tải lên</button>
          </div>

          {/* Them Manufacturing */}
          <div className={cx("input__product-upload DesignData")}>
            <label>Manufacturing</label>
            <input type="file" onChange={handleFileChange} multiple />
            <input
              type="text"
              placeholder="Tên thư mục"
              value={folderName}
              onChange={handleFolderNameChange}
            />
            <button onClick={handleUpload}>Tải lên</button>
          </div>

          {/* Them file History */}
          <div className={cx("input__product-upload History")}>
            <label>Lịch sử sản xuất</label>
            <input type="file" onChange={handleFileChange} multiple />
            <input
              type="text"
              placeholder="Tên thư mục"
              value={folderName}
              onChange={handleFolderNameChange}
            />
            <button onClick={handleUpload}>Tải lên</button>
          </div>

          {/* Them file Guidelines */}
          <div className={cx("input__product-upload Guidelines")}>
            <label>Trouble shooting guidelines</label>
            <input type="file" onChange={handleFileChange} multiple />
            <input
              type="text"
              placeholder="Tên thư mục"
              value={folderName}
              onChange={handleFolderNameChange}
            />
            <button onClick={handleUpload}>Tải lên</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AddProduct;
