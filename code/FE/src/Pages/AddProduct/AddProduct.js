import "./AddProduct.scss";
import Header from "../../components/GlobalStyle/Header/Header";
import { Fragment, useState } from "react";
import axios from "axios";
import classNames from "classnames";
import styles from "./AddProduct.scss";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

function AddProduct() {
  const NameType = "mạch";

  const [selectedImgFiles, setSelectedImgFiles] = useState([]);
  const [selectedDesDataFiles, setSelectedDesDataFiles] = useState([]);
  const [selectedHistoryFiles, setSelectedHistoryFiles] = useState([]);
  const [
    selectedTroublerShootingGuidelineFiles,
    setSelectedTroublerShootingGuidelineFiles,
  ] = useState([]);
  const [selectedGerberDataFiles, setSelectedGerberDataFiles] = useState([]);
  const [selectedBOMFiles, setSelectedBOMFiles] = useState([]);
  const [selectedAssemblyGuidelineFiles, setSelectedAssemblyGuidelineFiles] =
    useState([]);
  const [selectedTestingGuidelineFiles, setSelectedTestingGuidelineFiles] =
    useState([]);
  const [folderName, setFolderName] = useState("");
  const [folderID, setFolderID] = useState("");

  //bug: check file type

  // Select Img file
  const handleFileImgChange = (e) => {
    setSelectedImgFiles(e.target.files);
  };

  // Select Design-Data file
  const handleFileDesDataChange = (e) => {
    setSelectedDesDataFiles(e.target.files);
  };

  // Select Gerber-Data file
  const handleFileGerberDataChange = (e) => {
    setSelectedGerberDataFiles(e.target.files);
  };

  // Select BOM file
  const handleFileBOMChange = (e) => {
    setSelectedBOMFiles(e.target.files);
  };

  // Select Assembly-Guideline file
  const handleFileAssemblyGuidelineChange = (e) => {
    setSelectedAssemblyGuidelineFiles(e.target.files);
  };

  // Select Testing-Guideline file
  const handleFileTestingGuidelineChange = (e) => {
    setSelectedTestingGuidelineFiles(e.target.files);
  };

  // Select History file
  const handleFileHistoryChange = (e) => {
    setSelectedHistoryFiles(e.target.files);
  };

  // Select Guideline file
  const handleFileGuidelineChange = (e) => {
    setSelectedTroublerShootingGuidelineFiles(e.target.files);
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
    if (!folderName || !folderID) {
      alert("Vui lòng nhập đầy đủ tên và mã sản phẩm.");
      return;
    }

    // Dong goi du lieu tu INPUT
    const formData = new FormData();
    formData.append("folderName", folderName);
    formData.append("folderID", folderID);
    // Add IMG file
    for (let i = 0; i < selectedImgFiles.length; i++) {
      formData.append("img", selectedImgFiles[i]);
    }
    // Add DesData file
    for (let i = 0; i < selectedDesDataFiles.length; i++) {
      formData.append("design", selectedDesDataFiles[i]);
    }
    // Add GerberData file
    for (let i = 0; i < selectedGerberDataFiles.length; i++) {
      formData.append("gerber", selectedGerberDataFiles[i]);
    }
    // Add BOMData file
    for (let i = 0; i < selectedBOMFiles.length; i++) {
      formData.append("bom", selectedBOMFiles[i]);
    }
    // Add AssemblyGuideline file
    for (let i = 0; i < selectedAssemblyGuidelineFiles.length; i++) {
      formData.append("assembly-guidelines", selectedAssemblyGuidelineFiles[i]);
    }
    // Add TestingGuideline file
    for (let i = 0; i < selectedTestingGuidelineFiles.length; i++) {
      formData.append("testing-guidelines", selectedTestingGuidelineFiles[i]);
    }
    // Add History file
    for (let i = 0; i < selectedHistoryFiles.length; i++) {
      formData.append("production-history", selectedHistoryFiles[i]);
    }
    // Add Guideline file
    for (let i = 0; i < selectedTroublerShootingGuidelineFiles.length; i++) {
      formData.append(
        "trouble-shooting-guidelines",
        selectedTroublerShootingGuidelineFiles[i]
      );
    }

    // Gui data -> BE
    await axios
      .post("http://localhost:3000/upload", formData)
      // Check status of call API
      .then((response) => {
        if ((response.data.result = 1)) {
          const uploadsuccess = document.querySelector(".UploadSuccessed");
          uploadsuccess.classList.toggle("activeNotification");
          setTimeout(() => {
            uploadsuccess.classList.toggle("activeNotification");
          }, 2000);
          clearTimeout();
        } else {
          const uploadfail = document.querySelector(".UploadFailed");
          uploadfail.classList.toggle("activeNotification");
          setTimeout(() => {
            uploadfail.classList.toggle("activeNotification");
          }, 2000);
          clearTimeout();
        }
      })
      .catch((error) => {
        console.log(error);
        const uploadfail = document.querySelector(".UploadFailed");
        uploadfail.classList.toggle("activeNotification");
        setTimeout(() => {
          uploadfail.classList.toggle("activeNotification");
        }, 2000);
        clearTimeout();
      });
  };

  return (
    <Fragment>
      <Header/>
      <div className={cx("addproduct__container")}>
        <div className={cx("UploadSuccessed Notification")}>
          <span className={cx("Notification-Message")}>Thêm thành công</span>
          <i className={cx("fa-solid fa-circle-check")}></i>
        </div>

        <div className={cx("UploadFailed Notification")}>
          <span className={cx("Notification-Message")}>Thêm thất bại</span>
          <i className={cx("fa-solid fa-circle-exclamation")}></i>
        </div>

        {/* <div className={cx("backtohomeBtn")}>
          <button>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#000",
                fontSize: "1.6rem",
                padding: "10px",
              }}
            >
              <i className={cx("fa-solid fa-house")}></i> Trang chủ
            </Link>
          </button>
        </div> */}

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
                type="text"
                name="Name"
                placeholder={`Tên` + " " + NameType}
                onChange={(e) => handleFolderNameChange(e)}
              />
            </div>

            {/* Nhap ma */}
            <div className={cx("input__product-ID")}>
              <label>Nhập mã {NameType}</label>
              <input
                type="text"
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
              accept="image/*"
              onChange={(e) => handleFileImgChange(e)}
              multiple
            />
          </div>

          {/* Them file Design Data */}
          <div className={cx("input__product-upload DesignData")}>
            <label>Design Data</label>
            <input
              className={cx("selectFile")}
              type="file"
              onChange={(e) => handleFileDesDataChange(e)}
              multiple
            />
          </div>

          {/* Them Manufacturing */}
          <div className={cx("input__product-upload Manufacturing")}>
            <span>Manufacturing</span>
            <div className={cx("Manufacturing__Cards")}>
              {/* Them Gerber Data */}
              <div className={cx("input_product-upload-Card")}>
                <label>Gerber data</label>
                <input
                  className={cx("selectFile")}
                  type="file"
                  onChange={(e) => handleFileGerberDataChange(e)}
                  multiple
                />
              </div>

              {/* Them BOM Data */}
              <div className={cx("input_product-upload-Card")}>
                <label>BOM data</label>
                <input
                  className={cx("selectFile")}
                  type="file"
                  onChange={(e) => handleFileBOMChange(e)}
                  multiple
                />
              </div>

              {/* Them Assembly guideline */}
              <div className={cx("input_product-upload-Card")}>
                <label>Assembly guidelines</label>
                <input
                  className={cx("selectFile")}
                  type="file"
                  onChange={(e) => handleFileAssemblyGuidelineChange(e)}
                  multiple
                />
              </div>

              {/* Them Testing guideline */}
              <div className={cx("input_product-upload-Card")}>
                <label>Testing guidelines</label>
                <input
                  className={cx("selectFile")}
                  type="file"
                  onChange={(e) => handleFileTestingGuidelineChange(e)}
                  multiple
                />
              </div>
            </div>
          </div>

          {/* Them file History */}
          <div className={cx("input__product-upload History")}>
            <label>Lịch sử sản xuất</label>
            <input
              className={cx("selectFile")}
              type="file"
              onChange={(e) => handleFileHistoryChange(e)}
              multiple
            />
          </div>

          {/* Them file Guidelines */}
          <div
            className={cx("input__product-upload TroubleShootingGuidelines")}
          >
            <label>Trouble Shooting Guidelines</label>
            <input
              className={cx("selectFile")}
              type="file"
              onChange={(e) => handleFileGuidelineChange(e)}
              multiple
            />
          </div>

          <div className={cx("input__product-upload-folderName")}>
            <button onClick={handleUpload}>Xác nhận thêm</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AddProduct;
