import "antd/dist/antd.css";

//TEMPLATES IMPORTS
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/User/Login/index";
import { Signup } from "./pages/User/Signup/index";
import { AuthContextComponent } from "./contexts/authContext";
import { Profile } from "./pages/User/Profile/index";
import { ErrorPage } from "./pages/ErrorPage";
import "./app.css";

//IMPORTS

//CATEGORY PAGES
import { Create } from "./pages/Category/Create";
import { Edit } from "./pages/Category/Edit";
import { Delete } from "./pages/Category/Delete";
import { PageCategory } from "./pages/Category/PageCategory";

//TRANSACTION PAGES
import { CreateTransactionManual } from "./pages/Transaction/TransactionManual/CreateTransactionManual";
import { UploadCSV } from "./pages/Transaction/UploadCSV/index";
import { Transactions } from "./pages/Transaction/PageTransactions/Transactions";

//BANK PAGES
import { BankModels } from "./pages/BankModels/BankModels";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { BankModelDetail } from "./pages/BankModels/BankModelDetail";
import { NewBankModel } from "./pages/BankModels/NewBankModel";

function App() {
  return (
    <>
      <AuthContextComponent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* TRANSACTIONS */}
          <Route path="/upload-csv" element={<UploadCSV />} />
          {/* CATEGORY */}
          <Route
            path="/category/page-category"
            element={<ProtectedRoute component={PageCategory} />}
          />
          <Route
            path="/category/create"
            element={<ProtectedRoute component={Create} />}
          />
          <Route
            path="/category/edit/:id"
            element={<ProtectedRoute component={Edit} />}
          />
          <Route
            path="/category/delete/:id"
            element={<ProtectedRoute component={Delete} />}
          />
          {/* BANKS */}
          <Route
            path="/my-banks"
            element={<ProtectedRoute component={BankModels} />}
          />
          <Route
            path="/bank-model/:bankId"
            element={<ProtectedRoute component={BankModelDetail} />}
          />
          <Route
            path="/new-bank-model"
            element={<ProtectedRoute component={NewBankModel} />}
          />

          <Route
            path="/profile"
            element={<ProtectedRoute component={Profile} />}
          />
          <Route
            path="/profiletest"
            element={<ProtectedRoute component={Profile} />}
          />
          <Route
            path="/transaction/manual/create"
            element={<ProtectedRoute component={CreateTransactionManual} />}
          />
          <Route
            path="/transaction/list-transactions"
            element={<ProtectedRoute component={Transactions} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthContextComponent>
    </>
  );
}

export default App;
