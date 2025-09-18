import React, { useEffect, useState } from 'react'
import SideBar from '../../dashboard/SideBar'
import FirstNavbar from '../../dashboard/FirstNavbar'
import { Card, Row, Col, Figure, Table, Button, Modal, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'
import { toast } from "react-toastify";
import AuthServices from '../../authServices/AuthServices'
import videoImg from '../../../assets/images/video.png';
import { IoMdCloseCircle } from "react-icons/io";
// const image = require('../../../assets/imagesCustomer/image.png');

function ManagePhysicalGold() {
  const [jewelleryModal, setJewelleryModal] = useState(false)
  const [editjewelleryModal, seteditJewelleryModal] = useState(false)
  const [coinModal, setCoinModal] = useState(false)
  const [img, setImg] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState()
  const [imgBar, setImgBar] = useState("");
  const [ShopList, setShopList] = useState([])
  const [video, setVideo] = useState("");
  const [selection, setSelection] = useState('1')
  const [productList, setProductList] = useState([])
  const [availability, setAvailability] = useState(selectedProduct ? selectedProduct?.Active : false)
  const [checkedMetal, setCheckedMetal] = useState(selectedProduct?.metal);
  const [metalType, setMetaltype] = useState()
  const [category, setcategory] = useState([])
  const [vendorDetails] = useState(
    JSON.parse(localStorage.getItem("vendorDetails"))
  );


  const [physicalGoldForm, setPhysicalGoldForm] = useState({
    name: "",
    Scategory: "",
    purity: "",
    type: '',
    price: '',
    weight: "",
    shops: "",
    paymentOption: "",
    Description: "",
    Size: "",
    Discount:0,
    Making_Charges:0,
    Wastage:0,
    GST:0
    // image: '',
  })

  const [physicalGoldFormErrors, setPhysicalGoldFormErrors] = React.useState({
    metal: '',
    name: '',
    Scategory: "",
    purity: '',
    availability: '',
    type: '',
    price: '',
    weight: '',
    shops: '',
    paymentOption: '',
    image: '',
    video: '',
    Description: "",
    Discount:"",
    Wastage:"",
    GST:"",
    Making_Charges:"",
  })
  const [physicalBarCoinGoldForm, setPhysicalBarCoinGoldForm] = useState({
    metal: '',
    name: '',
    purity: '',
    weight: '',
    model: '',
    shops: '',
    packaging: '',
    paymentOption: ''
  })
  const [physicalBarCoinGoldFormError, setPhysicalBarCoinGoldFormError] = useState({
    metal: '',
    name: '',
    purity: '',
    weight: '',
    model: '',
    shops: '',
    packaging: '',
    paymentOption: ''
  })


  // const handleChangeBarCoin = ({ target: { name, value } }) => {
  //   setPhysicalBarCoinGoldForm({ ...physicalBarCoinGoldForm, [name]: value });
  // }

  const handleChange = (e) => {
    setPhysicalGoldForm({
      ...physicalGoldForm,
      [e?.target?.name]: e?.target?.value,
      [e?.target?.Scategory]: e?.target?.value,
      [e.target.purity]: e.target.value,
      [e.target.type]: e.target.value,
      [e.target.price]: e.target.value,
      [e.target.weight]: e.target.value,
      [e.target.shops]: e.target.value,
      [e.target.paymentOption]: e.target.value,
      [e.target.Discount]:e.target.value,
      [e.target.Making_Charges]:e.target.value,
      [e.target.Wastage]:e.target.value,
      [e.target.GST]:e.target.value
    });

    setPhysicalGoldFormErrors({
      ...physicalGoldFormErrors,
      [e.target.name]: null,
      [e.target.Scategory]: null,
      [e.target.metal]: null,
      [e.target.purity]: null,
      [e.target.type]: null,
      [e.target.price]: null,
      [e.target.Wastage]: null,
      [e.target.Discount]: null,
      [e.target.Making_Charges]: null,
      [e.target.weight]: null,
      [e.target.GST]: null,
    });
  };

  const handleStoreChange = (e) => {
    setPhysicalGoldForm({ ...physicalGoldForm, shops: e.target.value })
  }

  const handlePaymentChange = (e) => {
    setPhysicalGoldForm({ ...physicalGoldForm, paymentOption: e.target.value })
  }

  const handleCategoryChange = (e) => {
    setPhysicalGoldForm({ ...physicalGoldForm, Scategory: e.target.value })
  }


  const handlePurityChange = (e) => {
    setPhysicalGoldForm({ ...physicalGoldForm, purity: e.target.value })
  }


  const handleClickMetal = (value) => {
    console.log('handleClickMetal ee', value);
    setCheckedMetal(value)
    // setPhysicalGoldForm({
    //   ...physicalGoldForm, metal: value
    // })
  }




  const handleValidation = () => {
    const { name, purity, weight, shops, paymentOption, Scategory,Making_Charges,Wastage,Discount,GST } = physicalGoldForm
    const newErrors = {}
    if (!checkedMetal) {
      newErrors.metal = 'please select metal type'
    }
    if (!name) {
      newErrors.name = 'please enter name'
    }
    if (!purity) {
      newErrors.purity = 'please enter purity'
    }
    if (availability === false) {
      newErrors.availability = 'please select availability'
    }
    if (!weight) {
      newErrors.weight = 'please enter weight'
    }
    if (shops.length == 0) {
      newErrors.shops = 'please select store'
    }
    if (!paymentOption) {
      newErrors.paymentOption = 'please select payment option'
    } if (!Scategory) {
      newErrors.Scategory = "Please select category"
    }
    if (!img) {
      newErrors.image = 'please select image'
    }

    //     if (!Discount) {
    //   newErrors.Discount = 'please enter discount'
    // }
    //     if (!Making_Charges) {
    //   newErrors.Making_Charges = 'please enter Making Charges'
    // }
    //     if (!Wastage) {
    //   newErrors.Wastage = 'please enter Wastage'
    // }
    return newErrors
  }


  const handleSubmit = async () => {
    const handleValidationObject = handleValidation()
    if (Object.keys(handleValidationObject).length > 0) {
      setPhysicalGoldFormErrors(handleValidationObject)
    } else {
      const formData = new FormData();
      formData.append('metalType', checkedMetal)
      formData.append('Name', physicalGoldForm?.name)
      formData.append('Category', physicalGoldForm?.Scategory)
      formData.append('Purity', physicalGoldForm?.purity)
      formData.append('Active', availability)
      formData.append('Weight', physicalGoldForm?.weight)
      formData.append('Payment', physicalGoldForm?.paymentOption)
      formData.append('StoreID', physicalGoldForm?.shops)
      formData.append('VendorID', vendorDetails?._id)
      formData.append('discription', physicalGoldForm?.Description)
      formData.append('size', physicalGoldForm?.Size)
      formData.append('Discount', physicalGoldForm?.Discount)
      formData.append('Wastage', physicalGoldForm?.Wastage)
      formData.append('GST', physicalGoldForm?.GST)
      formData.append('Making_Charges', physicalGoldForm?.Making_Charges)
      img?.forEach((image, index) => {
        formData.append(`Image`, image); // Note: same field name for all images
      });
      formData.append('Video', video);
      console.log(formData, "THIS IS FORM")
      const physicalGold = await axios.post(
        `http://localhost:3001/api/Products/createProduct`,
        formData,
        {
          headers: { "x-access-Token": localStorage.getItem("accessToken") },
        }
      );
      console.log('physicalGold physicalGold', physicalGold);
      if (physicalGold?.status === 200) {
        toast.success('Product has successfully created')
        setPhysicalGoldForm({
          ...physicalGoldForm,
          name: '',
          purity: '',
          type: '',
          price: '',
          weight: '',
          shops: '',
          paymentOption: '',
          video: '',
          stoneweight: '',
          stoneCategory: '',
          stonePurity: '',
          stoneShape: '',
          Making_Charges:0,
          Wastage:0,
          Discount:0,
          GST:0
        })
        setAvailability(false)
        setImg()
        handleCloseModal()
        getProductList()
      }

      if (physicalGold?.error === true) {
        console.log(physicalGold, "error after submit")
        toast.show({
          type: 'error',
          text1: `${physicalGold.message}`,
        })
        handleCloseModal()
      }
    }
  }

  const handleSubmitEdit = async () => {
    const formData = new FormData();
    formData.append('metalType', checkedMetal ? checkedMetal : selectedProduct?.metalType)
    formData.append('Name', physicalGoldForm?.name ? physicalGoldForm?.name : selectedProduct?.Name)
    formData.append('Category', physicalGoldForm?.Scategory ? physicalGoldForm?.Scategory : selectedProduct?.Category?._id)
    formData.append('Purity', physicalGoldForm?.purity ? physicalGoldForm?.purity : selectedProduct?.Purity)
    formData.append('Active', availability)
    formData.append('Weight', physicalGoldForm?.weight ? physicalGoldForm?.weight : selectedProduct?.Weight)
    formData.append('Payment', physicalGoldForm?.paymentOption ? physicalGoldForm?.paymentOption : selectedProduct?.Payment)
    formData.append('ID', selectedProduct?._id)
    formData.append('discription', physicalGoldForm?.Description ? physicalGoldForm?.Description : selectedProduct?.discription)
    formData.append('size', physicalGoldForm?.Size ? physicalGoldForm?.Size : selectedProduct?.size)
     formData.append('Discount', physicalGoldForm?.Discount?physicalGoldForm?.Discount:selectedProduct?.Discount)
      formData.append('Wastage', physicalGoldForm?.Wastage? physicalGoldForm?.Wastage:selectedProduct?.Wastage )
      formData.append('GST', physicalGoldForm?.GST? physicalGoldForm?.GST:selectedProduct?.GST )
      formData.append('Making_Charges', physicalGoldForm?.Making_Charges?physicalGoldForm?.Making_Charges:selectedProduct?.Making_Charges)
    img?.forEach((image, index) => {
      formData.append(`Image`, image); // Note: same field name for all images
    });
    formData.append('Video', video ? video : selectedProduct?.Video);
    console.log(formData, "THIS IS FORM")
    const physicalGold = await axios.patch(
      `http://localhost:3001/api/Products/editProduct`,
      formData,
      {
        headers: { "x-access-Token": localStorage.getItem("accessToken") },
      }
    );
    console.log('physicalGold physicalGold', physicalGold);
    if (physicalGold?.status === 200) {
      getProductList()
      toast.success('Product has successfully Edited')
      setPhysicalGoldForm({
        ...physicalGoldForm,
        name: '',
        purity: '',
        type: '',
        price: '',
        weight: '',
        shops: '',
        paymentOption: '',
        video: '',
        stoneweight: '',
        stoneCategory: '',
        stonePurity: '',
        stoneShape: '',
         Making_Charges:0,
          Wastage:0,
          Discount:0,
          GST:0
      })
      setAvailability(false)
      setImg()
      setSelectedProduct()
      seteditJewelleryModal(false)
      getProductList()
    }
    if (physicalGold?.error === true) {
      console.log(physicalGold, "error after submit")
      toast.show({
        type: 'error',
        text1: `${physicalGold.message}`,
      })
      setSelectedProduct()
      seteditJewelleryModal(false)
    }
  }

  const [deletedImage, setdeletedImage] = useState([])
  const deleteImage = async (productId, imageId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/Products/deleteImage`,
        {
          data: { productID: productId, imageID: imageId },
          headers: { "x-access-Token": localStorage.getItem("accessToken") }
        }
      );

      if (response.data.success) {
        setdeletedImage(prev => [...prev, imageId]);
        toast.success("Image deleted successfully");
        // Update your state or refetch product data
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error(error.response?.data?.message || error.message || "Error deleting image");
    }
  };

  const handleChangeBarCoin = (e) => {
    setPhysicalBarCoinGoldForm({
      ...physicalBarCoinGoldForm,
      [e?.target?.name]: e?.target?.value,
      [e.target.purity]: e.target.value,
      [e.target.type]: e.target.value,
      [e.target.price]: e.target.value,
      [e.target.weight]: e.target.value,
      [e.target.shops]: e.target.value,
      [e.target.paymentOption]: e.target.value,
    });

    setPhysicalBarCoinGoldFormError({
      ...physicalBarCoinGoldFormError,
      [e.target.name]: null,
      [e.target.metal]: null,
      [e.target.purity]: null,
      [e.target.type]: null,
      [e.target.shops]: null,
      [e.target.price]: null,
      [e.target.weight]: null,
      [e.target.image]: null,
      [e.target.paymentOption]: null,
    });
  };

  const handleStoreChangeBar = (e) => {
    setPhysicalBarCoinGoldForm({ ...physicalBarCoinGoldForm, shops: e.target.value })
  }

  const handlePaymentChangeBar = (e) => {
    setPhysicalBarCoinGoldForm({ ...physicalBarCoinGoldForm, paymentOption: e.target.value })
  }

  const handleMetalType = (value) => {
    console.log('handleClickMetal ee', value);
    setMetaltype(value)
  }

  const handleValidationBarCoin = () => {
    const { name, purity, weight, shops, paymentOption, model } = physicalBarCoinGoldForm
    const newErrors = {}
    if (!metalType) {
      newErrors.metal = 'please select metal type'
    }
    if (!name) {
      newErrors.name = 'please enter name'
    }
    if (!purity) {
      newErrors.purity = 'please enter purity'
    }
    if (!model) {
      newErrors.model = 'please select model'
    }
    if (!weight) {
      newErrors.weight = 'please enter weight'
    }
    if (shops.length === 0) {
      newErrors.shops = 'please select store'
    }
    if (!paymentOption) {
      newErrors.paymentOption = 'please select payment option'
    }
    if (!imgBar) {
      newErrors.image = 'please select image'
    }
    return newErrors
  }

  const handleSubmitBarCoin = async () => {
    const handleValidationObject = handleValidationBarCoin()
    if (Object.keys(handleValidationObject).length > 0) {
      setPhysicalBarCoinGoldFormError(handleValidationObject)
    } else {
      /** Payload **/
      const formData = new FormData();
      formData.append('type', metalType)
      formData.append('title', physicalBarCoinGoldForm?.name)
      formData.append('purity', physicalBarCoinGoldForm?.purity)
      formData.append('weight', physicalBarCoinGoldForm?.weight)
      formData.append('model', physicalGoldForm?.model)
      formData.append('payment', physicalBarCoinGoldForm?.paymentOption)
      formData.append('shops', JSON.stringify(physicalBarCoinGoldForm?.shops))
      formData.append('image', imgBar);
      console.log(formData, "THIS IS FORM")
      const physicalGold = await AuthServices.postDataProduct(`/product/create`, formData)
      console.log("SUBMIT RESPONSE", physicalGold)
      if (physicalGold?.error === false) {
        setPhysicalBarCoinGoldForm({
          ...physicalBarCoinGoldForm,
          name: '',
          metal: '',
          purity: '',
          type: '',
          price: '',
          weight: '',
          model: '',
          packaging: '',
          shops: '',
          paymentOption: '',
          image: ''
        })
        setImgBar()
        setMetaltype('')
        handleCloseModal1()

      }
      if (physicalGold?.error === true) {
        setPhysicalGoldForm({
          ...physicalGoldForm,
          metalType: 'bar',
          name: '',
          purity: '',
          type: '',
          price: '',
          weight: '',
          model: '',
          packaging: '',
          shops: '',
          paymentOption: '',
          image: ''
        })
        toast.show({
          type: 'error',
          text1: `${physicalGold.message}`,
        })
        setImgBar()
        setMetaltype('')
        handleCloseModal1()
      }
    }
  }


  const handleCloseModal = () => setJewelleryModal(false)
  const handleShowModal = (prod) => {
    console.log('prod', prod);
    setJewelleryModal(true)
    setPhysicalGoldForm({
      name: prod?.title,
      purity: prod?.purity,
      type: '',
      price: '',
      weight: prod?.weight,
      shops: '',
      paymentOption: '',
    })
    setCheckedMetal(prod?.metal)
    setImg(prod?.image[0])
  }

  const handleCloseModal1 = () => setCoinModal(false)
  const handleShowModal1 = () => setCoinModal(true)

  const onGoldSelect = (e) => {
    setSelection(e.target.value)
  }

  useEffect(() => {
    if (vendorDetails) {
      getShopList()
      getProductList()
      GetCategory()
    }
  }, [vendorDetails]);



  const GetCategory = () => {
    let token = localStorage.getItem('accessToken');
    axios.get("http://localhost:3001/api/admin/category", {
      headers: {
        "x-access-token": token
      }
    }).then((response) => {
      console.log(response, "RESPONSE DATA")
      if (response.status === 200) {
        setcategory(response?.data?.category)
      }
    });
  }


  const getShopList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/Stores/getAllStores",
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("accessToken"),
          },
        }
      );
      if (response.status === 200) {
        setShopList(response?.data?.Stores?.filter((item) => item?.deleted === false && item?.VendorID?._id == vendorDetails?._id));
      }
    } catch (error) {
      console.error(error);
    }
  };


  const getProductList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/Products/getAllProduct",
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("accessToken"),
          },
        }
      );
      if (response.status === 200) {
        console.log("responseresponse", response);
        setdeletedImage([])
        setProductList(response?.data?.Product?.filter((item) => item?.deleted === false && item?.VendorID?._id == vendorDetails?._id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  function selecteProduct(prod) {
    seteditJewelleryModal(true); 
    setSelectedProduct(prod);
    //  setPhysicalGoldForm({
    //   ...physicalGoldForm,
    //   [physicalGoldForm.Discount]:prod?.Discount,
    //   [physicalGoldForm.Making_Charges]:prod?.Making_Charges,
    //   [physicalGoldForm.Wastage]:prod?.Wastage
    // });
       setPhysicalGoldForm({
      ...physicalGoldForm,
      Wastage: prod?.Wastage,
      Making_Charges:prod?.Making_Charges,
      Discount:prod?.Discount,
      GST:prod?.GST
    });
  }


  console.log("selectedProduct", selectedProduct);
console.log("physicalGoldForm?.Wastage",physicalGoldForm?.Wastage);


  return (
    <div>
      <div class="sidebar">
        <SideBar />
      </div>
      <div class="content">
        <div className="container">
          <FirstNavbar />
          <h3 className='headertext'>Physical Gold</h3>
          <div>
            <Card className='p-2'>
              <Row>
                <Col md={4}>
                  {/* <h3 className='headertext'>Manage Physical Gold:</h3> */}
                </Col>

              </Row>
              <Row>
                <Col md={3}>
                  <Form.Select
                    aria-label="Default select example"
                    size={"sm"}
                    className="selectsizesmall"
                    onChange={onGoldSelect}
                  >
                    {/* <option >Select Physical Gold</option> */}
                    <option value="1">Jewellery</option>
                    {/* <option value="2">Bar/Coins</option> */}
                  </Form.Select>
                </Col>
                <Col>
                  {selection == 1 &&
                    <Col md={3}>
                      <Button variant="warning" onClick={handleShowModal}>Add Jewellery</Button>
                    </Col>
                  }
                  {selection == 2 &&
                    <Col md={3}>
                      <Button variant="warning" onClick={handleShowModal1}>Add Bar/Coin</Button>
                    </Col>
                  }
                </Col>
              </Row>

              <hr />
              <Card className='p-2'>
                <h3 className='text1'>Available Products</h3>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Store Name</th>
                      <th>Jewellery Name</th>
                      <th>Category</th>
                      <th>Jewellery Image</th>
                      <th>Jewellery Video</th>
                      {/* <th>Price</th> */}
                      <th>Weight</th>
                      {/* <th>category</th> */}
                      <th>Metal</th>
                      <th>Purity</th>
                      <th>Availability</th>
                      <th>GST</th>
                      <th>Making Charges (%)</th>
                      <th>Wastage (%)</th>
                      <th>Discount (%)</th>
                      {/* <th>Status</th> */}
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList?.map((prod, i) => {
                      return (
                        <tr>
                          <td>{i + 1}</td>
                          <td>{prod?.StoreID?.name}</td>
                          <td>{prod?.Name}</td>
                          <td>{prod?.Category?.Name}</td>
                          <td>
                            {prod?.Image?.map((Im) =>
                              <Figure onClick={() => {
                                const win = window.open('', '_blank');
                                win.document.write(`<img src="${Im?.Imgurl}" style="max-width: 100%; height: auto;">`);
                              }}>
                                <Figure.Image
                                  width={30}
                                  height={30}
                                  // alt="171x180"
                                  src={Im?.Imgurl}
                                  style={{ margin: 2 }}
                                />
                              </Figure>
                            )}
                          </td>
                          <td>
                            <Figure onClick={() => {
                            const videoUrl = prod?.Video;
                            if (!videoUrl) return;

                            const newWindow = window.open('', '_blank');
                            newWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Video Player</title>
        <style>
          body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: #000; }
          video { max-width: 90%; max-height: 90%; }
        </style>
      </head>
      <body>
        <video controls autoplay>
          <source src="${videoUrl}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </body>
    </html>
  `);
                            newWindow.document.close();
                          }}>
                            <Figure.Image
                              width={30}
                              height={30}
                              // alt="171x180"
                              src={videoImg}
                              style={{ margin: 2 }}
                            />
                          </Figure></td>
                          {/* <td>RS. {prod?.price} /-</td> */}
                          <td>{prod?.Weight} gms</td>
                          {/* <td>ring</td> */}
                          <td>{prod?.metalType}</td>
                          <td>{prod?.Purity}</td>
                          <td>{prod?.Active ? "Yes" : "No"}</td>
                          <td>{prod?.GST}</td>
                          <td>{prod?.Making_Charges}</td>
                          <td>{prod?.Wastage}</td>
                          <td>{prod?.Discount}</td>
                          {/* <td>{prod?.Status}</td> */}
                          <td>
                            <FontAwesomeIcon
                              onClick={() => selecteProduct(prod)}
                              icon={faEdit} className="editIcon"
                            />
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </Card>
            </Card>
          </div>
        </div>
      </div>
      <Modal
        show={jewelleryModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <h4 className='headertext text-center'>Add Jewellery Details</h4>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Check
                inline
                label="Gold"
                name="metal"
                // value="gold"
                // onChange={handleChange}
                type="radio"
                checked={checkedMetal === 'Gold' && true}
                onClick={() => handleClickMetal('Gold')}
              />
              <Form.Check
                inline
                label="Silver"
                name="metal"
                // value="silver"
                // onChange={handleChange}
                type="radio"
                checked={checkedMetal === 'Silver' && true}
                onClick={() => handleClickMetal('Silver')}
              />
              <Form.Check
                inline
                label="Platinum"
                name="metal"
                // value="platinum"
                // onChange={handleChange}
                type="radio"
                checked={checkedMetal === 'Platinum' && true}
                onClick={() => handleClickMetal('Platinum')}
              />
            </Col>
            <span className="text-danger">{physicalGoldFormErrors?.metal}</span>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder="Enter Name"
                  size="sm"
                  name='name'
                  onChange={handleChange}
                  autoComplete='off'
                  className='mb-3'
                  // pattern="/^[a-zA-Z]*$/"
                  required
                  value={physicalGoldForm?.name}
                />
                <span className="text-danger">{physicalGoldFormErrors?.name}</span>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Select Category - (First select metal type)</Form.Label>
                <div className="leftedge d-flex justify-content-space">
                  <Form.Select
                    aria-label="Default select Payment"
                    size={"sm"}
                    className="selectsizesmall"
                    name="paymentOption"
                    onChange={handleCategoryChange}
                  >
                    <option >Select Category</option>
                    {category?.filter((item) => item?.metalType === checkedMetal)?.map((cat) =>
                      <option value={cat?._id}>{cat?.Name}</option>
                    )}
                  </Form.Select>
                </div>
                <span className="text-danger">{physicalGoldFormErrors?.paymentOption}</span>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Weight(gm)</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder="Enter Weight"
                  size="sm"
                  name='weight'
                  onChange={handleChange}
                  autoComplete='off'
                  className='mb-3'
                  value={physicalGoldForm?.weight}
                />
                <span className="text-danger">{physicalGoldFormErrors?.weight}</span>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Purity(K) - (First select metal type)</Form.Label>
                {checkedMetal === 'Gold' ?
                  <Form.Select
                    aria-label="Default select example"
                    size={"sm"}
                    className="selectsizesmall"
                    onChange={handlePurityChange}
                  >
                    <option>Select Purity</option>
                    <option value={22}>22</option>
                    <option value={24}>24</option>
                  </Form.Select> :
                  <Form.Control
                    maxLength={50}
                    type="text"
                    placeholder="Enter Purity"
                    size="sm"
                    name='purity'
                    onChange={handleChange}
                    autoComplete='off'
                    className='mb-3'
                    value={physicalGoldForm?.purity}
                  />}
                <span className="text-danger">{physicalGoldFormErrors?.purity}</span>
              </Form.Group>
            </Col>

          </Row>
          <Row>
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
                    <option >Select Store</option>
                    {
                      ShopList?.map(shop => (
                        <option key={shop?._id} value={shop?._id}>
                          {shop?.name}
                        </option>
                      ))
                    }
                  </Form.Select>
                </div>
                <span className="text-danger">{physicalGoldFormErrors?.shops}</span>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Select Payment Option</Form.Label>
                <div className="leftedge d-flex justify-content-space">
                  <Form.Select
                    aria-label="Default select Payment"
                    size={"sm"}
                    className="selectsizesmall"
                    name="paymentOption"
                    onChange={handlePaymentChange}
                  >
                    {/* <option >Select Payment Option</option> */}
                    <option value="offline">Offline</option>
                    <option value="online">Online</option>
                  </Form.Select>
                </div>
                <span className="text-danger">{physicalGoldFormErrors?.paymentOption}</span>
              </Form.Group>
            </Col>

          </Row>
          <Row>
            <Row>
              {/* <Figure>
                <Figure.Image
                  width={100}
                  height={100}
                  alt="171x180"
                  src={img}
                // onChange={}
                />
              </Figure> */}
            </Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Add Product Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Product Images"
                  className="mb-3"
                  name="images"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      // Convert FileList to array and validate
                      const validFiles = Array.from(files).filter(file =>
                        file.type.startsWith('image/') &&
                        ['.jpg', '.jpeg', '.png', '.webp'].some(ext => file.name.toLowerCase().endsWith(ext))
                      );

                      if (validFiles.length !== files.length) {
                        alert('Only JPG, JPEG, PNG, or WEBP images are allowed');
                      }
                      setImg(validFiles);
                    }
                  }}
                  autoComplete="off"
                  multiple
                  accept="image/*,.jpg,.jpeg,.png,.webp"
                />

                <span className="text-danger">{physicalGoldFormErrors?.image}</span>
              </Form.Group>
            </Col>
            {/* </Row> */}
            {/* <Row>
            <Col md={6}>
              <Button variant="warning">Update Image</Button>
            </Col>
          </Row> */}
            {/* <Row> */}
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Add Product Video</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Product Video"
                  className="mb-3"
                  name="video"
                  onChange={(e) => setVideo(e.target.files[0])}
                  autoComplete="off"
                  accept="video/*,.mp4,.webm,.mov,.avi,.mkv"
                />
                <span className="text-danger">{physicalGoldFormErrors?.video}</span>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder="Enter Description"
                  size="sm"
                  name='Description'
                  onChange={handleChange}
                  autoComplete='off'
                  className='mb-3'
                  // pattern="/^[a-zA-Z]*$/"
                  required
                  value={physicalGoldForm?.Description}
                />
                <span className="text-danger">{physicalGoldFormErrors?.Description}</span>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Size (Optional)</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder="Enter Size"
                  size="sm"
                  name='Size'
                  onChange={handleChange}
                  autoComplete='off'
                  className='mb-3'
                  // pattern="/^[a-zA-Z]*$/"
                  required
                  value={physicalGoldForm?.Size}
                />
              </Form.Group>
            </Col>
          </Row>
            <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Making Charges (%)</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="number"
                  placeholder="0"
                  size="sm"
                  name='Making_Charges'
                  onChange={handleChange}
                  className='mb-3'
                  // pattern="/^[a-zA-Z]*$/"
                  required
                  value={physicalGoldForm?.Making_Charges}
                />
               {/*<span className="text-danger">{physicalGoldFormErrors?.Making_Charges}</span>*/} 
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Wastage (%)</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="number"
                  placeholder="0"
                  size="sm"
                  name='Wastage'
                  onChange={handleChange}
                  autoComplete='off'
                  className='mb-3'
                  // pattern="/^[a-zA-Z]*$/"
                  required
                  value={physicalGoldForm?.Wastage}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
        <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Discount (%)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="0"
                  size="sm"
                  name='Discount'
                  onChange={handleChange}
                  autoComplete='off'
                  className='mb-3'
                  // pattern="/^[a-zA-Z]*$/"
                  required
                  value={physicalGoldForm?.Discount}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>GST (%)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="0"
                  size="sm"
                  name='GST'
                  onChange={handleChange}
                  autoComplete='off'
                  className='mb-3'
                  // pattern="/^[a-zA-Z]*$/"
                  required
                  value={physicalGoldForm?.GST}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label></Form.Label>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Availability"
                  checked={availability}
                  onChange={(e) => setAvailability(e?.target?.checked)}
                />
                <span className="text-danger">{physicalGoldFormErrors?.availability}</span>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal} variant="secondary">
            Cancel
          </Button>
          <Button variant="warning" onClick={() => handleSubmit()}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal
        show={editjewelleryModal}
        onHide={() => seteditJewelleryModal(false)}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <h4 className='headertext text-center'>Edit Jewellery Details</h4>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Check
                inline
                label="Gold"
                name="metal"
                // value="gold"
                // onChange={handleChange}
                type="radio"
                checked={selectedProduct?.metalType === 'Gold' || checkedMetal === 'Gold' && true}
              // onClick={() => handleClickMetal('Gold')}
              />
              <Form.Check
                inline
                label="Silver"
                name="metal"
                // value="silver"
                // onChange={handleChange}
                type="radio"
                checked={selectedProduct?.metalType === 'Silver' || checkedMetal === 'Silver' && true}
              // onClick={() => handleClickMetal('Silver')}
              />
              <Form.Check
                inline
                label="Platinum"
                name="metal"
                // value="platinum"
                // onChange={handleChange}
                type="radio"
                checked={selectedProduct?.metalType === 'Platinum' || checkedMetal === 'Platinum' && true}
              // onClick={() => handleClickMetal('Platinum')}
              />
            </Col>

          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder={selectedProduct?.Name}
                  size="sm"
                  name='name'
                  onChange={handleChange}
                  autoComplete='off'
                  className='mb-3'
                  // pattern="/^[a-zA-Z]*$/"
                  required
                  value={physicalGoldForm?.name}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Select Category</Form.Label>
                <div className="leftedge d-flex justify-content-space">
                  <Form.Select
                    aria-label="Default select Payment"
                    size={"sm"}
                    className="selectsizesmall"
                    name="paymentOption"
                    onChange={handleCategoryChange}
                  >
                    <option>{selectedProduct?.Category?.Name}</option>
                    {category?.filter((item) => item?._id !== selectedProduct?.Category?._id && item?.metalType === selectedProduct?.metalType)?.map((cat) =>
                      <option value={cat?._id}>{cat?.Name}</option>
                    )}
                  </Form.Select>
                </div>
              </Form.Group>
            </Col>

          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Weight(gm)</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder={selectedProduct?.Weight}
                  size="sm"
                  name='weight'
                  onChange={handleChange}
                  autoComplete='off'
                  className='mb-3'
                  value={physicalGoldForm?.weight}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Purity(K)</Form.Label>
                {selectedProduct?.metalType === 'Gold' ?
                  <Form.Select
                    aria-label="Default select example"
                    size={"sm"}
                    className="selectsizesmall"
                    onChange={handlePurityChange}
                  >
                    <option>{selectedProduct?.Purity}</option>
                    {selectedProduct?.Purity == 22 ?
                      <option value={24}>24</option> :
                      <option value={22}>22</option>}

                  </Form.Select> :
                  <Form.Control
                    maxLength={50}
                    type="text"
                    placeholder="Enter Purity"
                    size="sm"
                    name='purity'
                    onChange={handleChange}
                    autoComplete='off'
                    className='mb-3'
                    value={physicalGoldForm?.purity}
                  />}
              </Form.Group>
            </Col>
          </Row>
          <Row>
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
                    <option>{selectedProduct?.StoreID?.name}</option>
                    {
                      ShopList?.filter((item) => item?._id !== selectedProduct?.StoreID?._id)?.map(shop => (
                        <option key={shop?._id} value={shop?._id}>
                          {shop?.name}
                        </option>
                      ))
                    }
                  </Form.Select>
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Select Payment Option</Form.Label>
                <div className="leftedge d-flex justify-content-space">
                  <Form.Select
                    aria-label="Default select Payment"
                    size={"sm"}
                    className="selectsizesmall"
                    name="paymentOption"
                    onChange={handlePaymentChange}
                  >
                    <option>{selectedProduct?.Payment}</option>
                    {selectedProduct?.Payment === "offline" ?
                      <option value="online">Online</option> :
                      <option value="offline">Offline</option>
                    }
                  </Form.Select>
                </div>
              </Form.Group>
            </Col>

          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Add Product Image</Form.Label>
                <Row>
                  <div style={{ display: "flex" }}>
                    {selectedProduct?.Image
                      ?.filter((item) => !deletedImage?.includes(item._id)) // ✅ Filters out deleted images
                      ?.map((im) => (
                        <div key={im?._id} style={{ margin: 2 }}> {/* Add a key for React optimization */}
                          <Figure>
                            <Figure.Image
                              width={40}
                              height={40}
                              src={im?.Imgurl}
                            />
                          </Figure>
                          <IoMdCloseCircle
                            color='red'
                            style={{ marginBottom: "23px", marginLeft: "-5px" }}
                            onClick={() => deleteImage(selectedProduct?._id, im?._id)}
                          />
                        </div>
                      ))}
                  </div>
                </Row>

                <Form.Control
                  type="file"
                  placeholder="Product Images"
                  className="mb-3"
                  name="images"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      // Convert FileList to array and validate
                      const validFiles = Array.from(files).filter(file =>
                        file.type.startsWith('image/') &&
                        ['.jpg', '.jpeg', '.png', '.webp'].some(ext => file.name.toLowerCase().endsWith(ext))
                      );
                      if (validFiles.length !== files.length) {
                        alert('Only JPG, JPEG, PNG, or WEBP images are allowed');
                      }
                      setImg(validFiles);
                    }
                  }}
                  autoComplete="off"
                  multiple
                  accept="image/*,.jpg,.jpeg,.png,.webp"
                />

                <span className="text-danger">{physicalGoldFormErrors?.image}</span>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Add Product Video</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Product Video"
                  className="mb-3"
                  name="video"
                  onChange={(e) => setVideo(e.target.files[0])}
                  autoComplete="off"
                  accept="video/*,.mp4,.webm,.mov,.avi,.mkv"
                />
                <span className="text-danger">{physicalGoldFormErrors?.video}</span>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder={selectedProduct?.discription}
                  size="sm"
                  name='Description'
                  onChange={handleChange}
                  autoComplete='off'
                  className='mb-3'
                  // pattern="/^[a-zA-Z]*$/"
                  required
                  value={physicalGoldForm?.Description}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Size (Optional)</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder={selectedProduct?.size}
                  size="sm"
                  name='Size'
                  onChange={handleChange}
                  autoComplete='off'
                  className='mb-3'
                  // pattern="/^[a-zA-Z]*$/"
                  required
                  value={physicalGoldForm?.Size}
                />
              </Form.Group>
            </Col>
          </Row>
               <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Making Charges (%)</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="number"
                  placeholder={selectedProduct?.Making_Charges}
                  size="sm"
                  name='Making_Charges'
                  onChange={handleChange}
                  className='mb-3'
                  // pattern="/^[a-zA-Z]*$/"
                  required
                  value={physicalGoldForm?.Making_Charges}
                />
               {/*<span className="text-danger">{physicalGoldFormErrors?.Making_Charges}</span>*/} 
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Wastage (%)</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="number"
                  placeholder={selectedProduct?.Wastage}
                  size="sm"
                  name='Wastage'
                  onChange={handleChange}
                  autoComplete='off'
                  className='mb-3'
                  // pattern="/^[a-zA-Z]*$/"
                  required
                  value={physicalGoldForm?.Wastage}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row> 
          <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Discount (%)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={selectedProduct?.Discount}
                  size="sm"
                  name='Discount'
                  onChange={handleChange}
                  autoComplete='off'
                  className='mb-3'
                  // pattern="/^[a-zA-Z]*$/"
                  required
                  value={physicalGoldForm?.Discount}
                />
              </Form.Group>
            </Col>
                  <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>GST (%)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={selectedProduct?.GST}
                  size="sm"
                  name='GST'
                  onChange={handleChange}
                  autoComplete='off'
                  className='mb-3'
                  // pattern="/^[a-zA-Z]*$/"
                  required
                  value={physicalGoldForm?.GST}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label></Form.Label>
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Availability"
                checked={availability}
                onChange={(e) => setAvailability(e?.target?.checked)}
              />
            </Form.Group>
          </Col></Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => seteditJewelleryModal(false)} variant="secondary">
            Cancel
          </Button>
          <Button variant="warning" onClick={() => handleSubmitEdit(selectedProduct)}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal
        show={coinModal}
        onHide={handleCloseModal1}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <h4 className='headertext text-center'>Add/Edit Bar/Coins:</h4>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Check
                inline
                label="Bar"
                name="metal"
                value="bar"
                onChange={() => handleMetalType('bar')}
                type="radio"
                checked={metalType === 'bar' && true}
              />
              <Form.Check
                inline
                label="Coin"
                name="metal"
                value="coin"
                onChange={() => handleMetalType('coin')}
                type="radio"
                checked={metalType === 'coin' && true}
              />
            </Col>
            <span className="text-danger">{physicalBarCoinGoldFormError?.metal}</span>

          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder="Enter Name"
                  size="sm"
                  name='name'
                  onChange={handleChangeBarCoin}
                  autoComplete='off'
                  className='mb-3'
                // value={}
                />
                <span className="text-danger">{physicalBarCoinGoldFormError?.name}</span>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Purity</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder="Enter Purity"
                  size="sm"
                  name='purity'
                  onChange={handleChangeBarCoin}
                  autoComplete='off'
                  className='mb-3'
                />
                <span className="text-danger">{physicalBarCoinGoldFormError?.purity}</span>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Weight</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder="Enter Weight"
                  size="sm"
                  name='weight'
                  onChange={handleChangeBarCoin}
                  autoComplete='off'
                  className='mb-3'
                />
                <span className="text-danger">{physicalBarCoinGoldFormError?.weight}</span>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Enter Model</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder="Enter Model"
                  size="sm"
                  name='model'
                  onChange={handleChangeBarCoin}
                  autoComplete='off'
                  className='mb-3'
                />
                <span className="text-danger">{physicalBarCoinGoldFormError?.model}</span>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Select Store</Form.Label>
                <div className="leftedge d-flex justify-content-space">
                  <Form.Select
                    aria-label="Default select example"
                    size={"sm"}
                    className="selectsizesmall"
                    onChange={handleStoreChangeBar}
                  >
                    {/* <option >Select Store</option> */}
                    {
                      localStorage.getItem('userDetails') && JSON.parse(localStorage.getItem('userDetails')).data?.shops?.map(shop => (
                        <option name="shops" value={shop._id}>{shop.name}</option>
                      ))
                    }
                  </Form.Select>
                </div>
                <span className="text-danger">{physicalBarCoinGoldFormError?.shops}</span>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Enter Packaging</Form.Label>
                <Form.Control
                  maxLength={50}
                  type="text"
                  placeholder="Enter Packaging"
                  size="sm"
                  name='packaging'
                  onChange={handleChangeBarCoin}
                  autoComplete='off'
                  className='mb-3'
                />
                <span className="text-danger">{ }</span>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Select Payment Option</Form.Label>
                <div className="leftedge d-flex justify-content-space">
                  <Form.Select
                    aria-label="Default select Payment"
                    size={"sm"}
                    className="selectsizesmall"
                    name="paymentOption"
                    onChange={handlePaymentChangeBar}
                  >
                    {/* <option >Select Payment Option</option> */}
                    <option value="offline">Offline</option>
                    <option value="online">Online</option>
                  </Form.Select>
                </div>
                <span className="text-danger">{physicalBarCoinGoldFormError?.paymentOption}</span>
              </Form.Group>
            </Col>
            {/* </Row>
          <Row> */}
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Add Product Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Admin Image"
                  className="mb-3"
                  name="image"
                  onChange={(e) => setImgBar(e.target.files[0])}
                  autoComplete="off"
                />
                <span className="text-danger">{physicalBarCoinGoldFormError?.image}</span>

              </Form.Group>
            </Col>
          </Row>
          {/* <Row>
            <Col md={6}>
              <Button variant="warning">Update</Button>
            </Col>
          </Row> */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal1} variant="secondary">
            Cancel
          </Button>
          <Button variant="warning" onClick={() => { handleSubmitBarCoin() }}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ManagePhysicalGold