import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
//pages
import Home from "./components/pages/Home";
import Shop from "./components/pages/Shop";
import Login from "./components/pages/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import DashProduct from "./components/Dashboard/DashProduct";
import DashUsers from "./components/Dashboard/DashUsers";
import DashAddUsers from "./components/Dashboard/DashAddUsers";
import DashEditUser from "./components/Dashboard/DashEditUser";
import DashAddProduct from "./components/Dashboard/DashAddProduct";
import DashEditProduct from "./components/Dashboard/DashEditProduct";
import Loading from "./components/Initial/Loading";
import ProtectedRoute from "./services/ProtectedRoute";
import Learnmore from "./components/pages/Learnmore";
import Search from "./components/pages/Search";
import DashCategory from "./components/Dashboard/DashCategory";
import DashAddCategory from "./components/Dashboard/DashAddCategory";
import DashEditCategory from "./components/Dashboard/DashEditCategory";
import Notfound from "./components/pages/Notfound";
import Aboutus from "./components/pages/Aboutus";
import ProductDetail from "./components/pages/ProductDetail";
import Contactus from "./components/pages/Contactus";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* main pages */}
          <Route path="*" element={<Notfound />} /> {/* not found */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/login" element={<Login />} />
          <Route path="/learnmore" element={<Learnmore />} />
          <Route path="/search" element={<Search />} />
          <Route path="/aboutus" element={<Aboutus/>} />
          <Route path="/contactus" element={<Contactus/>} />
          <Route path="/product" element={<ProductDetail/>} />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="ADMIN">
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/products"
            element={
              <ProtectedRoute role="ADMIN">
                <DashProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/products/addproducts"
            element={
              <ProtectedRoute role="ADMIN">
                <DashAddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/products/editproducts/:id"
            element={
              <ProtectedRoute role="ADMIN">
                <DashEditProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/users"
            element={
              <ProtectedRoute role="ADMIN">
                <DashUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/users/addusers"
            element={
              <ProtectedRoute role="ADMIN">
                <DashAddUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/users/editusers/:id"
            element={
              <ProtectedRoute role="ADMIN">
                <DashEditUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/category"
            element={
              <ProtectedRoute role="ADMIN">
                <DashCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/category/addcategory"
            element={
              <ProtectedRoute role="ADMIN">
                <DashAddCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/category/editcategory/:id"
            element={
              <ProtectedRoute role="ADMIN">
                <DashEditCategory />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
