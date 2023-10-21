import "./Home.scss";
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Moment from "react-moment";
import "moment-timezone";
import Header from "../../components/GlobalStyle/Header/Header";
import classNames from "classnames";
import styles from "./Home.scss";
import logo from "../../assets/hyteklogo.png";
import moment from "moment-timezone";
import { handleDeleteFolder } from "../ProductDetail/Service/HandleDelete";

const cx = classNames.bind(styles);

function Home() {
  const [listFolder, setListFolder] = useState([]);

  // Call API lay du lieu trong Database
  useEffect(() => {
    async function getData() {
      await axios
        .get("http://localhost:3001/show")
        .then((response) => {
          setListFolder(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getData();
  }, []);

  // Xu ly chuyen trang ProductDetail
  const navigate = useNavigate();
  const handleLinktoProductDetail = (folderName) => {
    let formatPath = folderName.replace("/", "%2F");
    navigate("/product/" + formatPath);
  };

  // Xu ly tim kiem folder
  useEffect(() => {
    async function checkInputCondition() {
      const searchInput = document.querySelector(
        ".showproduct__container-searchbar input"
      );
      searchInput.addEventListener("input", (e) => {
        // .replace(/[^a-zA-Z ]/g, "")
        let txtSearch = e.target.value.toLowerCase();
        const listProductDOM = document.querySelectorAll(".Product-Item");
        listProductDOM.forEach((item) => {
          if (item.innerText.toLowerCase().includes(txtSearch)) {
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
        <div className={cx("showproduct__container-searchbar")}>
          <input type="text" placeholder="Nhập tên hoặc mã sản phẩm" />
        </div>

        <div className={cx("showproduct__container-listItem")}>
          <div className={cx("showproduct__container-listItem-table")}>
            <section className={cx("showproduct__table-header")}>
              <h1>Danh sách sản phẩm</h1>
            </section>
            <section className={cx("showproduct__table-body")}>
              <table className={cx("showproduct__table-body-cards")}>
                <thead className={cx("table-body-card-header")}>
                  <tr>
                    <th>STT</th>
                    <th>Tên Sản Phẩm</th>
                    <th>Mã Sản Phẩm</th>
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
                        <td
                          onClick={() =>
                            handleLinktoProductDetail(folder.folderName)
                          }
                        >
                          {folder.name}
                        </td>
                        <td> {folder.id} </td>
                        <td>{createAt}</td>
                        <td
                          className={cx("RowTableDelete")}
                          onClick={() => handleDeleteFolder(folder.folderName)}
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
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
