import React, { useState, useEffect } from "react";
import SideBar from "../../dashboard/SideBar";
import FirstNavbar from "../../dashboard/FirstNavbar";
import { Card, Row, Col, Table, Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import AuthServices from "../../authServices/AuthServices";
import axios from "axios";
import { toast } from "react-toastify";
import { BaseURL } from "../../../URL";

const image = require("../../../assets/imagesCustomer/image.png");

function ManageSchemes() {
  const navigate = useNavigate();
  const [schemeList, setSchemeList] = useState([]);
  const [vendorDetails] = useState(
    JSON.parse(localStorage.getItem("vendorDetails"))
  );





  const [EditModal, setEditModal] = useState(false);
  const [shopdetails, setshopdetails] = useState({})
  const handleCloseEditModal = () => setEditModal(false);
  const handleShowEditModal = (shop) => {
    setEditModal(true);
    setshopdetails(shop)
  }


  const [AmountArry, setAmountArry] = useState([])
  const [Amount, setAmount] = useState()
  const [Activated, setActivated] = useState()
  const [Popular, setPopular] = useState()
  const [Duration, setDuration] = useState()
  const [discountPercentage, setdiscountPercentage] = useState()
  const [RedeemType, setRedeemType] = useState()
  const [description, setdescription] = useState()
  const [termcondition, settermcondition] = useState()


  const [checkedDuration, setCheckedDuration] = useState();

  const handleDuration = (value) => {
    console.log("setCheckedDuration ee", value);
    setCheckedDuration(value);
  };

  const addAmount = () => {
    if (!Amount) {
      alert("Please enter amount");
    } else {
      const newAmountObj = { Amount: Number(Amount) };
      setAmountArry([...AmountArry, newAmountObj]);
      setAmount("");
    }
  };
  useEffect(() => {
    // getUserData();
    // getVendorData();
    getAllScheme()
  }, []);

  const getUserData = async () => {
    try {
      const userData = await AuthServices.getDataUser("/user");
      // console.log("userDataaaaaaa", userData);
      if (userData?.error === false) {
      }
    } catch (e) {
      console.log("error ==>", e);
    }
  };

  const shopId = localStorage.getItem("vendorData");
  const getVendorData = async () => {
    // const schemeDisplay = await AuthServices.getDataProduct(
    //   `/scheme/all/${id}`
    // );
    const id = localStorage.getItem("shopId");
    const schemeData = await AuthServices.getDataProduct(`/scheme/all/${id}`);

    console.log("data1", schemeData);
    setSchemeList(schemeData?.data);
  };


  const getAllScheme = async () => {
    try {
      const response = await axios.get(
        `${BaseURL}/Scheme/getAllScheme`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("accessToken"),
          },
        }
      );
      if (response.status === 200) {
        setSchemeList(response?.data?.Scheme?.filter((item) => item?.deleted === false && item?.
          VendorID == vendorDetails?._id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editStore = async () => {
    try {
      const formData = new FormData();
      formData.append("schemeId", shopdetails?._id);
      formData.append("Schemename", shopdetails?.Schemename);
      formData.append("Amount", AmountArry?.length > 0 ? JSON.stringify(AmountArry) : JSON.stringify(shopdetails?.Amount)); // Fixed
      formData.append(
        "duration",
        JSON.stringify({
          customerTime: checkedDuration ? checkedDuration : shopdetails?.duration.customerTime, vendorTime: 1
        })
      );
      formData.append("Activated", Activated ? Activated : shopdetails?.Activated);
      formData.append("Popular", Popular ? Popular : shopdetails?.Popular);
      formData.append("DiscountType", shopdetails?.DiscountType);
      formData.append("DiscountPercentage", discountPercentage ? discountPercentage : shopdetails?.DiscountPercentage);
      formData.append("RedeemAt", RedeemType ? RedeemType : shopdetails?.RedeemAt);
      formData.append("Description", description ? description : shopdetails?.Description);
      formData.append("TermsConditions", termcondition ? termcondition : shopdetails?.TermsConditions);
      const schemeCreation = await axios.patch(
        `${BaseURL}/Scheme/editScheme`,
        formData,
        {
          headers: {
            "x-access-token": localStorage.getItem("accessToken"),
          },
        }
      );

      if (schemeCreation?.status === 200) {
        toast.success("Scheme edited successfully");
        getAllScheme()
        handleCloseEditModal()
      }
    } catch (error) {
      console.error("Error creating scheme:", error);
      toast.error("Scheme creation failed");
    }
  };

  const deleteScheme = async (id) => {
    if (window.confirm("Are you sure you want to delete...?")) {
      const data = await axios
        .patch(`${BaseURL}/Scheme/deleteScheme/${id}`, {}, {
          headers: {
            "x-access-token": localStorage.getItem("accessToken"),
          },
        })
        .catch((error) => {
          console.log("error ==>", error);
        });
      console.log("store updated  ===> ", data);
      if (data.status === 200) {
        toast.success("Scheme deleted successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
        });
        getAllScheme()
      }
    }
  };
  console.log("shopdetails", shopdetails);

  return (
    <div>
      <div class="sidebar">
        <SideBar />
      </div>
      <div class="content">
        <div className="container">
          <FirstNavbar />
          <h3 className="headertext">Schemes</h3>
          <div>
            <Card className="p-2">
              <Row>
                <Col md={4}>
                  {/* <h3 className="headertext">Manage Schemes:</h3> */}
                </Col>
              </Row>
              <Row>
                {/* <Col md={4}>
                  <Button
                    variant="outline-warning"
                    onClick={() => navigate("/ChooseScheme")}
                  >
                    Choose a Scheme Template
                  </Button>
                </Col> */}
                <Col md={4}>
                  <Button
                    variant="outline-warning"
                    onClick={() => navigate("/CreateScheme")}
                  >
                    Create Your own Scheme
                  </Button>
                </Col>
              </Row>
              <hr />
              <Card className="p-2">
                <h3 className="text1">Schemes List</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Scheme Name</th>
                      <th>Min Amount</th>
                      <th>Tenure</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schemeList?.map((scheme, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{scheme?.Schemename}</td>

                        <td> {scheme?.Schemename !== "VINAYAKA's GOLD JAR" ? (<>RS. {scheme?.Amount[0]?.Amount} /- </>) : "No Amount limit"}</td>
                        <td>
                          {scheme?.Schemename !== "VINAYAKA's GOLD JAR" ? (<> ({scheme?.duration?.customerTime} +{" "}
                            {scheme?.duration?.vendorTime})</>) : "No Time limit"}
                        </td>
                        <td>
                          <FontAwesomeIcon
                            onClick={() => handleShowEditModal(scheme)}
                            icon={faEdit}
                            className="editIcon"
                          />
                        </td>
                        <td>
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="editIcon"
                            style={{ color: "red" }}
                            value="edit"
                            onClick={(e) => {
                              deleteScheme(scheme._id);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </Card>
          </div>
        </div>
      </div>
      <Modal
        show={EditModal}
        onHide={handleCloseEditModal}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <Modal.Body>
          <h3 className="headertext text-center">Edit Scheme Details</h3>
          <Card className="p-2">
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Scheme Name</Form.Label>
                  <div className="leftedge d-flex justify-content-space">
                    <Form.Select
                      aria-label="Default select example"
                      size={"sm"}
                      className="selectsizesmall"
                    //  onChange={handleNameChange}
                    >
                      <option value="">{shopdetails?.Schemename} </option>
                      {/* <option value="KUBERA">KUBERA</option>
                      <option value="SUVARNA">SUVARNA</option>
                      <option value="SAMRUDDHI">SAMRUDDHI</option>
                      <option value="VINAYAKA's GOLD JAR">VINAYAKA's GOLD JAR</option> */}
                    </Form.Select>
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Store</Form.Label>
                  <div className="leftedge d-flex justify-content-space">
                    <Form.Select
                      aria-label="Default select example"
                      size={"sm"}
                      className="selectsizesmall"
                    //  onChange={handleStoreChange}
                    >
                      <option>{shopdetails?.StoreID?.name}</option>
                    </Form.Select>
                  </div>

                </Form.Group>
              </Col>
            </Row>
            {shopdetails?.Schemename === "VINAYAKA's GOLD JAR" ? "" :
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Amount</Form.Label><br></br>
                    {AmountArry?.length > 0 ? AmountArry?.map((item) => <span>{item?.Amount}, </span>) : shopdetails?.Amount?.map((item) => <span>{item?.Amount}, </span>)}
                    <Form.Control
                      maxLength={50}
                      type="number"
                      placeholder="Enter Scheme Amount"
                      size="sm"
                      name="minAmt"
                      onChange={(e) => setAmount(e.target.value)}
                      autoComplete="off"
                      className="mb-3 number-input"
                      value={Amount}
                    />

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
                    checked={Activated ? Activated : shopdetails?.Activated}
                    onChange={(e) => setActivated(e?.target?.checked)}
                  />

                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label></Form.Label>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Popular"
                    checked={Popular ? Popular : shopdetails?.Popular}
                    onChange={(e) => setPopular(e?.target?.checked)}
                  />

                </Form.Group>
              </Col>
            </Row>

            {shopdetails?.name === "VINAYAKA's GOLD JAR" ? "" : (<>
              <Row className="mt-4">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Select Plan Duration</Form.Label>
                    <Form.Check
                      label="General Duration"
                      name="duration"
                      type="radio"
                      onChange={() => setDuration("general")}
                      checked={Duration === "general" ? true : false}
                    />
                    {Duration === "general" ? (
                      <>
                        <Form.Check
                          label="( 6+1 )"
                          checked={checkedDuration === 6 && true}
                          onChange={() => handleDuration(6)}
                          name="duration"
                          type="radio"
                        />
                        <Form.Check
                          label="( 10+1 )"
                          checked={checkedDuration === 10 && true}
                          onChange={() => handleDuration(10)}
                          name="duration"
                          type="radio"
                        />
                        <Form.Check
                          // inline
                          label="( 11+1 )"
                          checked={checkedDuration === 11 && true}
                          onChange={() => handleDuration(11)}
                          name="duration"
                          type="radio"
                        />
                        <Form.Check
                          label="( 24+1 )"
                          checked={checkedDuration === 24 && true}
                          onChange={() => handleDuration(24)}
                          name="duration"
                          type="radio"
                        />
                        <Form.Check
                          label="( 36+1 )"
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
                      value={Duration === "custom" ? true : false}
                    />
                    {Duration === "custom" && (
                      <>
                        <Form.Control
                          maxLength={50}
                          type="text"
                          placeholder="Enter Duration"
                          size="sm"
                          name="duration"
                          // onChange={handleChange}
                          autoComplete="off"
                          className="mb-3"
                          value={shopdetails?.inputDuration}
                        />
                      </>
                    )}

                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col md={6} >
                  <Form.Group>
                    <Form.Label>Discount Type </Form.Label>
                    <Form.Control
                      maxLength={50}
                      type="text"
                      placeholder="Discount Type"
                      size="sm"
                      name="discountType"
                      autoComplete="off"
                      className="mb-3 number-input"
                      value={shopdetails?.DiscountType}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </>)}
            {shopdetails?.DiscountType === "Discount on Making Charges" ?
              <Row className="mt-4">
                <Col md={6} >
                  <Form.Group>
                    <Form.Label>Your Discount </Form.Label>
                    <Form.Control
                      maxLength={50}
                      type="number"
                      placeholder="Enter Discount %"
                      size="sm"
                      name="discountPercentage"
                      onChange={(e) => setdiscountPercentage(e.target.value)}
                      autoComplete="off"
                      className="mb-3 number-input"
                      value={discountPercentage ? discountPercentage : shopdetails?.DiscountPercentage}
                    />

                  </Form.Group>
                </Col>
              </Row> : ""}
            <Row className="mt-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Customer Can Redeem Scheme at</Form.Label>
                  <Form.Check
                    label="Any Store"
                    name="redeemType"
                    value="any"
                    type="radio"
                    onChange={() => setRedeemType("any")}
                  />
                  <Form.Check
                    label="The store selected at the time of starting the scheme"
                    name="redeemType"
                    value="store"
                    type="radio"
                    onChange={() => setRedeemType("store")}
                  />

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
                    onChange={(e) => setdescription(e.target.value)}
                    autoComplete="off"
                    className="mb-3"
                    value={description ? description : shopdetails?.Description}
                  />

                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Terms & Conditions </Form.Label>
                  <Form.Control
                    as="textarea"
                    type="text"
                    placeholder="Enter Terms & Conditions"
                    name="terms"
                    onChange={(e) => settermcondition(e.target.value)}
                    rows={5}
                    value={shopdetails?.TermsConditions}
                  />

                </Form.Group>
              </Col>
            </Row>
            {shopdetails?.name === "VINAYAKA's GOLD JAR" ? "" :
              shopdetails?.name === "KUBERA" ? (<>
                <hr />
                <Row>
                  <h4>Example Calculation</h4>
                  <h6>
                    (If the installment amount is Rs. 2,500 in (11+1)plan)
                  </h6>
                  <Col md={6}>
                    <h6>Amount paid by the customer in 11 installments</h6>
                    <h6>Amount paid by you</h6>
                  </Col>
                  <Col md={6}>
                    <h6>27,5000 /-</h6>
                    <h6>2,500 /-</h6>
                  </Col>
                </Row>
                <Row>
                  <h5>Maturity Amount:</h5>
                </Row>
                <Row>
                  <h6>30,000 /-</h6>
                </Row>
              </>) :
                shopdetails?.name === "SUVARNA" || shopdetails?.name === "SAMRUDDHI" ?
                  (<>
                    <hr />
                    <Row>
                      <h4>Example Calculation</h4>
                      <h6>
                        (If the installment amount is Rs. 2,500 in (11+1)plan with 25%
                        discount on Making charges)
                      </h6>
                      <Col md={6}>
                        <h6>Amount paid by the customer in 11 installments</h6>
                        <h6>Amount paid by you 25% of making charges(Supose making charges is 1000)</h6>
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


          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseEditModal} variant="secondary">
            Cancel
          </Button>
          <Button
            variant="warning"
            onClick={() => {
              editStore(shopdetails);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ManageSchemes;
