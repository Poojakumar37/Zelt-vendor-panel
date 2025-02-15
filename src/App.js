import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import VendorDashboard from "./pages/VendorPanel.js/vendorDashboard/VendorDashboard";
import VendorProfile from "./pages/VendorPanel.js/vendorProfile/VendorProfile";
import MyStore from "./pages/VendorPanel.js/myStore/MyStore";
import ManageAdmin from "./pages/VendorPanel.js/manageAdmin/ManageAdmin";
import ManagePhysicalGold from "./pages/VendorPanel.js/managePhysicalGold/ManagePhysicalGold";
import ManageSchemes from "./pages/VendorPanel.js/manageSchemes/ManageSchemes";
import Stats from "./pages/VendorPanel.js/storeStats/Stats";
import AddBrochure from "./pages/VendorPanel.js/addBrochure/AddBrochure";
import CreateScheme from "./pages/VendorPanel.js/manageSchemes/CreateScheme";
import JewellerySold from "./pages/VendorPanel.js/storeStats/JewellerySold";
import JewelleryDetail from "./pages/VendorPanel.js/storeStats/JewelleryDetail";
import SchemeDetail from "./pages/VendorPanel.js/storeStats/SchemeDetail";
import SchemesSold from "./pages/VendorPanel.js/storeStats/SchemesSold";
import BrochureRequest from "./pages/VendorPanel.js/storeStats/BrochureRequest";
import CustomerDetail from "./pages/VendorPanel.js/storeStats/CustomerDetail";
import ProtectedRoute from './pages/Routers/ProtectedRoute';
import ChooseScheme from "./pages/VendorPanel.js/manageSchemes/ChooseScheme";
import AddBanner from "./pages/VendorPanel.js/addBanner/AddBanner";
import AddAdvertisement from "./pages/VendorPanel.js/addAdvertisement/AddAdvertisement";
import Request from "./pages/VendorPanel.js/Request/Request";
import Customer from "./pages/VendorPanel.js/Customer/Customer";
import ForgotPassword from './pages/auth/ForgotPassword'
import CustomersList from "./pages/VendorPanel.js/Customers/CustomersList";
import CustomersScheme from "./pages/VendorPanel.js/Customers/CustomersScheme";
import Notification from "./pages/VendorPanel.js/Notification/Notification";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route
          path="/vendorDashboard"
          element={
            <ProtectedRoute>
              <VendorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendorProfile"
          element={
            <ProtectedRoute>
              <VendorProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendorStore"
          element={
            <ProtectedRoute>
              <MyStore />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendorAdmin"
          element={
            <ProtectedRoute>
              <ManageAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendorProducts"
          element={
            <ProtectedRoute>
              <ManagePhysicalGold />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendorScheme"
          element={
            <ProtectedRoute>
              <ManageSchemes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendorStats"
          element={
            <ProtectedRoute>
              <Stats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendorBrochure"
          element={
            <ProtectedRoute>
              <AddBrochure />
            </ProtectedRoute>
          }
        />
        <Route
          path="/CreateScheme"
          element={
            <ProtectedRoute>
              <CreateScheme />
            </ProtectedRoute>
          }
        />
        <Route
          path="/CustomersList"
          element={
            <ProtectedRoute>
              <CustomersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/CustomersScheme"
          element={
            <ProtectedRoute>
              <CustomersScheme />
            </ProtectedRoute>
          }
        />
        <Route
          path="/JewellerySold"
          element={
            <ProtectedRoute>
              <JewellerySold />
            </ProtectedRoute>
          }
        />
        <Route
          path="/JewelleryDetail"
          element={
            <ProtectedRoute>
              <JewelleryDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SchemesSold"
          element={
            <ProtectedRoute>
              <SchemesSold />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Schemes"
          element={
            <ProtectedRoute>
              <SchemeDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/BrochureRequest"
          element={
            <ProtectedRoute>
              <BrochureRequest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/CustomerDetail"
          element={
            <ProtectedRoute>
              <CustomerDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ChooseScheme"
          element={
            <ProtectedRoute>
              <ChooseScheme />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddBanner"
          element={
            <ProtectedRoute>
              <AddBanner />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AddAdvertisement"
          element={
            <ProtectedRoute>
              <AddAdvertisement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/request"
          element={
            <ProtectedRoute>
              <Request />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer"
          element={
            <ProtectedRoute>
              <Customer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgotpassword"
          element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Notification"
          element={
            <ProtectedRoute>
              <Notification />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
