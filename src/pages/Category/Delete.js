import { api } from "../../api/api";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { LoggedNavbar } from "../../components/LoggedNavbar/index";
import styles from "./style.module.css";

export function Delete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    code: "",
    description: "",
    transactions: [],
  });

  useEffect(() => {
    async function deletedCategory() {
      try {
        const response = await api.get(`category/${id}`);
        setForm({ ...response.data });
      } catch (err) {
        if (err) {
          return toast.error("Could not load Category!");
        }
      }
    }
    deletedCategory();
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleDelete(e) {
    e.preventDefault();
    try {
      await api.delete(`category/delete/${id}`);
    } catch (error) {
      if (error) {
        return toast.error("Unable to Delete Category!");
      }
    }
    toast.success("Successfully Deleted!");
    setTimeout(() => {
      navigate("/category/page-category");
    }, 1000);
  }

  return (
    <div>
      <LoggedNavbar />
      <div className="d-flex align-items-center justify-content-center mt-2 mb-5">
        <Toaster />
        <form className={styles.formContainer}>
          <div className="mb-4">
          <h1 className="mb-4">Delete Category</h1>
            <p><h5>Category: </h5>{form.code}</p>
            <p><h5>Description: </h5>{form.description}</p>
          </div>
          <div>

            <p>Deleting a category will remove all your transactions records in the database. Do you want to proceed?</p>
            <button onClick={handleDelete}  className={`btn btn-primary ${styles.loggedDelete}`}>
              CONFIRM
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
