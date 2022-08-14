import styles from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import ClassifyButton from "./ClassifyButton";

export function LoggedNavbar() {
  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  }

  return (
    <nav className={`navbar ${styles.bgBlue}`}>
      <ul
        className={`d-flex justify-content-between align-items-center m-1 ${styles.navItems}`}
      >
        <li className="nav-item">
          <span className={`${styles.logoFont}`}>
            <div>
              <ClassifyButton />
            </div>
            {/* <Link to={"/profile"}>
              <button className={styles.buttonClear} id="classify">
                Classify
              </button>
            </Link> */}
          </span>
        </li>
        {
          <li className="nav-item">
            <div className={`container ${styles.textWhite}`}>
              <Link to={"/my-banks"}>
                <button className={styles.buttonClear} id="user">
                  Banks
                </button>
              </Link>
            </div>
          </li>
        }
        <li className="nav-item">
          <div className={`container ${styles.textWhite}`}>
            <Link to={"/transaction/list-transactions"}>
              <button className={styles.buttonClear} id="transactions">
                Transactions
              </button>
            </Link>
          </div>
        </li>
        <li className="nav-item">
          <div className={`container ${styles.textWhite}`}>
            <Link to={"/category/page-category"}>
              <button className={styles.buttonClear} id="category">
                Categories
              </button>
            </Link>
          </div>
        </li>
        <li className="nav-item">
          <button
            className={`btn btn-danger ${styles.button}`}
            id="logout"
            onClick={handleLogOut}
          >
            Log out
          </button>
        </li>
      </ul>
    </nav>
  );
}
