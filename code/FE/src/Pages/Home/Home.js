import "./Home.scss";
import React, { Fragment, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import Header from "../../components/GlobalStyle/Header/Header";
import classNames from "classnames";
import styles from "./Home.scss";

const cx = classNames.bind(styles);

function Home() {
  // Call API lay du lieu trong Database

  return (
    <Fragment>
      <Header />
      <div className={cx("showproduct__container")}>

        <div className={cx("showproduct__container-searchbar")}>
          <input type="text" placeholder="Nhập tên hoặc mã sản phẩm" />
        </div>


        <div className={cx("showproduct__container-listItem")}>
          <div className={cx("listItem__BoxCards")}>
            <div className={cx("listItem__BoxCards-Card")}>
              <div className={cx("Card__Img")}>
                <img />
                <img />
              </div>


              <div className={cx("Card__Data")}>
                {/* CardTitle */}
                <div className={cx("Card__Data-File CardTitle")}>
                  <span>Ten San Pham</span>
                  <span>Ma San Pham</span>
                </div>

                {/* CardDesignData */}
                <div className={cx("Card__Data-File CardDesignData")}>
                  <p className="d-inline-flex gap-1 ConditionBtn">
                    <button
                      className="btn btn-primary collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse1"
                      aria-expanded="true"
                      aria-controls="collapse1"
                    >
                      Design Data
                    </button>
                  </p>
                  <div className="collapse ListCondition" id="collapse1">
                    <div className="card card-body Conditions"></div>
                  </div>
                </div>

                {/* CardGerberData */}
                <div className={cx("Card__Data-File CardGerberData")}>
                  <p className="d-inline-flex gap-1 ConditionBtn">
                    <button
                      className="btn btn-primary collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse2"
                      aria-expanded="true"
                      aria-controls="collapse2"
                    >
                      Gerber Data
                    </button>
                  </p>
                  <div className="collapse ListCondition" id="collapse2">
                    <div className="card card-body Conditions"></div>
                  </div>
                </div>

                {/* CardBOMData */}
                <div className={cx("Card__Data-File CardBOMData")}>
                  <p className="d-inline-flex gap-1 ConditionBtn">
                    <button
                      className="btn btn-primary collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse3"
                      aria-expanded="true"
                      aria-controls="collapse3"
                    >
                      BOM Data
                    </button>
                  </p>
                  <div className="collapse ListCondition" id="collapse3">
                    <div className="card card-body Conditions"></div>
                  </div>
                </div>

                {/* CardAssemblyGuideline */}
                <div className={cx("Card__Data-File CardAssemblyGuideline")}>
                  <p className="d-inline-flex gap-1 ConditionBtn">
                    <button
                      className="btn btn-primary collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse4"
                      aria-expanded="true"
                      aria-controls="collapse4"
                    >
                      Assembly Guideline
                    </button>
                  </p>
                  <div className="collapse ListCondition" id="collapse4">
                    <div className="card card-body Conditions"></div>
                  </div>
                </div>

                {/* CardTestingGuideline */}
                <div className={cx("Card__Data-File CardTestingGuideline")}>
                  <p className="d-inline-flex gap-1 ConditionBtn">
                    <button
                      className="btn btn-primary collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse6"
                      aria-expanded="true"
                      aria-controls="collapse6"
                    >
                      Testing Guideline
                    </button>
                  </p>
                  <div className="collapse ListCondition" id="collapse6">
                    <div className="card card-body Conditions"></div>
                  </div>
                </div>

                {/* CardHistory */}
                <div className={cx("Card__Data-File CardHistory")}>
                  <p className="d-inline-flex gap-1 ConditionBtn">
                    <button
                      className="btn btn-primary collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse7"
                      aria-expanded="true"
                      aria-controls="collapse7"
                    >
                      Lịch sử sản xuất
                    </button>
                  </p>
                  <div className="collapse ListCondition" id="collapse7">
                    <div className="card card-body Conditions"></div>
                  </div>
                </div>
                
                {/* CardTroubleShootingGuideline */}
                <div
                  className={cx("Card__Data-File CardTroubleShootingGuideline")}
                >
                  <p className="d-inline-flex gap-1 ConditionBtn">
                    <button
                      className="btn btn-primary collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse8"
                      aria-expanded="true"
                      aria-controls="collapse8"
                    >
                      Trouble Shooting Guideline
                    </button>
                  </p>
                  <div className="collapse ListCondition" id="collapse8">
                    <div className="card card-body Conditions"></div>
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
