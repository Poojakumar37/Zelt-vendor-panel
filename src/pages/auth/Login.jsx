import React from 'react'
import { useState } from "react";

import { ToastContainer, toast, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Spinner } from "react-bootstrap";
import logozelt from './../../assets/imagesCustomer/logozelt.png'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false)
  const [loginForm, setLoginForm] = useState({
    phone: '',
    password: ''
  })
  const [loginFormErrors, setLoginFormErrors] = useState({
    phone: '',
    password: ''
  })

  const handleChangePhone = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters

    // Check if the numericValue is 10 digits or less
    if (numericValue.length <= 10) {
      setLoginForm((prevData) => ({
        ...prevData,
        [name]: numericValue,
      }));
    }
  };

  const handleChange = (event) => {
    setLoginForm({
      ...loginForm, [event.target.name]: event.target.value
    })
    setLoginFormErrors({
      ...loginFormErrors, [event.target.name]: null
    })
  }
  const handleValidation = () => {
    // const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const regText = /[A-Za-z]/
    const { phone, password } = loginForm
    const newErrors = {}
    if (!phone) {
      newErrors.phone = 'Please enter Phone Number'
    }
    else if (!phone) {
      newErrors.phone = 'user name should be text'
    }
    else if (phone && phone.length > 50) {
      newErrors.phone = 'username should be below 50 digits'
    }

    if (!password) {
      newErrors.password = 'Please enter Password'
    } else if (password && password.length > 50) {
      newErrors.password = 'password should be below 50 digits'
    }
    return newErrors
  }

  // eugia$#@!345
  const handleSubmit = () => {
    const handleValidationObject = handleValidation()
    if (Object.keys(handleValidationObject).length > 0) {
      setLoginFormErrors(handleValidationObject)
    } else {
      setLoader(true)
      let userCredentials = { 'phone': loginForm.phone, 'password': loginForm.password, 'type': "vendor" }
      const requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userCredentials)
      };
      axios.post('http://localhost:3001/api/vendor/login', userCredentials, { "headers": requestOptions })
        .then((response) => {
          console.log('response', response);
          if (response?.status === 200) {
            if (response?.data?.data?.blockstatus === true) {
              toast.error("You have been blocked by admin..! Please contact admin for more details.", {
                position: "top-center",
                autoClose: 5000, // Closes after 5 seconds
                pauseOnHover: true, // Stays open when hovered
                closeOnClick: true, // Allows manual closing
                draggable: false, // Prevents dragging
                transition: Zoom, // Smooth transition effect
              });
              setLoader(false)
            } else {
              localStorage.setItem('accessToken', response.data.token);
              localStorage.setItem('vendorDetails', JSON.stringify(response?.data?.data))
              toast.success('Login Successfully')
              setLoader(false)
              setLoginForm({
                ...loginForm,
                phone: '',
                password: ''
              })
              setTimeout(() => {
                navigate('/vendorDashboard');
              }, 1000);
              // }
              // }
            }
          } else {
            toast.error('user credentials are invalid')
            setTimeout(() => {
              setLoader(false)
            }, [1000])
          }

        })
        .catch((error) => {

          toast('Wrong Credentials', error);
          setLoginForm({
            ...loginForm,
            phone: '',
            password: ''
          })
          setLoader(false)
        })
    }
  }


  return (
    <div>
      {" "}
      <div>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar
          transition={Zoom}
          delay={500}
          limit={1}
        />
        <div class="login">
          <div className="row">
            <div className="col-md-12 text-center">
              <img src={logozelt} alt="" />
            </div>
          </div>
          <div>
            <div>
              <h2 class="login-header" style={{ marginTop: 20 }}>Log in </h2>
              <p>
                <input
                  type="phone"
                  placeholder="Phone Number"
                  name='phone'
                  autoComplete="off"
                  value={loginForm.phone}
                  onChange={handleChangePhone}
                />
                <span className="text-danger" >{loginFormErrors.phone}</span>
              </p>
              <p>
                <input
                  type="password"
                  placeholder="Password"
                  name='password'
                  autoComplete="off"
                  value={loginForm.password}
                  onChange={handleChange}
                />
                <span className="text-danger" >{loginFormErrors.password}</span>
              </p>
              <p className='d-flex justify-content-center align-content-center'>
                <Link to='/forgotpassword' >Forgot Password ?</Link>
              </p>
              <p

                onClick={handleSubmit}
              // class="login-header"
              >
                {/* <Link to="/dashboard"> */}
                {
                  loader == true ? '' :
                    <input
                      style={{ borderRadius: 50 }}
                      type="submit"
                      value="Log in"
                    // class="login-header"
                    />
                }
                {/* </Link> */}
                {
                  loader == true && <div style={{ marginLeft: '170px' }} >
                    <Spinner animation="border" variant="Primary" />
                  </div>
                }
              </p>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Login