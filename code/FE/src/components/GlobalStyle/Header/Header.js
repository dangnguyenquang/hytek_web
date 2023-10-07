import "./Header.scss";
import classNames from "classnames";
import styles from "./Header.scss";
import { Link } from "react-router-dom";
import logo from "../../../assets/hyteklogo.png";
const cx = classNames.bind(styles);

function Header() {
  return (
    <div className={cx("HeaderGlobal")}>
      <div className={cx("Header__Logo")}>
        <img src={logo} />
      </div>
      <div className={cx("spacebetween__Logo-Nav")}></div>
      <div className={cx("Header__Navigation")}>
        <div className={cx("NavigationBtn GoToAddProduct")}>
          <Link
            style={{
              textDecoration: "none",
              color: "#000",
              fontSize: "1.7rem",
              padding: "10px",
              fontWeight: "600",
            }}
            to="/addproduct"
          >
            <i class="fa-solid fa-folder-plus"></i>
            <span>Thêm sản phẩm</span>
          </Link>
        </div>
        <div className={cx("NavigationBtn BackToHome-btn")}>
          <Link
            style={{
              textDecoration: "none",
              color: "#000",
              fontSize: "1.7rem",
              padding: "10px",
              fontWeight: "600",
            }}
            to="/"
          >
            <i className={cx("fa-solid fa-house")}></i>
            <span>Trang chủ</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
