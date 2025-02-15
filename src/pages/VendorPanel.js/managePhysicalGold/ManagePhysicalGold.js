import React, { useEffect, useState } from 'react'
import SideBar from '../../dashboard/SideBar'
import FirstNavbar from '../../dashboard/FirstNavbar'
import { Card, Row, Col, Figure, Table, Button, Modal, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'
import { toast } from "react-toastify";
import AuthServices from '../../authServices/AuthServices'

// const image = require('../../../assets/imagesCustomer/image.png');

function ManagePhysicalGold() {
  const [jewelleryModal, setJewelleryModal] = useState(false)
  const [coinModal, setCoinModal] = useState(false)
  const [img, setImg] = useState("");
  const [imgBar, setImgBar] = useState("");
  const [shopDetails, setShopDetails] = useState('');
  const [video, setVideo] = useState("");
  const [selection, setSelection] = useState('1')
  const [productList, setProductList] = useState([])
  const [availability, setAvailability] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState()
  const [checkedMetal, setCheckedMetal] = useState(selectedProduct?.metal);
  const [metalType, setMetaltype] = useState()
  const [physicalGoldForm, setPhysicalGoldForm] = useState({
    name: selectedProduct?.name,
    purity: selectedProduct?.purity,
    type: '',
    price: '',
    weight: selectedProduct?.weight,
    shops: selectedProduct?.shops,
    paymentOption: selectedProduct?.paymentOption,
    // image: '',
  })

  const [physicalGoldFormErrors, setPhysicalGoldFormErrors] = React.useState({
    metal: '',
    name: '',
    purity: '',
    availability: '',
    type: '',
    price: '',
    weight: '',
    shops: '',
    paymentOption: '',
    image: '',
    video: ''
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
      [e.target.purity]: e.target.value,
      [e.target.type]: e.target.value,
      [e.target.price]: e.target.value,
      [e.target.weight]: e.target.value,
      [e.target.shops]: e.target.value,
      [e.target.paymentOption]: e.target.value,
    });

    setPhysicalGoldFormErrors({
      ...physicalGoldFormErrors,
      [e.target.name]: null,
      [e.target.metal]: null,
      [e.target.purity]: null,
      [e.target.type]: null,
      [e.target.price]: null,
      [e.target.weight]: null,
    });
  };
  useEffect(() => {
    getVendorData();
  }, [])

  const getVendorData = async () => {
    const data1 = await localStorage.getItem('vendorData')
    console.log('data1', JSON.parse(data1));
    setProductList(JSON.parse(data1)?.products)
    // console.log(data1,"vendorProductsvendorProductsvendorProducts")
  }

  const handleStoreChange = (e) => {
    setPhysicalGoldForm({ ...physicalGoldForm, shops: e.target.value })
  }

  const handlePaymentChange = (e) => {
    setPhysicalGoldForm({ ...physicalGoldForm, paymentOption: e.target.value })
  }

  const handleClickMetal = (value) => {
    console.log('handleClickMetal ee', value);
    setCheckedMetal(value)
    // setPhysicalGoldForm({
    //   ...physicalGoldForm, metal: value
    // })
  }

  const handleValidation = () => {
    const { name, purity, weight, shops, paymentOption } = physicalGoldForm
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
    }
    if (!img) {
      newErrors.image = 'please select image'
    }
    return newErrors
  }

  const handleSubmit = async () => {
    const handleValidationObject = handleValidation()
    if (Object.keys(handleValidationObject).length > 0) {
      setPhysicalGoldFormErrors(handleValidationObject)
    } else {

      const formData = new FormData();
      formData.append('metal', checkedMetal)
      formData.append('title', physicalGoldForm?.name)
      formData.append('purity', physicalGoldForm?.purity)
      formData.append('activated', availability)
      formData.append('weight', physicalGoldForm?.weight)
      formData.append('payment', physicalGoldForm?.paymentOption)
      formData.append('shops', JSON.stringify(physicalGoldForm?.shops))
      formData.append('image', img);
      formData.append('video', video);
      console.log(formData, "THIS IS FORM")
      const physicalGold = await AuthServices.postDataProduct(`/product/create`, formData)
      console.log('physicalGold physicalGold', physicalGold);
      if (physicalGold?.error === false) {
        toast.success('Product has successfully created')
        getVendorData()
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
          stoneShape: ''
        })
        setAvailability(false)
        setImg()
        handleCloseModal()
      }

      if (physicalGold?.error === true) {
        getVendorData()
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
    const handleValidationObject = handleValidation()
    if (Object.keys(handleValidationObject).length > 0) {
      setPhysicalGoldFormErrors(handleValidationObject)
    } else {
      const formData = new FormData();
      formData.append('metal', checkedMetal)
      formData.append('title', physicalGoldForm?.name)
      formData.append('purity', physicalGoldForm?.purity)
      formData.append('activated', availability)
      formData.append('weight', physicalGoldForm?.weight)
      formData.append('payment', physicalGoldForm?.paymentOption)
      formData.append('shops', JSON.stringify(physicalGoldForm?.shops))
      formData.append('image', img);
      formData.append('video', video);
      console.log(formData, "THIS IS FORM")
      const physicalGold = await AuthServices.patchDataProduct(`/product/${selectedProduct?._id}`, formData)
      console.log('physicalGold physicalGold', physicalGold);
      if (physicalGold?.error === false) {
        toast.success('Product has successfully Edited')
        getVendorData()
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
          stoneShape: ''
        })
        setAvailability(false)
        setImg()
        setSelectedProduct()
        handleCloseModal()
      }

      if (physicalGold?.error === true) {
        console.log(physicalGold, "error after submit")
        getVendorData()
        toast.show({
          type: 'error',
          text1: `${physicalGold.message}`,
        })
        setSelectedProduct()
        handleCloseModal()
      }
    }
  }

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
    setSelectedProduct(prod)
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
  console.log('img img', img);
  const handleCloseModal1 = () => setCoinModal(false)
  const handleShowModal1 = () => setCoinModal(true)

  const onGoldSelect = (e) => {
    setSelection(e.target.value)
  }

  // useEffect(() => {
  //   const fetchAvailableProducts = async (shopId) => {
  //     const data = await axios.get(`https://zelt-product.moshimoshi.cloud/shop/list/${shopId}`)
  //     console.log('available products', data.data.data)
  //     setShopDetails(data.data.data);
  //   }
  //   fetchAvailableProducts(localStorage.getItem('shopId'));
  // }, [localStorage.getItem('shopId')])

  // localStorage.setItem('shopDetails', JSON.stringify(shopDetails));

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
                    <option value="2">Bar/Coins</option>
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
                      <th>Jewellery Name</th>
                      <th>Jewellery Image</th>
                      {/* <th>Price</th> */}
                      <th>Weight</th>
                      {/* <th>category</th> */}
                      <th>Metal</th>
                      <th>Purity</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList?.map((prod, i) => {
                      return (
                        <tr>
                          <td>{i + 1}</td>
                          <td>{prod?.title}</td>
                          <td>
                            <Figure>
                              <Figure.Image
                                width={100}
                                height={80}
                                // alt="171x180"
                                src={prod?.image[0]}
                              />
                            </Figure>
                          </td>
                          {/* <td>RS. {prod?.price} /-</td> */}
                          <td>{prod?.weight} gms</td>
                          {/* <td>ring</td> */}
                          <td>{prod?.metal}</td>
                          <td>{prod?.purity}</td>
                          <td>
                            <FontAwesomeIcon
                              onClick={() => handleShowModal(prod)}
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
        <h4 className='headertext text-center'>Add/Edit Jewellery Details</h4>
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
                checked={checkedMetal === 'gold' && true}
                onClick={() => handleClickMetal('gold')}
              />
              <Form.Check
                inline
                label="Silver"
                name="metal"
                // value="silver"
                // onChange={handleChange}
                type="radio"
                checked={checkedMetal === 'silver' && true}
                onClick={() => handleClickMetal('silver')}
              />
              <Form.Check
                inline
                label="Platinum"
                name="metal"
                // value="platinum"
                // onChange={handleChange}
                type="radio"
                checked={checkedMetal === 'platinum' && true}
                onClick={() => handleClickMetal('platinum')}
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
                <Form.Label>Purity(K)</Form.Label>
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
                />
                <span className="text-danger">{physicalGoldFormErrors?.purity}</span>
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
                <Form.Label>Select Store</Form.Label>
                <div className="leftedge d-flex justify-content-space">
                  <Form.Select
                    aria-label="Default select example"
                    size={"sm"}
                    className="selectsizesmall"
                    onChange={handleStoreChange}
                  >
                    {/* <option >Select Store</option> */}
                    {
                      localStorage.getItem('userDetails') && JSON.parse(localStorage.getItem('userDetails')).data?.shops?.map(shop => (
                        <option name="shops" value={shop._id}>{shop.name}</option>
                      ))
                    }
                  </Form.Select>
                </div>
                <span className="text-danger">{physicalGoldFormErrors?.shops}</span>
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
                  placeholder="Product Image"
                  className="mb-3"
                  name="image"
                  onChange={(e) => setImg(e.target.files[0])}
                  autoComplete="off"
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
                />
                <span className="text-danger">{physicalGoldFormErrors?.video}</span>
              </Form.Group>
            </Col>
          </Row>
          {/* <Row>
            <Col md={6}>
              <Button variant="warning">Update Video</Button>
            </Col>
          </Row> */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal} variant="secondary">
            Cancel
          </Button>
          <Button variant="warning" onClick={() => { selectedProduct?._id ? handleSubmitEdit() : handleSubmit() }}>
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
    </div >
  )
}

export default ManagePhysicalGold