import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SideBar from "../../dashboard/SideBar";
import FirstNavbar from "../../dashboard/FirstNavbar";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import axios from "axios";
import AuthServices from "../../authServices/AuthServices";
import { toast, ToastContainer, Zoom } from "react-toastify";
import './createcss.css'
import { BaseURL } from "../../../URL";

function CreateScheme() {
  const { state } = useLocation();
  // const location = useLocation();
  // const data = location?.state?.scheme;

  // console.log("ssssssssssscheme", state?.scheme);
  // console.log("ssssssssssscheme", state?.customerTime, state?.discount);
  const selectedScheme = state;
  const navigate = useNavigate();
  const [vendorDetails] = useState(
    JSON.parse(localStorage.getItem("vendorDetails"))
  );
  const [duration, setDuration] = useState("general");
  const [activated, setActivated] = useState(true);
  const [popular, setPopular] = useState(true);
  const [StoreList, setStoreList] = useState([])
  const [Amount, setAmount] = useState()
  const [AmountArry, setAmountArry] = useState([])


  const addAmount = () => {
    if (!Amount) {
      alert("Please enter amount");
    } else {
      // Create a new object with the key "Amount" and the value from the state
      const newAmountObj = { Amount: Number(Amount) }; // Convert Amount to a number
      // Update the AmountArry state by adding the new object
      setAmountArry([...AmountArry, newAmountObj]);
      // Reset the Amount state to clear the input field
      setAmount("");
    }
  };


  const [checkedDuration, setCheckedDuration] = useState(
    selectedScheme?.duration?.customerTime || state?.customerTime
  );
  const [redeemType, setRedeemType] = useState("");
  const [type, setType] = useState();
  const [schemeForm, setSchemeForm] = useState({
    name: selectedScheme?.name || "",
    Subtitle: selectedScheme?.Subtitle || "",
    shops: [],
    type: "amount",
    inputDuration: selectedScheme?.duration?.customerTime || "",
    discountPercentage: selectedScheme?.discountPercentage || state?.discountPercentage || "",
    discountType: selectedScheme?.discount || state?.discount || "",
    description: selectedScheme?.description || "",
    terms:
      "Members can purchase Gold, Diamond or Silver jewellery [Except Bullion, Gold/ Silver coins]Within 12 months duration of the plan without any default payment delay In the monthly payment.\n\nNo discounts will be allowed on pre closure of plan by the members and they will be allowed to purchase gold jewellery only for amount they have paid.  \n\nNo cash refunds will be done under any circumstances. \n\nFirst installment should be paid now to avail the plan. \n\nIn case of default of payment by the customer he / she will not be entitled for discount. \n\nWe issued the right to alter the amount add or Delete part or whole of the privilege of the plan without prior notice of the customer. \n\nAny conditions which are especially not covered along would be at the sole discretion of the company at the time of.The decision of the company in this regards would be deemed as Irreversible is final. \n\nIn case of any changes in initiating laws, rules, acts, etc by only regulatory authority, necessary requirements for the same have to be complied by the customers. \n\nCustomers have to make sure that the advance are adjusted within 12 months from the date of enrollment ie: they have to purchase within 12 months of the date of enrollment.",
  });
  const [schemeFormErrors, setSchemeFormErrors] = useState({
    name: "",
    Subtitle: "",
    activated: true,
    shops: "",
    popular: true,
    type: "",
    duration: "",
    inputDuration: "",
    discount: "",
    redeemType: "",
    description: "",
    terms: "",
  });


  const getStoreList = async () => {
    try {
      const response = await axios.get(
        `${BaseURL}/Stores/getAllStores`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("accessToken"),
          },
        }
      );
      if (response.status === 200) {
        setStoreList(response?.data?.Stores?.filter((item) => item?.deleted === false && item?.
          VendorID?._id == vendorDetails?._id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStoreList()
  }, [])

  const handleType = (value) => {
    console.log("redeemType ee", value);
    setType(value);
  };

  const handleDuration = (value) => {
    console.log("setCheckedDuration ee", value);
    setCheckedDuration(value);
  };

  const handleRedeemType = (value) => {
    console.log("setRedeemType ee", value);
    setRedeemType(value);
  };

  const handleStoreChange = (e) => {
    console.log("eeeeeee shop", e.target.value);
    setSchemeForm({ ...schemeForm, shops: e.target.value });
  };
  const handleNameChange = (e) => {
    const { value } = e.target;
    console.log("Selected shop:", value);

    let discount = "";
    if (value === "KUBERA") {
      discount = "Discount on Benefits";
    } else if (value === "SUVARNA") {
      discount = "Discount on Making Charges";
    } else if (value === "SAMRUDDHI") {
      discount = "Discount on Making Charges";
    } else if (value === "VINAYAKA's GOLD JAR") {
      discount = "No Discounts";
    }

    // Update both name and discount in a single state update
    setSchemeForm({
      ...schemeForm,
      name: value,
      discount: discount,
    });

    // Clear errors for name and discount
    setSchemeFormErrors({
      ...schemeFormErrors,
      name: null,
      discount: null,
    });
  };

  const handlediscountChange = (e) => {
    console.log("eeeeeee shop", e.target.value);
    setSchemeForm({ ...schemeForm, discount: e.target.value });
  };

  const handleChange = (e) => {
    //   setSchemeForm({
    //     ...schemeForm,
    //     [e?.target?.inputDuration]: e?.target?.value,
    //     [e.target.description]: e.target.value,
    //     [e.target.terms]: e.target.value,
    //   });

    const { name, value } = e.target;
    console.log(`Updating ${name}:`, value);  // This will show the input as you type

    setSchemeForm((prevForm) => ({
      ...prevForm,
      [name]: value,  // Update the field dynamically
    }));


    setSchemeFormErrors({
      ...schemeFormErrors,
      // [e.target.name]: null,
      [e.target.shops]: null,
      // [e.target.discount]: null,
      [e.target.inputDuration]: null,
      [e.target.terms]: null,
    });
  };

  console.log("redeemType", redeemType);
  const handleValidation = () => {
    const { description, name, discount, terms, shops, inputDuration } =
      schemeForm;


    const newErrors = {};

    if (!redeemType) {
      newErrors.redeemType = "please select Redeem Type";
    }
    if (!name) {
      newErrors.name = "please select scheme name";
    }
    if (AmountArry.length === 0) {
      newErrors.AmountArry = "please enter Amount";
    }
    if (!discount) {
      newErrors.discount = "please enter Discount type";
    }
    if (activated === false) {
      newErrors.activated = "please select activated";
    }
    if (popular === false) {
      newErrors.popular = "please select popular";
    }
    if (duration === "general") {
      if (!checkedDuration) {
        newErrors.duration = "please select duration";
      }
    } else {
      if (!inputDuration) {
        newErrors.inputDuration = "please enter duration";
      }
    }
    if (shops?.length === 0) {
      newErrors.shops = "please select store";
    }
    if (!description) {
      newErrors.description = "please enter description";
    }
    if (!terms) {
      newErrors.terms = "please enter terms and conditions";
    }
    return newErrors;
  };

  const createNewScheme = async () => {
    try {
      // const handleValidationObject = handleValidation();
      // console.log("handleValidationObject", handleValidationObject);
      // if (Object.keys(handleValidationObject)?.length > 0) {
      //   setSchemeFormErrors(handleValidationObject);
      //   return;
      // }
      const formData = new FormData();
      formData.append("VendorID", vendorDetails?._id);
      formData.append("StoreID", schemeForm?.shops);
      formData.append("Schemename", schemeForm?.name);
      formData.append("Subtitle", schemeForm?.Subtitle);
      formData.append("Amount", JSON.stringify(AmountArry)); // Fixed
      formData.append(
        "duration",
        JSON.stringify({ customerTime: checkedDuration, vendorTime: 1 })
      );
      formData.append("Activated", activated);
      formData.append("Popular", popular); // Fixed (popular was duplicated)
      formData.append("DiscountType", schemeForm?.discount);
      formData.append("DiscountPercentage", schemeForm?.discountPercentage ? schemeForm?.discountPercentage : 0);
      formData.append("RedeemAt", redeemType);
      formData.append("Description", schemeForm?.description);
      formData.append("TermsConditions", schemeForm?.terms);

      // Debugging: Check if FormData has values
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      const schemeCreation = await axios.post(
        `${BaseURL}/Scheme/createScheme`,
        // {
        //   data: {
        //     VendorID: schemeForm?.name,
        //     StoreID: schemeForm?.shops,
        //     Schemename: schemeForm?.name,
        //     Amount: JSON.stringify(AmountArry),
        //     duration: JSON.stringify({ customerTime: checkedDuration, vendorTime: 1 }),
        //     Activated: activated,
        //     Popular: popular,
        //     DiscountType: schemeForm?.discount,
        //     DiscountPercentage: schemeForm?.discountPercentage ? schemeForm?.discountPercentage : 0,
        //     RedeemAt: redeemType,
        //     Description: schemeForm?.description,
        //     TermsConditions: schemeForm?.terms
        //   }
        // },
        formData,
        {
          headers: {
            "x-access-token": localStorage.getItem("accessToken"),
          },
        }
      );

      if (schemeCreation?.status === 200) {
        toast.success("Scheme created successfully");
        navigate("/vendorScheme");
      }
    } catch (error) {
      console.error("Error creating scheme:", error);
      toast.error("Scheme creation failed");
    }
  };

  const editScheme = async () => {
    try {
      const handleValidationObject = handleValidation();
      if (Object.keys(handleValidationObject).length > 0) {
        setSchemeFormErrors(handleValidationObject);
      } else {
        const formData = new FormData();
        formData.append("name", schemeForm?.name);
        formData.append("AmountArry", schemeForm?.AmountArry);
        formData.append("activated", activated);
        formData.append("description", schemeForm?.description);
        formData.append("shops", JSON.stringify(schemeForm?.shops));
        formData.append("popular", popular);
        formData.append("type", type);
        formData.append(
          "duration",
          JSON.stringify({
            customerTime: checkedDuration,
            vendorTime: 1,
          })
        );
        formData.append("discount", schemeForm?.discount);
        formData.append("redeemType", redeemType);
        formData.append("termsAndConditions", schemeForm?.terms);
        console.log("formdata", formData);
        const schemeCreation = await AuthServices.patchDataProduct(
          `/scheme/${selectedScheme?._id}`,
          formData
        );
        console.log("ssssssssssschemeCreation", schemeCreation);
        if (schemeCreation?.error === false) {
          toast.success("Scheme created successFully");
          setSchemeForm({
            ...schemeForm,
            name: "",
            AmountArry: [],
            shops: [],
            type: "amount",
            inputDuration: "",
            discount: "",
            redeemType: "store",
            description: "",
            terms:
              "Members can purchase Gold, Diamond or Silver jewellery [Except Bullion, Gold/ Silver coins]Within 12 months duration of the plan without any default payment delay In the monthly payment.\n\nNo discounts will be allowed on pre closure of plan by the members and they will be allowed to purchase gold jewellery only for amount they have paid.  \n\nNo cash refunds will be done under any circumstances. \n\nFirst installment should be paid now to avail the plan. \n\nIn case of default of payment by the customer he / she will not be entitled for discount. \n\nWe issued the right to alter the amount add or Delete part or whole of the privilege of the plan without prior notice of the customer. \n\nAny conditions which are especially not covered along would be at the sole discretion of the company at the time of.The decision of the company in this regards would be deemed as Irreversible is final. \n\nIn case of any changes in initiating laws, rules, acts, etc by only regulatory authority, necessary requirements for the same have to be complied by the customers. \n\nCustomers have to make sure that the advance are adjusted within 12 months from the date of enrollment ie: they have to purchase within 12 months of the date of enrollment.",
          });
          setActivated(true);
          setDuration("general");
          setPopular(true);
          setCheckedDuration();
          navigate("/vendorScheme");
        }
      }
    } catch (e) {
      console.log("error ===>", e);
      toast.error("Scheme is not created");
      setSchemeForm({
        ...schemeForm,
        name: "",
        AmountArry: [],
        shops: [],
        type: "amount",
        inputDuration: "",
        discount: "",
        redeemType: "store",
        description: "",
        terms:
          "Members can purchase Gold, Diamond or Silver jewellery [Except Bullion, Gold/ Silver coins]Within 12 months duration of the plan without any default payment delay In the monthly payment.\n\nNo discounts will be allowed on pre closure of plan by the members and they will be allowed to purchase gold jewellery only for amount they have paid.  \n\nNo cash refunds will be done under any circumstances. \n\nFirst installment should be paid now to avail the plan. \n\nIn case of default of payment by the customer he / she will not be entitled for discount. \n\nWe issued the right to alter the amount add or Delete part or whole of the privilege of the plan without prior notice of the customer. \n\nAny conditions which are especially not covered along would be at the sole discretion of the company at the time of.The decision of the company in this regards would be deemed as Irreversible is final. \n\nIn case of any changes in initiating laws, rules, acts, etc by only regulatory authority, necessary requirements for the same have to be complied by the customers. \n\nCustomers have to make sure that the advance are adjusted within 12 months from the date of enrollment ie: they have to purchase within 12 months of the date of enrollment.",
      });
      setActivated(true);
      setDuration("general");
      setPopular(true);
      setCheckedDuration();
      navigate("/vendorScheme");
    }
  };

  console.log("StoreList", StoreList);

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
          <h3 className="headertext text-center">Add Scheme Details</h3>
          <Card className="p-2">
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Scheme Name</Form.Label>
                  {/* <Form.Control
                    maxLength={50}
                    type="text"
                    placeholder="Enter Scheme Name"
                    size="sm"
                    name="name"
                    onChange={handleChange}
                    autoComplete="off"
                    className="mb-3"
                    value={schemeForm?.name}
                  /> */}
                  <div className="leftedge d-flex justify-content-space">
                    <Form.Select
                      aria-label="Default select example"
                      size={"sm"}
                      className="selectsizesmall"
                      onChange={handleNameChange}
                    >
                      <option value="">Select </option>
                      <option value="KUBERA">KUBERA</option>
                      <option value="SUVARNA">SUVARNA</option>
                      <option value="SAMRUDDHI">SAMRUDDHI</option>
                      {/* <option value="VINAYAKA's GOLD JAR">VINAYAKA's GOLD JAR</option>*/}
                    </Form.Select>
                  </div>
                  <span className="text-danger">{schemeFormErrors?.name}</span>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Scheme Sub-title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Scheme Name"
                    size="sm"
                    name="Subtitle"
                    onChange={handleChange}
                    autoComplete="off"
                    className="mb-3"
                    value={schemeForm?.Subtitle}
                  />

                  <span className="text-danger">{schemeFormErrors?.Subtitle}</span>
                </Form.Group>
              </Col>
            </Row>
            <Row >
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Store</Form.Label>
                  <div className="leftedge d-flex justify-content-space">
                    <Form.Select
                      aria-label="Default select example"
                      size={"sm"}
                      className="selectsizesmall"
                      onChange={handleStoreChange}
                    >
                      <option>Select Store</option>
                      {StoreList?.map((shop) => (
                        <option name="shops" value={shop._id}>
                          {shop.name}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                  <span className="text-danger">{schemeFormErrors?.shops}</span>
                </Form.Group>
              </Col>
            </Row>
            {schemeForm?.name === "VINAYAKA's GOLD JAR" ? "" :
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Amount</Form.Label><br></br>
                    {AmountArry?.map((item) => <span>{item?.Amount}, </span>)}
                    <Form.Control
                      maxLength={50}
                      type="number"
                      placeholder="Enter Scheme Amount"
                      size="sm"
                      name="minAmt"
                      // onChange={handleChange}
                      onChange={(e) => setAmount(e.target.value)}
                      autoComplete="off"
                      className="mb-3 number-input"
                      // value={schemeForm?.minAmt}
                      value={Amount}
                    />
                    <span className="text-danger">
                      {schemeFormErrors?.AmountArry}
                    </span>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <button style={{ marginTop: AmountArry?.length > 0 ? "55px" : "30px", border: "none", padding: "4px 15px", color: "white", backgroundColor: "#0d6efd", borderRadius: "5px" }} onClick={addAmount}>Add</button>
                </Col>
              </Row>
            }
            <Row>
              <Col md={2}>
                <Form.Group className="mb-3">
                  <Form.Label></Form.Label>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Activated"
                    checked={activated}
                    onChange={(e) => setActivated(e?.target?.checked)}
                  />
                  <span className="text-danger">
                    {schemeFormErrors?.activated}
                  </span>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label></Form.Label>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Popular"
                    checked={popular}
                    onChange={(e) => setPopular(e?.target?.checked)}
                  />
                  <span className="text-danger">
                    {schemeFormErrors?.popular}
                  </span>
                </Form.Group>
              </Col>
            </Row>
            {/* <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Select Type </Form.Label>
                  <Form.Check
                    inline
                    label="Amount"
                    value="amount"
                    onChange={() => handleType("amount")}
                    name="type"
                    type="radio"
                  // checked = 'amount'
                  />
                  <Form.Check
                    inline
                    label="Weight"
                    value="weight"
                    onChange={() => handleType("weight")}
                    name="type"
                    type="radio"
                  // checked = 'weight'
                  />
                </Form.Group>
                <span className="text-danger">{schemeFormErrors?.type}</span>
              </Col>
            </Row> */}
            {schemeForm?.name === "VINAYAKA's GOLD JAR" ? "" : (<>
              <Row className="mt-4">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Select Plan Duration</Form.Label>
                    <Form.Check
                      // inline
                      label="General Duration"
                      name="duration"
                      type="radio"
                      onChange={() => setDuration("general")}
                      checked={duration === "general" ? true : false}
                    />
                    {duration === "general" ? (
                      <>
                        <Form.Check
                          // inline
                          label="( 6+1 )"
                          // value="6"
                          checked={checkedDuration === 6 && true}
                          onChange={() => handleDuration(6)}
                          name="duration"
                          type="radio"
                        />
                        <Form.Check
                          // inline
                          label="( 10+1 )"
                          // value="10"
                          checked={checkedDuration === 10 && true}
                          onChange={() => handleDuration(10)}
                          name="duration"
                          type="radio"
                        />
                        <Form.Check
                          // inline
                          label="( 11+1 )"
                          // value="11"
                          checked={checkedDuration === 11 && true}
                          onChange={() => handleDuration(11)}
                          name="duration"
                          type="radio"
                        />
                        <Form.Check
                          // inline
                          label="( 24+1 )"
                          // value="24"
                          checked={checkedDuration === 24 && true}
                          onChange={() => handleDuration(24)}
                          name="duration"
                          type="radio"
                        />
                        <Form.Check
                          // inline
                          label="( 36+1 )"
                          // value="36"
                          checked={checkedDuration === 36 && true}
                          onChange={() => handleDuration(36)}
                          name="duration"
                          type="radio"
                        />
                      </>
                    ) : ""}
                    <Form.Check
                      label="Custom Duration"
                      name="duration"
                      type="radio"
                      onChange={() => setDuration("custom")}
                      value={duration === "custom" ? true : false}
                    />
                    {duration === "custom" && (
                      <>
                        <Form.Control
                          maxLength={50}
                          type="text"
                          placeholder="Enter Duration"
                          size="sm"
                          name="duration"
                          onChange={handleChange}
                          autoComplete="off"
                          className="mb-3"
                          value={schemeForm?.inputDuration}
                        />
                      </>
                    )}
                    <span className="text-danger">
                      {schemeFormErrors?.inputDuration}
                    </span>
                    <span className="text-danger">
                      {schemeFormErrors?.duration}
                    </span>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col md={6} >
                  <Form.Group>
                    <Form.Label>Discount Type </Form.Label>
                    {/* <Form.Control
                    maxLength={50}
                    type="number"
                    placeholder="Enter Discount %"
                    size="sm"
                    name="discount"
                    onChange={handleChange}
                    autoComplete="off"
                    className="mb-3 number-input"
                    value={schemeForm?.discount}
                  /> */}
                    <Form.Control
                      maxLength={50}
                      type="text"
                      placeholder="Discount Type"
                      size="sm"
                      name="discountType"
                      // onChange={handleChange}
                      autoComplete="off"
                      className="mb-3 number-input"
                      value={schemeForm?.discount}
                    />

                    {/* <div className="leftedge d-flex justify-content-space">
                      <Form.Select
                        aria-label={schemeForm?.discount}
                        size={"sm"}
                        className="selectsizesmall"
                      // onChange={handlediscountChange}
                      >
                        <option value="">Select </option>
                        <option value="Discount on Benefits">Discount on Benefits</option>
                        <option value="Discount on Making Charges">Discount on Making Charges</option>
                        <option value="No Discounts">No Discounts</option>
                      </Form.Select>
                    </div> */}

                    <span className="text-danger">
                      {schemeFormErrors?.name}
                    </span>
                  </Form.Group>
                </Col>
              </Row>
            </>)}
            {schemeForm?.discount === "Discount on Making Charges" ?
              <Row className="mt-4">
                <Col md={6} >
                  <Form.Group>
                    <Form.Label>Your Discount(%) </Form.Label>
                    <Form.Control
                      maxLength={50}
                      type="number"
                      placeholder="Enter Discount %"
                      size="sm"
                      name="discountPercentage"
                      onChange={handleChange}
                      autoComplete="off"
                      className="mb-3 number-input"
                      value={schemeForm?.discountPercentage}
                    />
                    <span className="text-danger">
                      {schemeFormErrors?.discount}
                    </span>
                  </Form.Group>
                </Col>
              </Row> : ""}
            <Row className="mt-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Customer Can Redeem Scheme at</Form.Label>
                  <Form.Check
                    // inline
                    label="Any Store"
                    name="redeemType"
                    value="any"
                    type="radio"
                    onChange={() => handleRedeemType("any")}
                  />
                  <Form.Check
                    // inline
                    label="The store selected at the time of starting the scheme"
                    name="redeemType"
                    value="store"
                    type="radio"
                    onChange={() => handleRedeemType("store")}
                  />
                  <span className="text-danger">
                    {schemeFormErrors?.redeemType}
                  </span>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Description </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Description "
                    size="sm"
                    name="description"
                    onChange={handleChange}
                    autoComplete="off"
                    className="mb-3"
                    value={schemeForm?.description}
                  />
                  <span className="text-danger">
                    {schemeFormErrors?.description}
                  </span>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Terms & Conditions </Form.Label>
                  <Form.Control
                    // maxLength={50}
                    as="textarea"
                    type="text"
                    placeholder="Enter Terms & Conditions"
                    // size="sm"
                    name="terms"
                    onChange={handleChange}
                    // autoComplete="off"
                    rows={5}
                    value={schemeForm?.terms}
                  // className='mb-3'
                  />
                  <span className="text-danger">{schemeFormErrors?.terms}</span>
                </Form.Group>
              </Col>
            </Row>
            {schemeForm?.name === "VINAYAKA's GOLD JAR" ? "" :
              schemeForm?.name === "KUBERA" ? (<>
                <hr />
                <Row>
                  <h4>Example Calculation</h4>
                  <h6>
                    (If the installment amount is Rs. 2,500 in (11+1)plan)
                  </h6>
                  <Col md={6}>
                    {/* <div style={{flexDirection:'row', justifyContent:'center', alignItems:'center' }}> */}
                    <h6>Amount paid by the customer in 11 installments</h6>
                    {/* <h6>12,000 /-</h6> */}
                    {/* </div> */}
                    {/* <div style={{flexDirection:'row', justifyContent:'center', alignItems:'center' }}> */}
                    {/* <h6>Amount paid by the customer in 7th installment</h6> */}
                    <h6>Amount paid by you</h6>
                    {/* </div> */}
                  </Col>
                  <Col md={6}>
                    <h6>27,5000 /-</h6>
                    <h6>2,500 /-</h6>
                    {/* <h6>500 /-</h6> */}
                  </Col>
                </Row>
                <Row>
                  <h5>Maturity Amount:</h5>
                </Row>
                <Row>
                  <h6>30,000 /-</h6>
                </Row>
              </>) :
                schemeForm?.name === "SUVARNA" || schemeForm?.name === "SAMRUDDHI" ?
                  (<>
                    <hr />
                    <Row>
                      <h4>Example Calculation</h4>
                      <h6>
                        (If the installment amount is Rs. 2,500 in (11+1)plan with 25%
                        discount on Making charges)
                      </h6>
                      <Col md={6}>
                        {/* <div style={{flexDirection:'row', justifyContent:'center', alignItems:'center' }}> */}
                        <h6>Amount paid by the customer in 11 installments</h6>
                        {/* <h6>12,000 /-</h6> */}
                        {/* </div> */}
                        {/* <div style={{flexDirection:'row', justifyContent:'center', alignItems:'center' }}> */}
                        {/* <h6>Amount paid by the customer in 7th installment</h6> */}
                        <h6>Amount paid by you 25% of making charges(Supose making charges is 1000)</h6>
                        {/* </div> */}
                      </Col>
                      <Col md={6}>
                        <h6>27,5000 /-</h6>
                        <h6>250 /-</h6>
                      </Col>
                    </Row>
                    <Row>
                      <h5>Maturity Amount:</h5>
                    </Row>
                    <Row>
                      <h6>27,5000 /-</h6>
                    </Row>
                  </>) : ""}
            <hr />
            <Row>
              <Col md={2}>
                <Button
                  variant="secondary"
                  onClick={() => navigate("/vendorScheme")}
                >
                  Cancel
                </Button>
              </Col>
              <Col md={2}>
                <Button
                  variant="warning"
                  onClick={() => {
                    selectedScheme?._id ? editScheme() : createNewScheme();
                  }}
                >
                  Save
                </Button>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CreateScheme;
