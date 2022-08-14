import { Button, Drawer } from "antd";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./style.module.css";

import { Card } from "antd";
import {
  CheckCircleOutlined,
  BankOutlined,
  DollarCircleOutlined,
  UploadOutlined,
  FormOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

const ClassifyButton = () => {
  const { Meta } = Card;
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <div>
        <Button
          // type="button"
          hoverable
          onClick={showDrawer}
          className={styles.buttonClear}
          style={{
            margin: "0",
            fontFamily: "inherit",
            fontSize: "inherit",
            lineHeight: "inherit",
            margin: "0px",
            padding: "0px",
          }}
          id="classify"
          title="Classify"
        >
          Classify
        </Button>
        <Drawer
          width={"300px"}
          title="close"
          placement="left"
          onClose={onClose}
          visible={visible}
        >




  

            <div className={styles.transactions}>

            <h2 className="text-center">Setup</h2>

            <Link to="/profile">
              <button className={`btn btn-primary m-1 ${styles.loggedBtn}`}>
              <div>
              <PieChartOutlined
                      style={{
                        color: "#fcfaf9",
                        fontSize: "30px",
                      }}
                    /> Profile
              </div>      
              </button>
            </Link>  

            <Link to="/upload-csv">
              <button className={`btn btn-primary m-1 ${styles.loggedBtn}`}>
              <UploadOutlined
                    style={{ color: "#fcfaf9", fontSize: "30px" }}
                  /> Upload csv file 
              </button>
            </Link>

            <Link to="/my-banks">
              <button className={`btn btn-primary m-1 ${styles.loggedBtn}`}>
              <BankOutlined
                    style={{ color: "#fcfaf9", fontSize: "30px" }}
                  /> Bank Templates 
              </button>
            </Link>

            <h2 className="text-center">Transactions</h2>

            <Link to="/transaction/list-transactions">
              <button className={`btn btn-primary m-1 ${styles.loggedBtn}`}>
                <DollarCircleOutlined style={{ color: "#fcfaf9", fontSize: "30px" }}/> Transaction 
              </button>
            </Link>

            <Link to="/transaction/manual/create">
              <button className={`btn btn-primary m-1 ${styles.loggedBtn}`}>
              <FormOutlined
                    style={{ color: "#fcfaf9", fontSize: "30px" }}
                  /> Add transaction 
              </button>
            </Link>

            <Link to="/category/page-category">
              <button className={`btn btn-primary m-1 ${styles.loggedBtn}`}>
              <CheckCircleOutlined
                    style={{
                      color: "#fcfaf9",
                      fontSize: "30px",
                    }}
                  /> Categories 
              </button>
            </Link>

            </div>
        </Drawer>
        
      </div>
    </>
  );
};

export default ClassifyButton;
