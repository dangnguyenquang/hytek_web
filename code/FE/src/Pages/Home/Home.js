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
    navigate("/product/" + folderName);
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
                    <th>Ngày tạo</th>
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
                        onClick={() =>
                          handleLinktoProductDetail(folder.folderName)
                        }
                      >
                        <td> {index} </td>
                        <td> {folder.name} </td>
                        <td> {folder.id} </td>
                        <td>{createAt}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
