import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import SideBar from '../../dashboard/SideBar'
import FirstNavbar from '../../dashboard/FirstNavbar'
import { Card, Row, Col, Button, Form } from 'react-bootstrap'
import axios from 'axios';
import AuthServices from '../../authServices/AuthServices';
import { toast, ToastContainer, Zoom } from "react-toastify";

function ChooseScheme() {
    const { state } = useLocation();
    console.log('ssssssssssscheme', state?.scheme);
    const selectedScheme = state?.scheme;
    const navigate = useNavigate();
    const [duration, setDuration] = useState('general');
    const [activated, setActivated] = useState(true)
    const [popular, setPopular] = useState(true)
    const [checkedDuration, setCheckedDuration] = useState(selectedScheme?.duration?.customerTime)
    const [redeemType, setRedeemType] = useState()
    const [type, setType] = useState()
    const [schemeForm, setSchemeForm] = useState({
        name: selectedScheme?.name || '',
        minAmt: selectedScheme?.minAmt || '',
        shops: [],
        type: 'amount',
        inputDuration: selectedScheme?.duration?.customerTime || '',
        discount: selectedScheme?.discount || '',
        redeemType: 'store',
        description: selectedScheme?.description || '',
        terms: 'Members can purchase Gold, Diamond or Silver jewellery [Except Bullion, Gold/ Silver coins]Within 12 months duration of the plan without any default payment delay In the monthly payment.\n\nNo discounts will be allowed on pre closure of plan by the members and they will be allowed to purchase gold jewellery only for amount they have paid.  \n\nNo cash refunds will be done under any circumstances. \n\nFirst installment should be paid now to avail the plan. \n\nIn case of default of payment by the customer he / she will not be entitled for discount. \n\nWe issued the right to alter the amount add or Delete part or whole of the privilege of the plan without prior notice of the customer. \n\nAny conditions which are especially not covered along would be at the sole discretion of the company at the time of.The decision of the company in this regards would be deemed as Irreversible is final. \n\nIn case of any changes in initiating laws, rules, acts, etc by only regulatory authority, necessary requirements for the same have to be complied by the customers. \n\nCustomers have to make sure that the advance are adjusted within 12 months from the date of enrollment ie: they have to purchase within 12 months of the date of enrollment.',
    })
    const [schemeFormErrors, setSchemeFormErrors] = useState({
        name: "",
        minAmt: '',
        activated: true,
        shops: '',
        popular: true,
        type: '',
        duration: '',
        inputDuration: '',
        discount: '',
        redeemType: '',
        description: '',
        terms: '',
    })

    const handleType = (value) => {
        console.log('redeemType ee', value);
        setType(value)
    }

    const handleDuration = (value) => {
        console.log('setCheckedDuration ee', value);
        setCheckedDuration(value)
    }

    const handleRedeemType = (value) => {
        console.log('setRedeemType ee', value);
        setRedeemType(value)
    }

    const handleStoreChange = (e) => {
        setSchemeForm({ ...schemeForm, shops: e.target.value })
    }

    const handleChange = (e) => {
        setSchemeForm({
            ...schemeForm,
            [e?.target?.name]: e?.target?.value,
            [e.target.minAmt]: e?.target?.value,
            [e.target.shops]: e.target.value,
            [e.target.discount]: e.target.value,
            [e.target.inputDuration]: e.target.value,
            [e.target.description]: e.target.value,
            [e.target.terms]: e.target.value,
        });

        setSchemeFormErrors({
            ...schemeFormErrors,
            [e.target.name]: null,
            [e.target.minAmt]: null,
            [e.target.shops]: null,
            [e.target.discount]: null,
            [e.target.inputDuration]: null,
            [e.target.terms]: null,
        });
    };

    const handleValidation = () => {
        const { description, name, discount, minAmt, terms, shops, inputDuration, } = schemeForm
        const newErrors = {}
        if (!type) {
            newErrors.type = 'please select type'
        }
        if (!redeemType) {
            newErrors.redeemType = 'please select Redeem Type'
        }
        if (!name) {
            newErrors.name = 'please enter name'
        }
        if (!minAmt) {
            newErrors.minAmt = 'please enter minimum Amount'
        }
        if (!discount) {
            newErrors.discount = 'please enter Discount'
        }
        if (activated === false) {
            newErrors.activated = 'please select activated'
        }
        if (popular === false) {
            newErrors.popular = 'please select popular'
        }
        if (duration === 'general') {
            if (!checkedDuration) {
                newErrors.duration = 'please select duration'
            }
        } else {
            if (!inputDuration) {
                newErrors.inputDuration = 'please enter duration'
            }
        }
        if (shops?.length === 0) {
            newErrors.shops = 'please select store'
        }
        if (!description) {
            newErrors.description = 'please enter description'
        }
        if (!terms) {
            newErrors.terms = 'please enter terms and conditions'
        }
        return newErrors
    }

    const createNewScheme = async () => {
        try {
            const handleValidationObject = handleValidation()
            if (Object.keys(handleValidationObject).length > 0) {
                setSchemeFormErrors(handleValidationObject)
            } else {
                const formData = new FormData();
                formData.append('name', schemeForm?.name);
                formData.append('minAmt', schemeForm?.minAmt);
                formData.append('activated', activated);
                formData.append('description', schemeForm?.description);
                formData.append('shops', [schemeForm?.shops]);
                formData.append('popular', popular);
                formData.append('type', type);
                formData.append('duration', { "customerTime": checkedDuration, "vendorTime": 1 });
                formData.append('discount', schemeForm?.discount);
                formData.append('redeemType', redeemType);
                formData.append('termsAndConditions', schemeForm?.terms);
              
                const schemeCreation = await AuthServices.postDataProduct('/scheme/create', formData)
                console.log('ssssssssssschemeCreation', schemeCreation);
                if (schemeCreation?.error === false) {
                    toast.success('Scheme created successFully')
                    setSchemeForm({
                        ...schemeForm,
                        name: "",
                        minAmt: '',
                        shops: [],
                        type: 'amount',
                        inputDuration: '',
                        discount: '',
                        redeemType: 'store',
                        description: '',
                        terms: 'Members can purchase Gold, Diamond or Silver jewellery [Except Bullion, Gold/ Silver coins]Within 12 months duration of the plan without any default payment delay In the monthly payment.\n\nNo discounts will be allowed on pre closure of plan by the members and they will be allowed to purchase gold jewellery only for amount they have paid.  \n\nNo cash refunds will be done under any circumstances. \n\nFirst installment should be paid now to avail the plan. \n\nIn case of default of payment by the customer he / she will not be entitled for discount. \n\nWe issued the right to alter the amount add or Delete part or whole of the privilege of the plan without prior notice of the customer. \n\nAny conditions which are especially not covered along would be at the sole discretion of the company at the time of.The decision of the company in this regards would be deemed as Irreversible is final. \n\nIn case of any changes in initiating laws, rules, acts, etc by only regulatory authority, necessary requirements for the same have to be complied by the customers. \n\nCustomers have to make sure that the advance are adjusted within 12 months from the date of enrollment ie: they have to purchase within 12 months of the date of enrollment.',
                    })
                    setActivated(true)
                    setDuration('general')
                    setPopular(true)
                    setCheckedDuration()
                    navigate('/vendorScheme')
                }
            }
        } catch (e) {
            console.log('error ===>', e);
            toast.error('Scheme is not created')
            setSchemeForm({
                ...schemeForm,
                name: "",
                minAmt: '',
                shops: [],
                type: 'amount',
                inputDuration: '',
                discount: '',
                redeemType: 'store',
                description: '',
                terms: 'Members can purchase Gold, Diamond or Silver jewellery [Except Bullion, Gold/ Silver coins]Within 12 months duration of the plan without any default payment delay In the monthly payment.\n\nNo discounts will be allowed on pre closure of plan by the members and they will be allowed to purchase gold jewellery only for amount they have paid.  \n\nNo cash refunds will be done under any circumstances. \n\nFirst installment should be paid now to avail the plan. \n\nIn case of default of payment by the customer he / she will not be entitled for discount. \n\nWe issued the right to alter the amount add or Delete part or whole of the privilege of the plan without prior notice of the customer. \n\nAny conditions which are especially not covered along would be at the sole discretion of the company at the time of.The decision of the company in this regards would be deemed as Irreversible is final. \n\nIn case of any changes in initiating laws, rules, acts, etc by only regulatory authority, necessary requirements for the same have to be complied by the customers. \n\nCustomers have to make sure that the advance are adjusted within 12 months from the date of enrollment ie: they have to purchase within 12 months of the date of enrollment.',
            })
            setActivated(true)
            setDuration('general')
            setPopular(true)
            setCheckedDuration()
            navigate('/vendorScheme')
        }
    }

    const editScheme = async () => {
        try {
            const handleValidationObject = handleValidation()
            if (Object.keys(handleValidationObject).length > 0) {
                setSchemeFormErrors(handleValidationObject)
            } else {
                const formData = new FormData();
                formData.append('name', schemeForm?.name);
                formData.append('minAmt', schemeForm?.minAmt);
                formData.append('activated', activated);
                formData.append('description', schemeForm?.description);
                formData.append('shops', [schemeForm?.shops]);
                formData.append('popular', popular);
                formData.append('type', type);
                formData.append('duration', { "customerTime": checkedDuration, "vendorTime": 1 });
                formData.append('discount', schemeForm?.discount);
                formData.append('redeemType', redeemType);
                formData.append('termsAndConditions', schemeForm?.terms);
                const schemeCreation = await AuthServices.patchDataProduct(`/scheme/${selectedScheme?._id}`, formData)
                console.log('ssssssssssschemeCreation', schemeCreation);
                if (schemeCreation?.error === false) {
                    toast.success('Scheme created successFully')
                    setSchemeForm({
                        ...schemeForm,
                        name: "",
                        minAmt: '',
                        shops: [],
                        type: 'amount',
                        inputDuration: '',
                        discount: '',
                        redeemType: 'store',
                        description: '',
                        terms: 'Members can purchase Gold, Diamond or Silver jewellery [Except Bullion, Gold/ Silver coins]Within 12 months duration of the plan without any default payment delay In the monthly payment.\n\nNo discounts will be allowed on pre closure of plan by the members and they will be allowed to purchase gold jewellery only for amount they have paid.  \n\nNo cash refunds will be done under any circumstances. \n\nFirst installment should be paid now to avail the plan. \n\nIn case of default of payment by the customer he / she will not be entitled for discount. \n\nWe issued the right to alter the amount add or Delete part or whole of the privilege of the plan without prior notice of the customer. \n\nAny conditions which are especially not covered along would be at the sole discretion of the company at the time of.The decision of the company in this regards would be deemed as Irreversible is final. \n\nIn case of any changes in initiating laws, rules, acts, etc by only regulatory authority, necessary requirements for the same have to be complied by the customers. \n\nCustomers have to make sure that the advance are adjusted within 12 months from the date of enrollment ie: they have to purchase within 12 months of the date of enrollment.',
                    })
                    setActivated(true)
                    setDuration('general')
                    setPopular(true)
                    setCheckedDuration()
                    navigate('/vendorScheme')
                }
            }
        } catch (e) {
            console.log('error ===>', e);
            toast.error('Scheme is not created')
            setSchemeForm({
                ...schemeForm,
                name: "",
                minAmt: '',
                shops: [],
                type: 'amount',
                inputDuration: '',
                discount: '',
                redeemType: 'store',
                description: '',
                terms: 'Members can purchase Gold, Diamond or Silver jewellery [Except Bullion, Gold/ Silver coins]Within 12 months duration of the plan without any default payment delay In the monthly payment.\n\nNo discounts will be allowed on pre closure of plan by the members and they will be allowed to purchase gold jewellery only for amount they have paid.  \n\nNo cash refunds will be done under any circumstances. \n\nFirst installment should be paid now to avail the plan. \n\nIn case of default of payment by the customer he / she will not be entitled for discount. \n\nWe issued the right to alter the amount add or Delete part or whole of the privilege of the plan without prior notice of the customer. \n\nAny conditions which are especially not covered along would be at the sole discretion of the company at the time of.The decision of the company in this regards would be deemed as Irreversible is final. \n\nIn case of any changes in initiating laws, rules, acts, etc by only regulatory authority, necessary requirements for the same have to be complied by the customers. \n\nCustomers have to make sure that the advance are adjusted within 12 months from the date of enrollment ie: they have to purchase within 12 months of the date of enrollment.',
            })
            setActivated(true)
            setDuration('general')
            setPopular(true)
            setCheckedDuration()
            navigate('/vendorScheme')
        }
    }

    return (
        <div>
            <div className="sidebar">
                <SideBar />
            </div>
            <div className="content">
                <div className="container">
                    <ToastContainer
                        position="top-center"
                        autoClose={2000}
                        hideProgressBar
                        transition={Zoom}
                        delay={1000}
                        limit={1}
                    />
                    <FirstNavbar />
                    <h3 className='headertext text-center'>Choose Scheme Template</h3>
                    <Card className='p-2 d-grid gap-3'>
                        <Card className='p-2'>
                            <Row>
                                <Col md={6}>
                                    <p className='headertext1'>Scheme 1</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <p className='headertext'>6+1, the Vendor will pay 25% discount of the installment in last month</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Button variant="outline-warning" onClick={() => navigate('/CreateScheme', {state:{customerTime:6, discount:'25'}})} >Add to Store</Button>
                                </Col>
                            </Row>
                        </Card>
                        <Card className='p-2'>
                            <Row>
                                <Col md={6}>
                                    <p className='headertext1'>Scheme 2</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <p className='headertext'>11+1, the Vendor will pay 50% discount of the installment in last month</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Button variant="outline-warning" onClick={() => navigate('/CreateScheme', {state:{customerTime:11, discount:'50'}})} >Add to Store</Button>
                                </Col>
                            </Row>
                        </Card>
                        <Card className='p-2'>
                            <Row>
                                <Col md={6}>
                                    <p className='headertext1'>Scheme 3</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <p className='headertext'>24+1, the Vendor will pay 75% discount of the installment in last month</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Button variant="outline-warning" onClick={() => navigate('/CreateScheme', {state:{customerTime:24, discount:'75'}})} >Add to Store</Button>
                                </Col>
                            </Row>
                        </Card>
                        <Card className='p-2'>
                            <Row>
                                <Col md={6}>
                                    <p className='headertext1'>Scheme 4</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <p className='headertext'>36+1, the Vendor will pay 100% discount of the installment in last month</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Button variant="outline-warning" onClick={() => navigate('/CreateScheme', {state:{customerTime:36, discount:'100'}})} >Add to Store</Button>
                                </Col>
                            </Row>
                        </Card>
                       
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default ChooseScheme