import "./Home.scss";
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "moment-timezone";
import Header from "../../components/GlobalStyle/Header/Header";
import classNames from "classnames";
import styles from "./Home.scss";
import moment from "moment-timezone";
import { handleDeleteFolder } from "../ProductDetail/Service/HandleDelete";
import { APIgetCustomer, APIshowItem } from "../../APIService/localAPI";
import { handleExportReportFile } from "../ProductDetail/Service/HandleDownload";

const cx = classNames.bind(styles);

function Home() {
  const [listFolder, setListFolder] = useState([]);
  const [listCustomerName, setListCustomerName] = useState([]);
  // Call API lay du lieu trong Database
  useEffect(() => {
    async function getData() {
      await axios
        .get(APIshowItem)
        .then((response) => {
          setListFolder(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getData();
  }, []);

  useEffect(() => {
    async function getCustomers() {
      await axios
        .get(APIgetCustomer)
        .then((response) => {
          setListCustomerName(response.data.customerNameList)
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getCustomers();
  }, []);

  // Xu ly chuyen trang ProductDetail
  const navigate = useNavigate();
  const handleLinktoProductDetail = (customerName, folderName) => {
    let formatfolderName = folderName.replace("/", "%2F");
    let formatcustomerName = customerName.replace("/", "%2F");
    navigate("/product/" + formatcustomerName + "&" + formatfolderName);
  };

  // Xu ly tim kiem folder
  useEffect(() => {
    async function checkInputCondition() {
      const searchInput = document.querySelector(
        ".showproduct__container-searchbar input"
      );
      searchInput.addEventListener("input", (e) => {
        let txtSearch = e.target.value.toLowerCase();
        const listProductDOM = document.querySelectorAll(".Product-Item");
        listProductDOM.forEach((item) => {
          let itemtoString = item.innerText.toLowerCase();
          if (itemtoString.includes(txtSearch)) {
            item.classList.remove("product-item-Hide");
          } else {
            item.classList.add("product-item-Hide");
          }
        });
      });
    }
    checkInputCondition();
  }, []);

  // Hien nut xoa folder
  const showDeleteFileBtn = () => {
    const deleteBtn = document.querySelectorAll(".RowTableDelete");
    deleteBtn.forEach((item) => {
      item.classList.toggle("ActiveShowDeleteBtn");
    });
  };

  return (
    <Fragment>
      <Header />
      <div className={cx("showproduct__container")}>
        <h1>PRODUCT DATA MANAGEMENT</h1>
        <div className={cx("showproduct__container-searchbar")}>
          <input
            type="text"
            placeholder="Nhập tên linh kiện hoặc tên khách hàng"
          />
        </div>

        <div className={cx("showproduct__container-listItem")}>
          <div className={cx("showproduct__container-listItem-table")}>
            <section className={cx("showproduct__table-header")}>
              <h1>Danh sách linh kiện</h1>
            </section>
            <section className={cx("showproduct__table-body")}>
              <table className={cx("showproduct__table-body-cards")}>
                <thead className={cx("table-body-card-header")}>
                  <tr>
                    <th>STT</th>
                    <th>Khách Hàng</th>
                    <th>Tên linh kiện</th>
                    <th>Mã linh kiện</th>
                    <th>Ngày Tạo</th>
                  </tr>
                </thead>

                <tbody className={cx("table-body-card-body")}>
                  {listFolder.map((folder, index) => {
                    const createAt = moment(folder.createAt)
                      .tz("Asia/Ho_Chi_Minh")
                      .format("DD/MM/YYYY");
                    return (
                      <tr
                        key={"product" + index}
                        className={cx("Product-Item")}
                      >
                        <td> {index + 1} </td>
                        <td>{folder.customerName}</td>
                        <td
                          onClick={() =>
                            handleLinktoProductDetail(
                              folder.customerName,
                              folder.folderName
                            )
                          }
                        >
                          {folder.name}
                        </td>
                        <td> {folder.id} </td>
                        <td>{createAt}</td>
                        <td
                          className={cx("RowTableDelete")}
                          onClick={() =>
                            handleDeleteFolder(
                              folder.customerName,
                              folder.folderName
                            )
                          }
                        >
                          <i className="fa-solid fa-folder-minus deleteFileBtn"></i>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
            <button
              className={cx("productdetail-edit-delete deleteFolder")}
              onClick={() => showDeleteFileBtn()}
            >
              <span>Xóa thư mục</span>
              <span>
                <i className="fa-solid fa-trash"></i>
              </span>
            </button>

            <button
              type="button"
              className="btn btn-primary reportFolder productdetail-edit-export"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              <span>Xuất báo cáo</span>
              <span>
                <i className="fa-solid fa-file-export"></i>
              </span>
            </button>

            <div
              className="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1
                      className="modal-title fs-5 listCustomerTitle"
                      id="staticBackdropLabel"
                    >
                      Danh sách khách hàng
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    {listCustomerName.map((item, index) => {
                      return (
                        <div
                          key={"customer" + index}
                          className={cx("ListCustomerItem")}
                          onClick={() =>
                            handleExportReportFile(item)
                          }
                        >
                          <span>{item}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary CloseListCustomerTab"
                      data-bs-dismiss="modal"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
