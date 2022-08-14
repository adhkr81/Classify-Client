import { api } from "../../api/api";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ClassifyModel from "../../assets/bank/ClassifyTemplate.csv";
import { LoggedNavbar } from "../../components/LoggedNavbar";
import { Toaster, toast } from "react-hot-toast";
import { Card } from "antd";

import styles from "./style.module.css";

export function BankModels() {
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await api.get("/bank/bank-model");
        setBanks(res.data);
      } catch (error) {
        if (error) {
          return toast.error("Unable to load the information!");
        }
      }
    };
    fetchBanks();
  }, []);

  return (
    <>
      <div>
        <LoggedNavbar />
        <div className="container mb-4 mt-3">
          <h2 className="mt-5">Your Banks</h2>
          <p>Here you can find all your Bank Statement csv models.</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          justifyContent: "center",
          margin: "95px",
        }}
      >
        {banks.map((elem) => {
          return (
            <div key={elem._id}>
              <Card
                style={{
                  // width: "90px",
                  border: "1px solid #1d3557f2",
                  borderRadius: "9px",
                  padding: "10px",
                  backgroundColor: "#fcfaf9",
                  boxShadow:
                    "2px 2px 28px rgba(29, 53, 87, 0.3), 2px 2px 52px rgba(252, 250, 249, 0.2)",
                }}
              >
                <h3 className=" d-flex flex-column align-items-center">{`${elem.bankName} Model`}
                <Link to={`/bank-model/${elem._id}`}>
                  <button
                    className={`btn btn-primary mt-4 ${styles.loggedBtn}`}
                    styles={{ "text-align": "center" }}
                  >
                    Edit
                  </button>
                </Link>
                </h3>
                
              </Card>
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          gap: "45px",
          margin: "25px",
          justifyContent: "center",
        }}
      >
        <Link to="/new-bank-model/">
          <button
            className={`btn btn-primary mb-5 ${styles.loggedBtn}`}
            style={{ fontSize: "28px" }}
          >
            Create Model
          </button>
        </Link>
        <a href={ClassifyModel} download="ClassifyTemplate.csv">
          <button
            className={`btn btn-primary mb-5 ${styles.loggedBtn}`}
            style={{ fontSize: "28px" }}
          >
            Download Model
          </button>
        </a>
      </div>
    </>
  );
}
