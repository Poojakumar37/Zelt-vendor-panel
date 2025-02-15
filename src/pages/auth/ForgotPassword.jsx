import React from 'react'
import { useState } from "react";

import { ToastContainer, toast, Zoom } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Spinner } from "react-bootstrap";
import logozelt from './../../assets/imagesCustomer/logozelt.png'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiFillEye } from "react-icons/ai";
import { BsFillEyeSlashFill } from "react-icons/bs";

function ForgotPassword() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [page, setPage] = useState(1)

    const [loader, setLoader] = useState(false)

    const [loginForm, setLoginForm] = useState({
        phone: '',

    })

    const [loginFormErrors, setLoginFormErrors] = useState({
        phone: '',
    })

    const [otpData, setOtpData] = useState({
        otp: '',
    })

    const [otpDataError, setOtpDataError] = useState({
        otp: '',
    })

    const [password, setPassword] = useState({
        password: '',
        confirmPassword: '',
    })

    const [passwordError, setPasswordError] = useState({
        password: '',
        confirmPassword: '',
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

    const handleOTPChange = (e) => {
        const { name, value } = e.target;
        const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters

        // Check if the numericValue is 4  digits or less
        if (numericValue.length <= 4) {
            setOtpData((prevData) => ({
                ...prevData,
                [name]: numericValue,
            }));
        }
    };

    // const handlePasswordChange = (e) => {
    //     const { name, value } = e.target;

    //     setPassword((prevData) => ({
    //         ...prevData,
    //         [name]: value,
    //     }));
    // };

    const handlePasswordChange = (event) => {
        setPassword({
            ...password, [event.target.name]: event.target.value
        })
    }

    const handleValidation = () => {
        const newErrors = {}

        if (loginForm.phone == '' && loginForm.phone >= 10) {
            newErrors.phone = 'Please Enter Your Registered Number'
        }
        return newErrors
    }

    const handleOtpValidation = () => {
        const newErrors = {}

        if (otpData.otp == '' && otpData.otp >= 4) {
            newErrors.otp = 'Please Enter The Otp Sent of Your Registered Number'
        }
        return newErrors
    }

    const handlePasswordValidation = () => {
        const newErrors = {}
        console.log('nknanda');

        // if (password.password != password.confirmPassword) {
        //     newErrors.password = 'Please Enter Correct Password'
        // }
        if (password.password == '' && password.password == password.confirmPassword) {
            newErrors.password = 'Please Enter Correct Password'
        }
        if (password.confirmPassword == '') {
            newErrors.confirmPassword = 'Please ReEnter Correct Password'
        }
        return newErrors
    }

    // eugia$#@!345
    const handleSentOtp = async () => {
        const handleValidationObject = handleOtpValidation()
        if (Object.keys(handleValidationObject).length > 0) {
            setLoginFormErrors(handleValidationObject)
        } else {
            setLoader(true)
            const sentOTPApi = await axios.post(`http://localhost:3001/api/otp/sendOtp/${loginForm?.phone}`)
                .then((response) => {
                    console.log('response', response);
                    console.log("SHOP--->", response?.data?.data?.shops)
                    if (response?.status === 200) {
                        toast.success('OTP Sent Successfully')
                        setLoader(false)
                        setPage(2)
                    }
                    else {
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
                    setLoader(false)
                })
            // setPage(2)
        }
    }



    const handleVerifyOtp = async () => {
        const handleValidationObject = handleOtpValidation()
        if (Object.keys(handleValidationObject).length > 0) {
            setOtpDataError(handleValidationObject)
        } else {
            setLoader(true)
            try {
                const response = await axios.post(`http://192.168.21.53:3001/api/otp/verifyOtp`, {
                    otp: otpData.otp,
                    phone: loginForm.phone
                });

                if (response?.status === 200) {
                    toast.success('Verified Successfully')
                    setLoader(false)
                    setPage(3)
                } else {
                    toast.error('user credentials are invalid')
                    setTimeout(() => {
                        setLoader(false)
                    }, [1000])
                }
            }
            catch (error) {

                console.log('error ==>', error);
                toast.error('Something Went Wrong')
                setLoader(false)
            }

        }
    }


    const handleSubmit = async () => {
        const handleValidationObject = handlePasswordValidation()
        if (Object.keys(handleValidationObject).length > 0) {
            setPasswordError(handleValidationObject)
        } else {
            setLoader(true)
            try {
                const response = await axios.patch(`http://192.168.21.53:3001/api/vendor/ChangeVendorpassword`, {
                    phone: loginForm.phone, password: password.confirmPassword
                });
                if (response?.status === 200) {

                    toast.success('Password Reset Done Successfully')
                    setLoader(false)

                    setTimeout(() => {
                        navigate('/');
                    }, 1000);

                } else {
                    toast.error('user credentials are invalid')
                    setTimeout(() => {
                        setLoader(false)
                    }, [1000])
                }
            } catch (error) {
                toast.warning(`${error.response.data.message}`, error);

                setLoader(false)
            }
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
                    {page === 1 && <div>
                        <div>
                            <h2 class="login-header" style={{ marginTop: 20 }}>Reset Password </h2>
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
                            <Link to='/'>Login ?</Link>
                            <p

                                onClick={handleSentOtp}
                            // class="login-header"
                            >
                                {/* <Link to="/dashboard"> */}
                                {
                                    loader == true ? '' :
                                        <input
                                            style={{ borderRadius: 50 }}
                                            type="submit"
                                            value="Send OTP"
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
                    </div>}
                    {page === 2 &&
                        <div>
                            <div>
                                <h2 class="login-header" style={{ marginTop: 20 }}>Enter Sent OTP </h2>
                                <p>
                                    <input
                                        type="phone"
                                        placeholder="Enter OTP"
                                        name='otp'
                                        autoComplete="off"
                                        value={otpData.otp}
                                        onChange={handleOTPChange}
                                    />
                                    <span className="text-danger" >{otpDataError.otp}</span>
                                </p>
                                <Link to='/'>Login ?</Link>
                                <p

                                    onClick={handleVerifyOtp}
                                // class="login-header"
                                >
                                    {/* <Link to="/dashboard"> */}
                                    {
                                        loader == true ? '' :
                                            <input
                                                style={{ borderRadius: 50 }}
                                                type="submit"
                                                value="Verify OTP"
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
                        </div>}
                    {page === 3 && <div>
                        <div>
                            <h2 class="login-header" style={{ marginTop: 20 }}>Enter New Password </h2>
                            <p>
                                {/* <div className="relative"> */}
                                <input
                                    // type={showPassword ? "text" : "password"}
                                    type="password"
                                    placeholder="Enter New Password"
                                    name='password'
                                    autoComplete="off"
                                    value={password.password}
                                    onChange={handlePasswordChange}
                                // className="border px-3 py-2 w-full rounded"
                                />
                                {/* <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-2 text-gray-600"
                                    >
                                        {showPassword ? <BsFillEyeSlashFill size={20} /> : <AiFillEye size={20} />}
                                    </button>

                                </div> */}
                                <span className="text-danger" >{passwordError.password}</span>
                            </p>
                            <p>
                                <input
                                    type="password"
                                    placeholder="Re-enter New Password"
                                    name='confirmPassword'
                                    autoComplete="off"
                                    value={password.confirmPassword}
                                    onChange={handlePasswordChange}
                                />
                                <span className="text-danger" >{passwordError.confirmPassword}</span>
                            </p>
                            <p className='d-flex justify-content-center align-content-center'>
                                <Link to='/'>Login ?</Link>
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
                                            value="Submit"
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
                    </div>}


                </div>
            </div>
        </div>
    )
}

export default ForgotPassword