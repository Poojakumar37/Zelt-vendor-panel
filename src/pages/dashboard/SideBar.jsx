import React, { useEffect, useState } from 'react'


import {
  Accordion,
  Button,
  Card,
  Container,
  Form,
  FormControl,
  ListGroup,
  Nav,
  Navbar,
  NavDropdown,
  NavLink,
  Offcanvas,
} from "react-bootstrap";
import { Navigate,Navigation, useNavigate } from "react-router-dom";
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



function SideBar({ Navigation }) {
  const [isOpen, setIsOpen] = useState(false)
    const [counter, setCounter] = useState(0)
  const handleClick =(e)=>{

    // console.log(e);
    Navigation.navigate(`/list_out`,{
      data:e
    })
  }
  
  // let navigate = useNavigate();
  // const [reloadPage, setReloadPage] = useState(1);
  // const [rowData, setRowdata] = useState([]);
  // useEffect(() => {
  //   axios({
  //     mathod: "GET",
  //     url: `${baseURL}/category`,
  //   }).then((res) => {
  //     if (res.status == 200) {
  //       // console.log(res.data);
  //       setRowdata(res.data)
  //       // console.log(res.data);
  //     }
  //   }).catch((err) => {
  //     console.log(err, 'err');
  //   })
  // }, [reloadPage])

  // const userType = 'Admin';
  const userType = '';

//   const AdminScreens = [{
//     path: '/dashboard',
//     name: 'Dashboard'
//   },
//   {
//     path: '/customer',
//     name: 'Customer'
//   },
//   {
//     path: '/vendor',
//     name: 'Vendor'
//   },
// ]

const VendorScreens = [{
  path: '/vendorDashboard',
  name: 'Dashboard'
},
{
  path: '/vendorProfile',
  name: 'Profile'
},
{
  path: '/vendorStore',
  name: 'My Store'
},
{
  path: '/vendorAdmin',
  name: 'Admin'
},
{
  path: '/vendorProducts',
  name: 'Physical Jewellery'
},
{
  path: '/vendorScheme',
  name: ' Scheme'
},
{
  path: '/vendorStats',
  name: 'Stats'
},
{
  path: '/vendorBrochure',
  name: 'Brochure'
},
]

  return (
    <div>          
      <div className="bg-light">
        <img src={logozelt} width="50%" height="20%" className="m-auto" />
      </div>
       <div>
        {/*<p className=" cursor fs-5">
          
          <Link to="/dashboard">Dashboard </Link>
        </p>
        <p className=" cursor fs-5">
          <Link to="/career-list" className="">
            Career{" "}
          </Link>
        </p>
        <p className=" cursor fs-5">
          <Link to="/blog-list" className="">
            Articles{" "}
          </Link>
        </p>
        <p className=" cursor fs-5">
          <Link to="/properties-list" className="">
            Properties{" "}
          </Link>
        </p>    
        <p className=" cursor fs-5">
          <Link to="/user_list" className="">
            User List{" "}
          </Link>
        </p>    
        <p className=" cursor fs-5">
          <Link to="/news-list" className="">
            News{" "}
          </Link>
        </p>
        <p className=" cursor fs-5">
          <Link to="/banner_img_list" className="">
            Banner Image{" "}
          </Link>
        </p>
        <p className=" cursor fs-5">
          <Link to="/award-list" className="">
            Awards{" "}
          </Link>
        </p>
        <p className=" cursor fs-5">
          <Link to="/services-list" className="">
            Services{" "}
          </Link>
        </p>
        <p className=" cursor fs-5">
          <Link to="/leadership-list" className="">
            Leadership{" "}
          </Link>
        </p>
        <p className=" cursor fs-5">
          <Link to="/executives-list" className="">
            Executives{" "}
          </Link>
        </p>
        <p className=" cursor fs-5">
          <Link to="/insights-list" className="">
            Insights{" "}
          </Link>
        </p>
        <p className=" cursor fs-5">
          <Link to="/casestudy-list" className="">
            Case Study{" "}
          </Link>
        </p>
        <p className=" cursor fs-5">
          <Link to="/propertyexpert-list" className="">
            Property Experts{" "}
          </Link>
        </p>
        <p className=" cursor fs-5">
          <Link to="/privay_list" className="">
            Privacy And Policy{" "}
          </Link>
        </p> */}
        {/* {userType=== '' && //userType=== 'Admin'
          <>
          {AdminScreens.map((nav, i) => {
            return (
              <p key={i} className=" cursor fs-5">
                <Link to={nav?.path} className="">
                  {`${nav?.name} `}
                </Link>
              </p>
            )
          })}
          </>
        } */}
        {userType=== '' && //userType=== 'Vendor'
          <>
          {VendorScreens.map((nav, i) => {
            return (
              <p key={i} className=" cursor fs-5">
                <Link to={nav?.path} className="">
                  {`${nav?.name} `}
                </Link>
              </p>
            )
          })}
          </>
        }
      </div>
    </div>
  );
}
// }

export default SideBar;
