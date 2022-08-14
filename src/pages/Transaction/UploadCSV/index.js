import Papa from "papaparse";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { LoggedNavbar } from "../../../components/LoggedNavbar";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { DateConverter } from "./date";
import { api } from "../../../api/api";

export function UploadCSV() {
  const navigate = useNavigate();
  const [banks, setBanks] = useState([]);
  //useEffect para definir esses banks

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await api.get("/bank/bank-model");
        setBanks(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBanks();
  }, []);

  const [bankModel, setBankModel] = useState([]);
  const [transactions, setTransactions] = useState([]);

  function createObject(d, b) {
    setTransactions(
      d.map((currEle) => {
        let realAmount = 0;
        //
        if (Number(currEle[b["amount"]]) !== 0 && currEle[b["amount"]]) {
          realAmount = Number(currEle[b["amount"]]);
        } else {
          realAmount =
            Number(currEle[b["credit"]]) + Number(currEle[b["debit"]]);
        }
        return {
          date: currEle[b["date"]],
          description: currEle[b["description"]],
          amount: realAmount,
        };
      })
    );
  }

  function processCSV(e) {
    let data = [];
    setTransactions([]);
    const files = e.target.files;
    //export this as function
    Papa.parse(files[0], {
      skipEmptyLines: true,
      header: true,
      // columns: banks[bankModel].columns,
      delimiter: bankModel.delimiter,
      complete: function (results) {
        // data = [];
        data = results.data;
        createObject(data, bankModel);
      },
    });
  }

  async function sendToBack(e) {
    e.preventDefault();

    for (let i = 0; i < transactions.length; i++) {
      try {
        transactions[i]["date"] = DateConverter(
          transactions[i]["date"],
          bankModel["dateFormat"]
        );
        await api.post("transaction/new-transaction", transactions[i]);
      } catch (error) {
        if (error) {
          return toast.error("Could not upload the file, please try again!");
        }
      }
    }
    toast.success("File uploaded successfully!");
    setTimeout(() => {
      navigate("/transaction/list-transactions");
    }, 1900);
  }

  function handleUpdate(e) {
    if (e.target.name === "amount") {
      if (
        typeof Number(e.target.value) === NaN ||
        typeof Number(e.target.value)
      ) {
        return console.log("ERROR");
      }
    }

    const clone = [...transactions];
    clone[e.target.id][e.target.name] = e.target.value;
    setTransactions(clone);
  }

  function handleDelete(e) {
    const clone = [...transactions];
    clone.splice(e.target.id, 1);
    setTransactions(clone);
  }

  return (
    <>
      <Toaster />
      <LoggedNavbar />
      <div className="d-flex align-items-center justify-content-center mt-5">
        <div className={`d-flex flex-column ${styles.formContainer}`}>
          <h1 className="mb-2 mt-2">Upload CSV</h1>
          <select
            className="form-control mb-4 mt-4"
            defaultValue={"Select your bank"}
            onChange={(e) => {
              if (e.target.value === "Create new model") {
                return navigate("/new-bank-model");
              }
              setBankModel(banks[e.target.value]);
            }}
          >
            <option value={"Select your bank"} disabled>
              Select your bank
            </option>
            {banks.map((elem, i) => {
              return (
                <option id={elem._id} value={i}>
                  {elem.bankName}
                </option>
              );
            })}
            <option name="new-model" id="new-model">
              Create new model
            </option>
          </select>
          {bankModel.length === 0 ? (
            <input type="file" accept=".csv" onChange={processCSV} disabled />
          ) : (
            <input type="file" accept=".csv" onChange={processCSV} />
          )}

          {transactions[0] ? (
            <>
              <table>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>

                {transactions.map((elem, i) => {
                  return (
                    <tr>
                      <td>
                        <p>{transactions[i]["date"]}</p>
                      </td>
                      <td>
                        <input
                          value={transactions[i]["description"]}
                          name="description"
                          onChange={handleUpdate}
                          id={i}
                        />
                      </td>
                      <td>
                        <p>{transactions[i]["amount"]}</p>
                      </td>
                      <td>
                        <button
                          className={`btn btn-danger`}
                          onClick={handleDelete}
                          id={i}
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </>
          ) : (
            <></>
          )}
          <button
            onClick={sendToBack}
            className={`btn btn-primary mt-4 mb-2 ${styles.loggedBtn}`}
          >
            SEND
          </button>
        </div>
      </div>
    </>
  );
}
