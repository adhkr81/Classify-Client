import { api } from "../../api/api";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BankModelForm } from "../../components/BankModelForm/BankModelForm";
import { LoggedNavbar } from "../../components/LoggedNavbar";
import { Toaster, toast } from "react-hot-toast";

import styles from "./style.module.css";

export function BankModelDetail() {
  const { bankId } = useParams();
  const [bankModel, setBankModel] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBankModel = async () => {
      try {
        const res = await api.get(`bank/${bankId}`);
        setBankModel({ ...res.data });
      } catch (error) {
        if (error) {
          return toast.error("Unable to load the information!");
        }
      }
    };
    fetchBankModel();
  }, []);

  async function SaveChanges() {
    try {
      delete bankModel._id;
      await api.patch(`bank/update-bank/${bankId}`, bankModel);
    } catch (error) {
      if (error) {
        return toast.error("User does not have permission to edit!");
      }
    }
    toast.success("Successfully Edited!");
    setTimeout(() => {
      navigate("/my-banks");
    }, 800);
  }

  async function Delete() {
    try {
      await api.delete(`bank/delete/${bankId}`);
    } catch (error) {
      if (error) {
        return toast.error("User does not have permission to delete!");
      }
    }
    toast.success("Successfully Deleted!");
    setTimeout(() => {
      navigate("/my-banks");
    }, 800);
  }

  return (
    <>
      <LoggedNavbar />
      <Toaster />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          margin: "45px",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <h1>Bank Model Details</h1>
        </div>
        <div>
          <BankModelForm bank={bankModel} setBank={setBankModel} />
        </div>
        <div className="d-flex">
          <div className="p-2">
            <button
              className={`btn btn-primary ${styles.loggedBtn}`}
              onClick={SaveChanges}
            >
              Save
            </button>
          </div>
          <div className="p-2">
            <button
              className={`btn btn-primary ${styles.loggedDelete}`}
              onClick={Delete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
