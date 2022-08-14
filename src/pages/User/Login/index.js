import { useState, useContext } from "react";
import { AuthContext } from "../../../contexts/authContext";
import { api } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { Toaster, toast } from "react-hot-toast";

export function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { setLoggedInUser } = useContext(AuthContext);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSumit(e) {
    e.preventDefault();

    try {
      const response = await api.post("/user/login", form);
      setLoggedInUser({ ...response.data });

      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
    } catch (error) {
      if (error) {
        return toast.error("Invalid email or password!");
      }
    }

    setTimeout(() => {
      navigate("/profile");
    }, 10);
  }

  return (
    <>
      <Toaster />
      <div className={styles.divLogin}>
        <div className="d-flex align-items-center justify-content-center mt-5">
          <div className={styles.formContainer}>
            <form
              className="d-flex align-items-center flex-column mt-4"
              onSubmit={handleSumit}
            >
              <h2 className={`mb-4 ${styles.textWhite}`}>Welcome back!</h2>

              <div className="container">
                <input
                  className={`form-control mb-4 ${styles.input}`}
                  placeholder="user"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="container">
                <input
                  name="password"
                  value={form.password}
                  type="password"
                  className={`form-control mb-4 ${styles.input}`}
                  placeholder="password"
                  onChange={handleChange}
                />
              </div>

              <button
                className={`btn btn-danger ${styles.button}`}
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
