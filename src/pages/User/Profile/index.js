import { useContext } from "react";
import { AuthContext } from "../../../contexts/authContext";
//import { useEffect, UseState } from "react";
import { api } from "../../../api/api";
import { useNavigate, Link } from "react-router-dom";
import { LoggedNavbar } from "../../../components/LoggedNavbar";
import { TheChart } from "../../../components/Chart";
import { TheChartEliel } from "../../../components/Chart/chartEliel";
import styles from "./style.module.css";

import { Card } from "antd";
import {
  CheckCircleOutlined,
  BankOutlined,
  DollarCircleOutlined,
  UploadOutlined,
  FormOutlined,
} from "@ant-design/icons";

export function Profile() {
  const { Meta } = Card;

  const navigate = useNavigate();

  const { loggedInUser } = useContext(AuthContext);

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  }

  return (
    <>
      <LoggedNavbar />
<div className="container">

    <h1 className="mb-3 mt-5">Welcome back, <strong>{loggedInUser.user.name}!</strong></h1>

    <p className="mb-5">This infographic helps you to improve your financial health.</p>
  
    <div className="d-flex flex-row align-items justify-content-center">
      <div className={`m-2 ${styles.shadow}`}>
        <TheChart />
      </div>  
      <div className={`m-2 ${styles.shadow}`}>
        <TheChartEliel />
      </div>  
    </div>

    <div className="container">
    <div className="d-flex flex-row align-items justify-content-center mt-5">   
            <Link to="/transaction/list-transactions">
              <button className={`btn btn-primary m-1 mb-5 ${styles.loggedBtn}`}>
                <DollarCircleOutlined style={{ color: "#fcfaf9", fontSize: "30px" }}/> Transaction 
              </button>
            </Link>

            <Link to="/upload-csv">
              <button className={`btn btn-primary m-1 mb-5 ${styles.loggedBtn}`}>
              <UploadOutlined
                    style={{ color: "#fcfaf9", fontSize: "30px" }}
                  /> Upload csv file 
              </button>
            </Link>

            <Link to="/transaction/manual/create">
              <button className={`btn btn-primary m-1 mb-5 ${styles.loggedBtn}`}>
              <FormOutlined
                    style={{ color: "#fcfaf9", fontSize: "30px" }}
                  /> Add transaction 
              </button>
            </Link>

            <Link to="/category/page-category">
              <button className={`btn btn-primary m-1 mb-5 ${styles.loggedBtn}`}>
              <CheckCircleOutlined
                    style={{
                      color: "#fcfaf9",
                      fontSize: "30px",
                    }}
                  /> Categories 
              </button>
            </Link>

            <Link to="/my-banks">
              <button className={`btn btn-primary m-1 mb-5 ${styles.loggedBtn}`}>
              <BankOutlined
                    style={{ color: "#fcfaf9", fontSize: "30px" }}
                  /> Bank Templates 
              </button>
            </Link>
            
        </div>
     </div>
</div>   


    </>
  );
}
