import { useState } from "react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { LoggedNavbar } from "../../components/LoggedNavbar/index";
import styles from "./style.module.css";

export function Create() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    code: "",
    description: "",
    transactions: [],
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/category/new-category", form);
    } catch (err) {
      if (err.response.data._message === "Category validation failed") {
        return toast.error("There are Fields that have not been filled in!");
      }
    }
    toast.success("Successfully Created!");
    setTimeout(() => {
      navigate("/category/page-category");
    }, 1000);
  }

  return (
    <div>
      <LoggedNavbar />
      <div className="d-flex align-items-center justify-content-center mt-2 mb-5">
        <Toaster />
        <form className={styles.formContainer} required>
          <div className="mt-2">
            <label htmlFor="code-input" className="form-label">
              <h1 className="mb-4">Add Category</h1>
              <h5>Category Name</h5>
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="code"
              className="form-control mb-4"
              value={form.code}
              required
            />
            <label htmlFor="description-input" className="form-label">
              <h5>Description</h5>
            </label>
            <textarea
              id="description-input"
              onChange={handleChange}
              type="text"
              name="description"
              className="form-control mb-4"
              value={form.description}
              required
            />
          </div>
          <div>
            <button onClick={handleSubmit} className={`btn btn-primary ${styles.loggedBtn}`}>
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
