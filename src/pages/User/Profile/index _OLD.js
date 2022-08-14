import { useContext } from "react";
import { AuthContext } from "../../../contexts/authContext";
//import { useEffect, UseState } from "react";
import { api } from "../../../api/api";
import { useNavigate, Link } from "react-router-dom";
import { LoggedNavbar } from "../../../components/LoggedNavbar";
import { TheChart } from "../../../components/Chart";

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
  
      <div style={{ margin: "50px" }}>
        <h1>Welcome back, {loggedInUser.user.name}!</h1>

        <div style={{ padding: "10px", margin: "35px" }}>
          <h2>Transactions</h2>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "60px",
            margin: "35px",
          }}
        >
          <div
            style={{
              width: "180px",
            }}
          >
            <Link to="/transaction/list-transactions">
              <Card
                hoverable
                style={{
                  // width: "90px",
                  border: "1px solid #1d3557f2",
                  borderRadius: "9px",
                  padding: "10px",
                }}
                cover={
                  <DollarCircleOutlined
                    style={{ color: "#1d3557f2", fontSize: "48px" }}
                  />
                }
              >
                <Meta title="Transactions" />
              </Card>
            </Link>
          </div>
          <div
            style={{
              width: "180px",
            }}
          >
            <Link to="/upload-csv">
              <Card
                hoverable
                style={{
                  // width: "90px",
                  border: "1px solid #1d3557f2",
                  borderRadius: "9px",
                  padding: "10px",
                }}
                cover={
                  <UploadOutlined
                    style={{ color: "#1d3557f2", fontSize: "48px" }}
                  />
                }
              >
                <Meta title="Upload csv file" />
              </Card>
            </Link>
          </div>
          <div
            style={{
              width: "180px",
            }}
          >
            <Link to="/transaction/manual/create">
              <Card
                hoverable
                style={{
                  // width: "90px",
                  border: "1px solid #1d3557f2",
                  borderRadius: "9px",
                  padding: "10px",
                }}
                cover={
                  <FormOutlined
                    style={{ color: "#1d3557f2", fontSize: "48px" }}
                  />
                }
              >
                <Meta title="Add transaction" />
              </Card>
            </Link>
          </div>
        </div>
        <div style={{ padding: "10px", margin: "35px" }}>
          <h2>Setup</h2>
        </div>
        <div
          // className="m-4 p-2 "
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "60px",
            margin: "35px",
          }}
        >
          <div className="mb-5"
            style={{
              width: "180px",
            }}
          >
            <Link to="/category/page-category">
              <Card
                hoverable
                style={{
                  // width: "90px",
                  border: "1px solid #1d3557f2",
                  borderRadius: "9px",
                  padding: "10px",
                }}
                cover={
                  <CheckCircleOutlined
                    style={{
                      color: "#1d3557f2",
                      fontSize: "48px",
                    }}
                  />
                }
              >
                <Meta title="Categories" />{" "}
              </Card>
            </Link>
          </div>
          <div className="mb-5"
            style={{
              width: "180px",
            }}
          >
            <Link to="/my-banks">
              <Card
                hoverable
                style={{
                  // width: "90px",
                  border: "1px solid #1d3557f2",
                  borderRadius: "9px",
                  padding: "10px",
                }}
                cover={
                  <BankOutlined
                    style={{ color: "#1d3557f2", fontSize: "48px" }}
                  />
                }
              >
                <Meta title="Bank Statement Templates" />
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
