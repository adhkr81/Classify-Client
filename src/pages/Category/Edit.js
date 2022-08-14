import { api } from "../../api/api";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { LoggedNavbar } from "../../components/LoggedNavbar/index";
import styles from "./style.module.css";

export function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    code: "",
    description: "",
    transactions: [],
  });

  useEffect(() => {
    async function EditedCategory() {
      try {
        const response = await api.get(`category/${id}`);
        setForm({ ...response.data });
      } catch (err) {
        if (err) {
          return toast.error("Could not load Category!");
        }
      }
    }
    EditedCategory();
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const clone = { ...form };
      delete clone._id;
      await api.patch(`category/update/${id}`, clone);
    } catch (error) {
      if (error) {
        return toast.error("There are Fields that have not been filled in!");
      }
    }
    toast.success("Successfully Update!");
    setTimeout(() => {
      navigate("/category/page-category");
    }, 1000);
  }

  return (
    <div>
      <LoggedNavbar />
      <div  className="d-flex align-items-center justify-content-center mt-2 mb-5">
        <Toaster />
        <form className={styles.formContainer}>
          <div className="mb-4">
            <label htmlFor="code-input" className="form-label">
            <h1 className="mb-4">Edit Category</h1>
              <h5>Category </h5>
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="code"
              className="form-control mb-4"
              value={form.code}
            />
            <label htmlFor="about-input" className="form-label">
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
          </div>
          <div>
            <button onClick={handleSubmit} className={`btn btn-primary ${styles.loggedBtn}`}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
