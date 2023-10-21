import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetail.scss";
import classNames from "classnames";
import styles from "./ProductDetail.scss";
import Header from "../../components/GlobalStyle/Header/Header";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import RenderImg from "./Service/GetProductImgURL";
import { handleDeleteProduct } from "./Service/HandleDelete";
import { APIgetDataByFolderName } from "../../APIService/localAPI";
import {
  handleDownloadFile,
  handleDownloadFolder,
} from "./Service/HandleDownload";

const cx = classNames.bind(styles);

function ProductDetail() {
  const navigate = useNavigate();

  const { folderName } = useParams();
  const [productImg, setProductImg] = useState([]);
  const [designData, setDesignData] = useState([]);
  const [gerberData, setGerberData] = useState([]);
  const [bomData, setBOMData] = useState([]);
  const [assemblyGuideline, setAssemblyGuideline] = useState([]);
  const [testingGuideline, setTestingGuideline] = useState([]);
  const [productHistory, setProductHistory] = useState([]);
  const [troubleShootingGuidelines, setTroubleShootingGuidelines] = useState(
    []
  );

  // Call API get data by folderName
  useEffect(() => {
    axios
      .get(APIgetDataByFolderName + folderName)
      .then((response) => {
        const folderData = response.data;
        setProductImg(folderData.img);
        setDesignData(folderData.design);
        setGerberData(folderData.gerber);
        setBOMData(folderData.bom);
        setAssemblyGuideline(folderData["assembly-guidelines"]);
        setTestingGuideline(folderData["testing-guidelines"]);
        setProductHistory(folderData["production-history"]);
        setTroubleShootingGuidelines(folderData["trouble-shooting-guidelines"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Chuan hoa file time
  const formatFileTime = (file) => {
    let fileTime = new Date(
      +file.slice(file.indexOf("_") + 1, file.indexOf("."))
    );
    const createAt = moment(fileTime)
      .tz("Asia/Ho_Chi_Minh")
      .format("DD/MM/YYYY");

    return createAt;
  };

  // Chuan hoa file name
  const formatFileName = (file) => {
    let fileName = file.slice(0, file.indexOf("_"));
    return fileName;
  };

  // Chuan hoa file type
  const formatFileType = (file) => {
    const fileType = file.slice(file.indexOf(".") + 1);
    return fileType;
  };

  const handleNavigateAddfile = (folderName) => {
    navigate("/addproduct", { state: folderName });
  };

  // Hien nut xoa file
  const showDeleteFileBtn = () => {
    const deleteBtn = document.querySelectorAll(".RowTableDelete");
    deleteBtn.forEach((item) => {
      item.classList.toggle("ActiveShowDeleteBtn");
    });
  };

  return (
    <>
      <Header />
      <div className={cx("productdetail__container")}>
        <div className={cx("productdetail__container-card")}>
          <div className={cx("productdetail__card-Info")}>
            <div className={cx("productdetail__card-info-Img")}>
              <div
                id="carouselExampleAutoplaying"
                className="carousel slide productdetail__card-info-Img-card"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner productdetail__card-info-Img-list">
                  {productImg.length > 0 &&
                    productImg.map((item, index) => {
                      return (
                        <div
                          className={
                            index === 0
                              ? "productdetailImg carousel-item active"
                              : "productdetailImg carousel-item"
                          }
                          key={"carousel-item" + index}
                        >
                          <RenderImg
                            folderName={folderName}
                            productImgNameList={item}
                          />
                        </div>
                      );
                    })}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleAutoplaying"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleAutoplaying"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>

            <div className={cx("productdetail-edit")}>
              {/* Delete Button */}
              <button
                className={cx("productdetail-edit-delete")}
                onClick={() => showDeleteFileBtn()}
              >
                <span>Xóa tệp</span>
                <span>
                  <i className="fa-solid fa-trash"></i>
                </span>
              </button>

              {/* Add Button */}
              <button
                className={cx("productdetail-edit-add")}
                onClick={() => handleNavigateAddfile(folderName)}
              >
                <span>Thêm tệp</span>
                <span>
                  <i className="fa-solid fa-folder-plus"></i>
                </span>
              </button>
            </div>

            <div className={cx("productdetail-downloadAll")}>
              {/* Download All Button */}
              <button onClick={() => handleDownloadFolder(folderName)}>
                <span>Tải tất cả .rar</span>
                <span>
                  <i className="fa-solid fa-download"></i>
                </span>
              </button>
            </div>
          </div>

          <div className={cx("productdetail__card-Data")}>
            <div className={cx("productdetail__card-info-Title")}>
              <h1>{folderName}</h1>
            </div>

            <div className={cx("productdetail__card-info")}>
              <div className={"productdetail__card--info-Name"}>
                <span>
                  Tên linh kiện: {folderName.slice(0, folderName.indexOf("-"))}
                </span>
              </div>
              <div className={"productdetail__card--info-ID"}>
                <span>
                  Mã linh kiện:{" "}
                  {folderName.replace(
                    folderName.slice(0, folderName.indexOf("-") + 1),
                    ""
                  )}
                </span>
              </div>
            </div>

            <div className={cx("productdetail__card-Data-ListData")}>
              <h1>Các tệp lưu trữ</h1>

              {/* Design Data */}
              <div className={cx("Data-Item")}>
                <p className={cx("d-inline-flex gap-1 DataTypeBtn")}>
                  <button
                    className={cx("btn btn-primary collapsed")}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse1"
                    aria-expanded="true"
                    aria-controls="collapse1"
                  >
                    Design Data
                  </button>
                </p>
                <div className={cx("collapse listDataFile")} id="collapse1">
                  <div className={cx("card card-body DataFile")}>
                    <section className={cx("DataFile__Table-body")}>
                      <table className={cx("DataFile__Table-body-card")}>
                        <thead className={cx("Table-body-card-header")}>
                          <tr>
                            <th>STT</th>
                            <th>Tên File</th>
                            <th>Kiểu</th>
                            <th>Ngày Tạo</th>
                          </tr>
                        </thead>

                        <tbody className={cx("Table-body-card-body")}>
                          {designData.map((file, index) => {
                            const name = formatFileName(file);
                            const type = formatFileType(file);
                            const time = formatFileTime(file);
                            return (
                              <Fragment key={"Fragment" + index}>
                                <tr
                                  className="DataFile__Item"
                                  key={"DesignData-Item-" + index}
                                >
                                  <td>{index + 1}</td>
                                  <td
                                    onClick={() => {
                                      handleDownloadFile(
                                        folderName,
                                        "design",
                                        file
                                      );
                                    }}
                                  >
                                    {name}
                                  </td>
                                  <td>{"." + type}</td>
                                  <td>{time}</td>
                                  <td
                                    className={cx("RowTableDelete")}
                                    onClick={() =>
                                      handleDeleteProduct(
                                        folderName,
                                        "design",
                                        file
                                      )
                                    }
                                  >
                                    <i className="fa-solid fa-folder-minus deleteFileBtn"></i>
                                  </td>
                                </tr>
                              </Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </section>
                  </div>
                </div>
              </div>

              {/* Gerber Data */}
              <div className={cx("Data-Item")}>
                <p className={cx("d-inline-flex gap-1 DataTypeBtn")}>
                  <button
                    className={cx("btn btn-primary collapsed")}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse2"
                    aria-expanded="true"
                    aria-controls="collapse2"
                  >
                    Gerber Data
                  </button>
                </p>
                <div className={cx("collapse listDataFile")} id="collapse2">
                  <div className={cx("card card-body DataFile")}>
                    <section className={cx("DataFile__Table-body")}>
                      <table className={cx("DataFile__Table-body-card")}>
                        <thead className={cx("Table-body-card-header")}>
                          <tr>
                            <th>STT</th>
                            <th>Tên File</th>
                            <th>Kiểu</th>
                            <th>Ngày Tạo</th>
                          </tr>
                        </thead>

                        <tbody className={cx("Table-body-card-body")}>
                          {gerberData.map((file, index) => {
                            const name = formatFileName(file);
                            const type = formatFileType(file);
                            const time = formatFileTime(file);
                            return (
                              <Fragment key={"Fragment" + index}>
                                <tr
                                  className="DataFile__Item"
                                  key={"GerberData-Item-" + index}
                                >
                                  <td>{index + 1}</td>
                                  <td
                                    onClick={() => {
                                      handleDownloadFile(
                                        folderName,
                                        "gerber",
                                        file
                                      );
                                    }}
                                  >
                                    {name}
                                  </td>
                                  <td>{"." + type}</td>
                                  <td>{time}</td>
                                  <td
                                    className={cx("RowTableDelete")}
                                    onClick={() =>
                                      handleDeleteProduct(
                                        folderName,
                                        "gerber",
                                        file
                                      )
                                    }
                                  >
                                    <i className="fa-solid fa-folder-minus deleteFileBtn"></i>
                                  </td>
                                </tr>
                              </Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </section>
                  </div>
                </div>
              </div>

              {/* BOM Data */}
              <div className={cx("Data-Item")}>
                <p className={cx("d-inline-flex gap-1 DataTypeBtn")}>
                  <button
                    className={cx("btn btn-primary collapsed")}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse3"
                    aria-expanded="true"
                    aria-controls="collapse3"
                  >
                    BOM Data
                  </button>
                </p>
                <div className={cx("collapse listDataFile")} id="collapse3">
                  <div className={cx("card card-body DataFile")}>
                    <section className={cx("DataFile__Table-body")}>
                      <table className={cx("DataFile__Table-body-card")}>
                        <thead className={cx("Table-body-card-header")}>
                          <tr>
                            <th>STT</th>
                            <th>Tên File</th>
                            <th>Kiểu</th>
                            <th>Ngày Tạo</th>
                          </tr>
                        </thead>

                        <tbody className={cx("Table-body-card-body")}>
                          {bomData.map((file, index) => {
                            const name = formatFileName(file);
                            const type = formatFileType(file);
                            const time = formatFileTime(file);
                            return (
                              <Fragment key={"Fragment" + index}>
                                <tr
                                  className="DataFile__Item"
                                  key={"bomData-Item-" + index}
                                >
                                  <td>{index + 1}</td>
                                  <td
                                    onClick={() => {
                                      handleDownloadFile(
                                        folderName,
                                        "bom",
                                        file
                                      );
                                    }}
                                  >
                                    {name}
                                  </td>
                                  <td>{"." + type}</td>
                                  <td>{time}</td>
                                  <td
                                    className={cx("RowTableDelete")}
                                    onClick={() =>
                                      handleDeleteProduct(
                                        folderName,
                                        "bom",
                                        file
                                      )
                                    }
                                  >
                                    <i className="fa-solid fa-folder-minus deleteFileBtn"></i>
                                  </td>
                                </tr>
                              </Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </section>
                  </div>
                </div>
              </div>

              {/* Assembly Guideline */}
              <div className={cx("Data-Item")}>
                <p className={cx("d-inline-flex gap-1 DataTypeBtn")}>
                  <button
                    className={cx("btn btn-primary collapsed")}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse4"
                    aria-expanded="true"
                    aria-controls="collapse4"
                  >
                    Assemly Guideline
                  </button>
                </p>
                <div className={cx("collapse listDataFile")} id="collapse4">
                  <div className={cx("card card-body DataFile")}>
                    <section className={cx("DataFile__Table-body")}>
                      <table className={cx("DataFile__Table-body-card")}>
                        <thead className={cx("Table-body-card-header")}>
                          <tr>
                            <th>STT</th>
                            <th>Tên File</th>
                            <th>Kiểu</th>
                            <th>Ngày Tạo</th>
                          </tr>
                        </thead>

                        <tbody className={cx("Table-body-card-body")}>
                          {assemblyGuideline.map((file, index) => {
                            const name = formatFileName(file);
                            const type = formatFileType(file);
                            const time = formatFileTime(file);
                            return (
                              <Fragment key={"Fragment" + index}>
                                <tr
                                  className="DataFile__Item"
                                  key={"assemblyGuideline-Item-" + index}
                                >
                                  <td>{index + 1}</td>
                                  <td
                                    onClick={() => {
                                      handleDownloadFile(
                                        folderName,
                                        "assembly-guidelines",
                                        file
                                      );
                                    }}
                                  >
                                    {name}
                                  </td>
                                  <td>{"." + type}</td>
                                  <td>{time}</td>
                                  <td
                                    className={cx("RowTableDelete")}
                                    onClick={() =>
                                      handleDeleteProduct(
                                        folderName,
                                        "assembly-guidelines",
                                        file
                                      )
                                    }
                                  >
                                    <i className="fa-solid fa-folder-minus deleteFileBtn"></i>
                                  </td>
                                </tr>
                              </Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </section>
                  </div>
                </div>
              </div>

              {/* Testing Guideline */}
              <div className={cx("Data-Item")}>
                <p className={cx("d-inline-flex gap-1 DataTypeBtn")}>
                  <button
                    className={cx("btn btn-primary collapsed")}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse5"
                    aria-expanded="true"
                    aria-controls="collapse5"
                  >
                    Testing Guideline
                  </button>
                </p>
                <div className={cx("collapse listDataFile")} id="collapse5">
                  <div className={cx("card card-body DataFile")}>
                    <section className={cx("DataFile__Table-body")}>
                      <table className={cx("DataFile__Table-body-card")}>
                        <thead className={cx("Table-body-card-header")}>
                          <tr>
                            <th>STT</th>
                            <th>Tên File</th>
                            <th>Kiểu</th>
                            <th>Ngày Tạo</th>
                          </tr>
                        </thead>

                        <tbody className={cx("Table-body-card-body")}>
                          {testingGuideline.map((file, index) => {
                            const name = formatFileName(file);
                            const type = formatFileType(file);
                            const time = formatFileTime(file);
                            return (
                              <Fragment key={"Fragment" + index}>
                                <tr
                                  className="DataFile__Item"
                                  key={"testingGuideline-Item-" + index}
                                >
                                  <td>{index + 1}</td>
                                  <td
                                    onClick={() => {
                                      handleDownloadFile(
                                        folderName,
                                        "testing-guidelines",
                                        file
                                      );
                                    }}
                                  >
                                    {name}
                                  </td>
                                  <td>{"." + type}</td>
                                  <td>{time}</td>
                                  <td
                                    className={cx("RowTableDelete")}
                                    onClick={() =>
                                      handleDeleteProduct(
                                        folderName,
                                        "testing-guidelines",
                                        file
                                      )
                                    }
                                  >
                                    <i className="fa-solid fa-folder-minus deleteFileBtn"></i>
                                  </td>
                                </tr>
                              </Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </section>
                  </div>
                </div>
              </div>

              {/* Product History */}
              <div className={cx("Data-Item")}>
                <p className={cx("d-inline-flex gap-1 DataTypeBtn")}>
                  <button
                    className={cx("btn btn-primary collapsed")}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse6"
                    aria-expanded="true"
                    aria-controls="collapse6"
                  >
                    Lịch sử sản xuất
                  </button>
                </p>
                <div className={cx("collapse listDataFile")} id="collapse6">
                  <div className={cx("card card-body DataFile")}>
                    <section className={cx("DataFile__Table-body")}>
                      <table className={cx("DataFile__Table-body-card")}>
                        <thead className={cx("Table-body-card-header")}>
                          <tr>
                            <th>STT</th>
                            <th>Tên File</th>
                            <th>Kiểu</th>
                            <th>Ngày Tạo</th>
                          </tr>
                        </thead>

                        <tbody className={cx("Table-body-card-body")}>
                          {productHistory.map((file, index) => {
                            const name = formatFileName(file);
                            const type = formatFileType(file);
                            const time = formatFileTime(file);
                            return (
                              <Fragment key={"Fragment" + index}>
                                <tr
                                  className="DataFile__Item"
                                  key={"productHistory-Item-" + index}
                                >
                                  <td>{index + 1}</td>
                                  <td
                                    onClick={() => {
                                      handleDownloadFile(
                                        folderName,
                                        "production-history",
                                        file
                                      );
                                    }}
                                  >
                                    {name}
                                  </td>
                                  <td>{"." + type}</td>
                                  <td>{time}</td>
                                  <td
                                    className={cx("RowTableDelete")}
                                    onClick={() =>
                                      handleDeleteProduct(
                                        folderName,
                                        "production-history",
                                        file
                                      )
                                    }
                                  >
                                    <i className="fa-solid fa-folder-minus deleteFileBtn"></i>
                                  </td>
                                </tr>
                              </Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </section>
                  </div>
                </div>
              </div>

              {/* Trouble Shooting Guideline */}
              <div className={cx("Data-Item")}>
                <p className={cx("d-inline-flex gap-1 DataTypeBtn")}>
                  <button
                    className={cx("btn btn-primary collapsed")}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse7"
                    aria-expanded="true"
                    aria-controls="collapse7"
                  >
                    Trouble Shooting Guideline
                  </button>
                </p>
                <div className={cx("collapse listDataFile")} id="collapse7">
                  <div className={cx("card card-body DataFile")}>
                    <section className={cx("DataFile__Table-body")}>
                      <table className={cx("DataFile__Table-body-card")}>
                        <thead className={cx("Table-body-card-header")}>
                          <tr>
                            <th>STT</th>
                            <th>Tên File</th>
                            <th>Kiểu</th>
                            <th>Ngày Tạo</th>
                          </tr>
                        </thead>

                        <tbody className={cx("Table-body-card-body")}>
                          {troubleShootingGuidelines.map((file, index) => {
                            const name = formatFileName(file);
                            const type = formatFileType(file);
                            const time = formatFileTime(file);
                            return (
                              <Fragment key={"Fragment" + index}>
                                <tr
                                  className="DataFile__Item"
                                  key={
                                    "troubleShootingGuidelines-Item-" + index
                                  }
                                >
                                  <td>{index + 1}</td>
                                  <td
                                    onClick={() => {
                                      handleDownloadFile(
                                        folderName,
                                        "trouble-shooting-guidelines",
                                        file
                                      );
                                    }}
                                  >
                                    {name}
                                  </td>
                                  <td>{"." + type}</td>
                                  <td>{time}</td>
                                  <td
                                    className={cx("RowTableDelete")}
                                    onClick={() =>
                                      handleDeleteProduct(
                                        folderName,
                                        "trouble-shooting-guidelines",
                                        file
                                      )
                                    }
                                  >
                                    <i className="fa-solid fa-folder-minus deleteFileBtn"></i>
                                  </td>
                                </tr>
                              </Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
