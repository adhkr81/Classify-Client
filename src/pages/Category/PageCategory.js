import { api } from "../../api/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { LoggedNavbar } from "../../components/LoggedNavbar/index";
import styles from "./style.module.css";

export function PageCategory() {
  const [data, setData] = useState([
    { name: "", description: "", transactions: [] },
  ]);
  const [dataClone, setDataClone] = useState([
    { name: "", description: "", transactions: [] },
  ]);
  const [searchbar, setSearchbar] = useState({ name: "" });

  useEffect(() => {
    async function Categories() {
      try {
        const response = await api.get("/category/categories");
        setData(response.data);
        setDataClone(response.data);
      } catch (error) {
        if (error) {
          return toast.error("could not load categories");
        }
      }
    }
    Categories();
  }, []);

  function handleChange(event) {
    setSearchbar({ ...searchbar, [event.target.name]: event.target.value });
    setDataClone(
      data.filter((current) =>
        current.code.toLowerCase().includes(searchbar.name.toLowerCase())
      )
    );
    if (event.target.value.length < 3) {
      setDataClone(data);
    }
  }

  // console.log(dataClone)

  return (
    <div>
      <LoggedNavbar />
      <Toaster />

			<div className="container mb-4 mt-3">
				<h2 className="mt-5">Categories</h2>
					<div className="d-flex justify-content-between">
						<Link to="/category/create">
							<button type="button" className={`btn btn-primary ${styles.loggedBtn}`}>Add New</button>
						</Link>
						<form>
							<input placeholder=" search by category"  className={`form-control ${styles.inputbar}`} name="name" type="text" onChange={handleChange} />
						</form>
					</div>
			</div>
			<div className="container">
				<table className="table">
					<thead>
						<th>Category</th>
						<th>Description</th>
						<th></th>
					</thead>
					<tbody>
						{dataClone.map((current) => {
							return (
								<tr>
									<td>
										<p>{current.code}</p>
									</td>
									<td>
										<p>{current.description}</p>
									</td>
									<td>
										<div className="d-flex flex-row-reverse">
											<Link to={`/category/delete/${current._id}`}>
												<button className={`btn btn-primary ${styles.loggedDelete}`}>Delete</button>
											</Link>

											<Link to={`/category/edit/${current._id}`}>
												<button className={`btn btn-primary ${styles.loggedBtn}`}>Edit</button>
											</Link>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<div className={styles.footer}></div>
			</div>
		</div>
	);
}
