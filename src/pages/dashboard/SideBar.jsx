import React, { useEffect, useState } from 'react'
import { BsSpeedometer } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { IoStorefrontOutline, IoDiamondOutline, IoStatsChart } from 'react-icons/io5'
import { MdOutlineAdminPanelSettings, MdOutlineSchema } from 'react-icons/md'
import { GiBookmarklet, GiVerticalBanner } from 'react-icons/gi'
import { RiAdvertisementLine } from 'react-icons/ri'
import { HiUserGroup } from "react-icons/hi2";
import { IoMdNotificationsOutline } from "react-icons/io";


import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  ListGroup,
  Nav,
  Navbar,
  NavDropdown,
  NavLink,
  Offcanvas,
  Row,
} from "react-bootstrap";
import { Navigate, Navigation, useLocation, useNavigate } from "react-router-dom";
import {
  AiFillAppstore,
  AiFillDatabase,
  AiOutlineRise,
  AiFillSignal,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import './index.css'
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import baseURL from "../../Services/Url";
import { AgGridReact } from "ag-grid-react";
import logozelt from '../../assets/imagesCustomer/logozelt.png'
import moment from 'moment'
import { BaseURL } from '../../URL'



function SideBar({ Navigation }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true)
  const [counter, setCounter] = useState(0)
  const [dashboardData, setDashboardData] = useState({});
  const [liveRate, setLiveRate] = useState("");
  const [grate, setgrate] = useState();
  const [vendorDetails] = useState(
    JSON.parse(localStorage.getItem("vendorDetails"))
  );


  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    liveRateData();
    Goldrate()
  }, [])

  const liveRateData = async () => {
    try {
      const liveData = await axios.get(`${BaseURL}/user/live-rate`,
        {
          headers: {
            "x-access-token": localStorage.getItem("accessToken"),
          }
        });
      if (liveData?.status === 200) {
        console.log("liveData?.data", liveData?.data);
        const twentyTwoKaratValue22 = parseInt(liveData?.data?.goldRatePerGram22K)?.toFixed(2);

        setLiveRate(twentyTwoKaratValue22)

      }
    } catch (error) {
      console.log(error);
    }
  };


  const date = moment().format("YYYY-MM-DD")
  console.log("date", date, grate);

  const Goldrate = () => {
    const token = localStorage.getItem('accessToken');
    axios.get(`${BaseURL}/admin/goldraterouter/getgoldrateAsperdate`, {
      headers: {
        "x-access-token": token
      },
      params: {  // Use params instead of body for GET requests
        date: date
      }
    })
      .then((response) => {
        console.log(response, "RESPONSE DATA");
        if (response.status === 200) {
          setgrate(response?.data?.goldrate);
        }
      })
      .catch((error) => {
        console.error("Error fetching gold rate:", error);
      });
  };

  const handleClick = (e) => {

    // console.log(e);
    Navigation.navigate(`/list_out`, {
      data: e
    })
  }

  const getUserDetails = async () => {
    try {
      // const response = await axios.get("http://localhost:3050/user", {
      const response = await axios.get("https://zelt-auth.moshimoshi.cloud/user", {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("accessToken"),
        },
      });
      if (response.status === 200) {
        setUserDetails(response.data.data);
        // setEditUserDetails(response.data.data);

        console.log(response.data.data, "hello");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUserDetails()
  }, [])





  const VendorScreens = [{
    path: '/vendorDashboard',
    name: 'Dashboard',
    icon: <BsSpeedometer className="icons" />
  },
  {
    path: '/vendorProfile',
    name: 'Profile',
    icon: <CgProfile className='icons' />
  },
  {
    path: '/vendorStore',
    name: 'My Store',
    icon: <IoStorefrontOutline className='icons' />
  },
  // {
  //   path: '/request',
  //   name: 'Request',
  //   icon: <MdOutlineAdminPanelSettings className='icons' />
  // },
  {
    path: '/vendorProducts',
    name: 'Products',
    icon: <IoDiamondOutline className='icons' />
  },
  {
    path: '/vendorScheme',
    name: ' Scheme',
    icon: <MdOutlineSchema className='icons' />
  },
  // {
  //   path: '/vendorStats',
  //   name: 'Stats',
  //   icon : <IoStatsChart className='icons'/>
  // },
  // {
  //   path: '/customer',
  //   name: 'Customer',
  //   icon: <IoStatsChart className='icons' />
  // },
  {
    path: '/vendorBrochure',
    name: 'Brochure',
    icon: <GiBookmarklet className='icons' />
  },
  {
    path: '/AddBanner',
    name: 'Add Banner',
    icon: <GiVerticalBanner className='icons' />
  },
  {
    path: '/AddAdvertisement',
    name: 'Promote Product',
    icon: <RiAdvertisementLine className='icons' />
  },
  {
    path: '/CustomersList',
    name: 'Customers',
    icon: <HiUserGroup className='icons' />
  },
  {
    path: '/Wallete',
    name: 'Wallete',
    icon: <HiUserGroup className='icons' />
  },
  {
    path: '/Notification',
    name: 'Notification',
    icon: <IoMdNotificationsOutline className='icons' />
  },
  ]

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  useEffect(() => {
    if (!vendorDetails) return; // Run only if customer exists

    const fetchVendorList = () => {
      getvendors();
    };

    // Call immediately
    fetchVendorList();

    // Set interval to call every 1 minute
    const interval = setInterval(fetchVendorList, 60000);

    // Cleanup on unmount or when customer changes
    return () => clearInterval(interval);
  }, [vendorDetails]);


  const getvendors = () => {
    axios.get(`${BaseURL}/Vendor/getvendors/${vendorDetails?._id}`, {
      headers: {
        "x-access-token": localStorage.getItem("accessToken") // Ensure token is passed
      }
    })
      .then((response) => {
        console.log("RESPONSE DATA:", response);

        if (response.status === 200) {
          if (response.data.vendor.blockstatus === true) {
            window.location.assign("/")
            return;
          }
        } else {
          alert(response?.data?.message || "Something went wrong!");
        }
      })
      .catch((error) => {
        console.log("Axios Error:", error.response);
        if (error.response) {
          alert(error.response.data.error || "Authorization failed!");
          window.location.assign("/")
        } else if (error.request) {
          // If no response received (server might be down)
          // alert("No response from server. Check your connection.");
          console.log("No response from server. Check your connection.");
        } else {
          // Other errors
          console.log("Request failed. Please try again.");
          // alert("Request failed. Please try again.");
        }
      });
  };




  return (
    <>
      <div className={`sidebar${isOpen ? ' open' : ''}`}>
        <div className="sidebar-header d-flex align-items-center">
          <img src={logozelt} width="25%" height="20%" className="m-0" alt="logo" />
          <div className='w-100 m-2'>
            <h1 className='fs-2'>Zelt</h1>
          </div>
        </div>
        {/* <div className='w-100 '>
          <div className='d-flex p-3' style={{ backgroundColor: '#dceaf8' }} >
            <img src={userDetails?.image} width="25%" height="20%" className="m-1" />

            <div>
              <h3 className='fs-6 m-1 fw-bold'>  {userDetails?.name}</h3>
              <h3 className=' m-1 fw-bold' style={{ fontSize: '15px' }}>{userDetails?.email}</h3>
            </div>
          </div>
        </div> */}
        <div className="sidebar-content mt-4">
          {VendorScreens.map((nav, i) => (
            <p key={i} className={`cursor fs-6 pt-2 pb-1 px-2 m-0 fw-bold ${location.pathname === nav.path ? 'active' : ''}`}>
              <Link to={nav?.path} className="p-1">
                {nav?.icon} {nav?.name}
              </Link>
            </p>
          ))}
        </div>
        <div className='mt-5' style={{ backgroundColor: '#d9d6a9', padding: "10px" }}>
          <div className='mt-2'>
            <h1 className='fs-6 fw-bold w-100 m-1'>Live Rate</h1>
            {/* <p className='fw-bold text-danger w-100 '>{liveRate}</p> */}
            {/* <Row>
              <Col md={8}>24ct @1gm</Col>
              <Col md={4} className='text-danger'>27000</Col>
            </Row> */}
            <Row>
              <Col md={8}>22ct @1gm</Col>
              <Col md={4} className='text-danger'>{grate?.g22ct}/-</Col>
            </Row>
            {/* <Row>
              <Col md={8}>Silver @1gm</Col>
              <Col md={4} className='text-danger'>27000</Col>
            </Row>
            <Row>
              <Col md={8}>Platinum @1gm</Col>
              <Col md={4} className='text-danger'>27000</Col>
            </Row> */}
          </div>
        </div>
      </div>
    </>
  );
}
// }

export default SideBar;
