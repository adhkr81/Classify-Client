import { useState } from "react";
import styles from "./style.module.css";

export function BankModelForm(props) {
  const bankModel = props.bank;
  const setBankModel = props.setBank;
  const [format, setFormat] = useState("amount");

  function handleChange(e) {
    setBankModel({ ...bankModel, [e.target.name]: e.target.value });
  }

  return (
    <>
    <div className="d-flex align-items-center justify-content-center mt-2 mb-5">
      <div className={styles.formContainer} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <label>
            <h3 className="mt-4">Bank Name</h3>
          </label>
        </div>
        <div>
          <input
            className="form-control"
            name="bankName"
            style={{ width: "400px" }}
            placeholder="The bank name"
            value={bankModel.bankName}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label
            data-toggle="tooltip"
            data-placement="top"
            title="What digit separates values in the bank statement? (eg. comma, semi-colons)"
          >
            <h3>File Delimiter</h3>
          </label>
        </div>
        <div>
          <input
          className="form-control"
            name="delimiter"
            type="text"
            style={{ width: "400px" }}
            placeholder="What digit separates values in the bank statement? (eg. comma, semi-colons)"
            value={bankModel.delimiter}
            onChange={handleChange}
            data-toggle="tooltip"
            data-placement="top"
            title="What digit separates values in the bank statement? (eg. comma, semi-colons)"
          ></input>
        </div>
        <div>
          <label>
            <h3>Description Colunm</h3>
          </label>
        </div>
        <div>
          <input
          className="form-control"
            name="description"
            style={{ width: "400px" }}
            placeholder="Which colunm corresponds to Date?"
            value={bankModel.description}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>
            <h3>Date Colunm</h3>
          </label>
        </div>
        <div>
          <input
          className="form-control"
            name="date"
            style={{ width: "400px" }}
            placeholder="Which colunm corresponds to Date?"
            value={bankModel.date}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>
            <h3>Date Format Colunm</h3>
          </label>
        </div>
        <div>
          <select
          className="form-control"
            defaultValue="default"
            name="dateFormat"
            // value={bankModel.dateFormat}
            onChange={handleChange}
          >
            <option disabled value="default">
              Select a Date Format
            </option>
            <option>DD/MM/YY</option>
            <option>MM/DD/YY</option>
            <option>YY/MM/DD</option>
          </select>
        </div>
        <div>
          <fieldset>
            <legend>
              <h3>File Format:</h3>
            </legend>

            <select
            className="form-control"
              defaultValue="default"
              onChange={(e) => {
                setFormat(e.target.value);
              }}
            >
              <option disabled value="default">
                Select the File Format
              </option>
              <option className="form-control" value="amount">Amount colunm only</option>
              <option className="form-control" value="debit-credit">Debit/Credit colunms</option>
            </select>
          </fieldset>
        </div>
        {format === "amount" ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>
              <h3>Amount Colunm</h3>
            </label>
            <input
            className="form-control"
              name="amount"
              style={{ width: "400px" }}
              placeholder="Which colunm corresponds to Amount?"
              value={bankModel.amount}
              onChange={handleChange}
            ></input>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>
                <h3>Debit Colunm</h3>
              </label>
              <input
              className="form-control"
                name="debit"
                style={{ width: "400px" }}
                placeholder="Which colunm corresponds to Debit?"
                value={bankModel.debit}
                onChange={handleChange}
              ></input>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label>
                <h3>Credit Colunm</h3>
              </label>
              <input
              className="form-control"
                name="credit"
                style={{ width: "400px" }}
                placeholder="Which colunm corresponds to Credit?"
                value={bankModel.credit}
                onChange={handleChange}
              ></input>
            </div>
          </>
        )}
        </div>
      </div>
    </>
  );
}
