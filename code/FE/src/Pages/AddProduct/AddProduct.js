import "./AddProduct.scss";
import { Fragment, useState } from "react";
import axios from "axios";
import classNames from "classnames";
import styles from "./AddProduct.scss";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

function AddProduct() {
  const NameType = "mạch";

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [folderID, setFolderID] = useState("");

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  // GET NAME 
  const handleFolderNameChange = (e) => {
    setFolderName(e.target.value);
  };

  // GET ID
  const handleFolderIDChange = (e) => {
    setFolderID(e.target.value);
  };

  const handleUpload = async () => {
    if (!folderName && !selectedFiles) {
      alert("Vui lòng nhập tên thư mục.");
      return;
    }

    const formData = new FormData();
    formData.append("folderName", folderName);
    formData.append("folderID",folderID);

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }

    // Gui data cho BE
    try {
      const response = await axios.post("/upload/img", formData, {
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
        <div className={cx("backtohomeBtn")}>
          <button>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#000",
                fontSize: "1.6rem",
              }}
            >
              Quay lại
            </Link>
          </button>
        </div>

        <div className={cx("addproduct__box")}>
          {/* Title */}
          <div className={cx("addproduct__title")}>
            <h1>Nhập thông tin sản phẩm</h1>
          </div>

          <div className={cx("input__product-Name-Id")}>
            {/* Nhap ten */}
            <div className={cx("input__product-Name")}>
              <label>Nhập tên {NameType}</label>
              <input
                type="Name"
                name="Name"
                placeholder={`Tên` + " " + NameType}
                onChange={(e) => handleFolderNameChange(e)}
              />
            </div>

            {/* Nhap ma */}
            <div className={cx("input__product-ID")}>
              <label>Nhập mã {NameType}</label>
              <input
                type="ID"
                name="ID"
                placeholder={`Mã` + " " + NameType}
                onChange={(e) => handleFolderIDChange(e)}
              />
            </div>
          </div>

          {/* Them hinh anh */}
          <div className={cx("input__product-upload Image")}>
            <label>Ảnh sản phẩm</label>
            <input
              className={cx("selectFile")}
              type="file"
              onChange={handleFileChange}
              multiple
            />
            <div className={cx("input__product-upload-folderName")}>
              <button onClick={handleUpload}>Xác nhận</button>
            </div>
          </div>

          {/* Them file Design Data */}
          <div className={cx("input__product-upload DesignData")}>
            <label>Design Data</label>
            <input
              className={cx("selectFile")}
              type="file"
              onChange={handleFileChange}
              multiple
            />
            <div className={cx("input__product-upload-folderName")}>
              <button onClick={handleUpload}>Xác nhận</button>
            </div>
          </div>

          {/* Them Manufacturing */}

          {/* Them file History */}
          <div className={cx("input__product-upload History")}>
            <label>Lịch sử sản xuất</label>
            <input
              className={cx("selectFile")}
              type="file"
              onChange={handleFileChange}
              multiple
            />
            <div className={cx("input__product-upload-folderName")}>
              <button onClick={handleUpload}>Xác nhận</button>
            </div>
          </div>

          {/* Them file Guidelines */}
          <div className={cx("input__product-upload Guidelines")}>
            <label>Guidelines</label>
            <input
              className={cx("selectFile")}
              type="file"
              onChange={handleFileChange}
              multiple
            />
            <div className={cx("input__product-upload-folderName")}>
              <button onClick={handleUpload}>Xác nhận</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AddProduct;
