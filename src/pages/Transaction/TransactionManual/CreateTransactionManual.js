import { useState } from "react";
import { api } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { LoggedNavbar } from "../../../components/LoggedNavbar/index";
import { DateConverter } from "../UploadCSV/date";
import styles from "./style.module.css";

export function CreateTransactionManual() {
  const navigate = useNavigate();
  const [transactionType, setTransactionType] = useState("Money Out");
  const [form, setForm] = useState({
    date: "",
    description: "",
    amount: 0,
    category: "",
  });
  const [category, setCategory] = useState([]);

  useEffect(() => {
    async function handleCategory(e) {
      try {
        const response = await api.get("/user/profile");
        setCategory(response.data.categories);
      } catch (error) {
        if (error) {
          return toast.error("could not create transactions!");
        }
      }
    }
    handleCategory();
  }, []);

  function SubmitCategory(e) {
    e.preventDefault();
    try {
      setForm({ ...form, category: e.target.value });
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleTransactionType(e) {
    if (e.target.value === "Money Out") {
      return setTransactionType("Money Out");
    } else {
      return setTransactionType("Money In");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (transactionType === "Money Out") {
      form.amount = form.amount * -1;
    }

    try {
      await api.post("/transaction/new-transaction", form);
      toast.success("Successfully Created!");

      return setTimeout(() => {
        navigate("/transaction/list-transactions");
      }, 800);
    } catch (err) {
      console.log(err);
      return toast.error("Please fill in all the boxes");
    }
    // setTimeout(() => {
    //   navigate("/transaction/list-transactions");
    // }, 1000);
  }

  return (
    <div>
      <LoggedNavbar />
      <div className="d-flex align-items-center justify-content-center mt-5">
        <Toaster />
        <form>
          <div className={`mb-5 ${styles.formContainer}`}>
            <div className="mt-2">
              <label htmlFor="category-input" className="form-label">
                <h1 className="mb-5">Add Transaction</h1>
                <h5>Select Category </h5>
              </label>
              <select
                name="select"
                onChange={SubmitCategory}
                defaultValue="Default"
                className="form-control"
              >
                <option disabled value="Default">
                  Select a Category
                </option>
                {category.map((currentElement) => {
                  return (
                    <option value={currentElement._id}>
                      {currentElement.code}
                    </option>
                  );
                })}
              </select>
              <label className="form-label mt-4">
                <h5>Transaction Type</h5>
              </label>
              <select
                defaultValue="default"
                onChange={handleTransactionType}
                className="form-select mb-4"
              >
                <option disabled value="default">
                  Select transaction type
                </option>
                <option>Money In</option>
                <option>Money Out</option>
              </select>
            </div>
            <label htmlFor="date-input" className="form-label">
              <h5>Date </h5>
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="date"
              className="form-control mb-4"
              placeholder="DD/MM/YYYY"
              value={form.date}
            />

            <label htmlFor="amount-input" className="form-label">
              <h5>Amount </h5>
            </label>
            <input
              onChange={handleChange}
              type="number"
              name="amount"
              min="0"
              className="form-control mb-4"
              value={form.amount}
            />
            <label htmlFor="description-input" className="form-label">
              <h5>Description </h5>
            </label>
            <textarea
              id="description-input"
              onChange={handleChange}
              type="text"
              name="description"
              className="form-control mb-4"
              value={form.description}
            />

            <div>
              <button
                onClick={handleSubmit}
                className={`btn btn-primary mt-4 mb-2 ${styles.loggedBtn}`}
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
