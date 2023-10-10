import { useParams } from "react-router-dom";
import "./ProductDetail.scss";
import classNames from "classnames";
import styles from "./ProductDetail.scss";
import Header from "../../components/GlobalStyle/Header/Header";

const cx = classNames.bind(styles);

function ProductDetail() {
  const { folderName } = useParams();

  // Call API get data

  return (
    <>
      <Header />
      <div>
        <h2>Product Detail of {folderName}</h2>
      </div>
      <div>
        <div className={cx("Condition-Item")}>
          <p class="d-inline-flex gap-1 ConditionBtn">
            <button
              class="btn btn-primary collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse2"
              aria-expanded="true"
              aria-controls="collapse2"
            >
              Design Data
            </button>
          </p>
          <div class="collapse show ListCondition" id="collapse2">
            <div class="card card-body Conditions">
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
