import React from 'react'
import { useState } from "react";

import { ToastContainer, toast, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Spinner } from "react-bootstrap";
import logozelt from './../../assets/imagesCustomer/logozelt.png'
import axios from 'axios';

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
      newErrors.phone = 'please enter user name'
    }
    else if (!phone) {
      newErrors.phone = 'user name should be text'
    }
    else if (phone && phone.length > 50) {
      newErrors.phone = 'username should be below 50 digits'
    }

    if (!password) {
      newErrors.password = 'please enter password'
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
      let userCredentials={'phone':loginForm.phone,'password':loginForm.password,'type':"vendor"}  
      const requestOptions = {
        // method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userCredentials)
      };   
      axios.post('http://moshimoshi.cloud:3004/user/login', userCredentials, {"headers" : requestOptions})
    .then((response) => {
      console.log('response', response);
      if(response?.status === 200){
        localStorage.setItem('accessToken', response.headers.get('x-access-token'));
              localStorage.setItem('refreshToken',response.headers.get('x-refresh-token'))
              localStorage.setItem('userDetails',JSON.stringify(response?.data))
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
      }else{
        toast.error('user credentials are invalid')
              setTimeout(() => {
                setLoader(false)
              }, [1000])
      }
    })
    .catch((error) => {
      console.log('error ==>', error);
      setLoginForm({
              ...loginForm,
              phone: '',
              password: ''
            })
    })   
      // fetch('http://moshimoshi.cloud:3004/user/login', requestOptions)
      //   .then(response => {    
      //     if (response.status == 400) {
      //       toast.error('user credentials are invalid')
      //       setTimeout(() => {
      //         setLoader(false)
      //       }, [1000])
      //     } else {
      //       console.log('response', response);
      //       console.log('response', response?.data);
      //       console.log('responsejson', JSON.stringify(response));
      //       console.log('responsejson',response.headers.get('data'));
      //       localStorage.setItem('accessToken', response.headers.get('x-access-token'));
      //       localStorage.setItem('refreshToken',response.headers.get('x-refresh-token'))
      //       // localStorage.setItem('userDetails',JSON.stringify(response?.data))
      //       toast.success('Login Successfully')
      //       setLoader(false)
      //       setLoginForm({
      //         ...loginForm,
      //         phone: '',
      //         password: ''
      //       })
      //       setTimeout(() => {
      //         navigate('/dashboard');
      //       }, 1000);
      //     }
      //   }
      //   ).catch((err) => {
      //     setLoginForm({
      //       ...loginForm,
      //       phone: '',
      //       password: ''
      //     })
      //   })
    }
  }

  // const postData = async (Endpoint, data) => {
  //   return axios
  //     .post(baseURL.baseURL3004 + Endpoint, data)
  //     .then((response) => {
  //       return response;
  //     })
  //     .catch((err) => {
  //       return err.response.data;
  //     });
  // }
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

          <h2 class="login-header">Log in </h2>
          <p>
            <input
              type="phone"
              placeholder="Phone Number"
              name='phone'
              autoComplete="off"
              value={loginForm.phone}
              onChange={handleChange}
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
          <p
            onClick={handleSubmit}
            // class="login-header"
          >
            {/* <Link to="/dashboard"> */}
            {
              loader == true ? '' :
                <input
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
  );
};

export default Login