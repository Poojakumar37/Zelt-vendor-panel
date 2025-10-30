import React, { useEffect, useMemo, useState } from "react";
import SideBar from "../../dashboard/SideBar";
import FirstNavbar from "../../dashboard/FirstNavbar";
import { Card, Row, Col, Button, Table, Form } from "react-bootstrap";
import Plot from "react-plotly.js";
import axios from "axios";
import Stats from "../storeStats/Stats";
import moment from "moment";
import { BaseURL } from "../../../URL";



function VendorDashboard() {
  const [activeView, setActiveView] = useState("dashboard");
  const [ShopList, setShopList] = useState([])
  const [selectedShop, setselectedShop] = useState()
  const [InvestmentData, setInvestmentData] = useState([])
  const [liveRate, setLiveRate] = useState(5000);
  const [CustomerList, setCustomerList] = useState([]);
  const [Wallete, setWallete] = useState(0)
  const [DayWallete, setDayWallete] = useState(0)
  const [DayWalletegold, setDayWalletegold] = useState(0)
  const [vendorDetails] = useState(
    JSON.parse(localStorage.getItem("vendorDetails"))
  );

  useEffect(() => {
    if (ShopList?.length > 0) {
      setselectedShop(ShopList[0]?._id)
    }
  }, [ShopList])



  const getShopList = async () => {
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
        setShopList(response?.data?.Stores?.filter((item) => item?.deleted === false && item?.VendorID?._id == vendorDetails?._id));
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleDashboardClick = () => {
    setActiveView("dashboard");
  };

  const handleStatsClick = () => {
    setActiveView("statistics");
  };


  const investData = () => {
    axios.get(`${BaseURL}/user/getSchemeOrderStoresID/${selectedShop}`, {
      headers: {
        "x-access-token": localStorage.getItem("accessToken"),
      }
    }).then((response) => {
      if (response.status === 200) {
        console.log("API Response:", response.data.SchemeOrder);  // Check the API data
        setInvestmentData(response.data.SchemeOrder);
      } else {
        console.error("Error fetching data:", response);
        setInvestmentData([]);  // Ensure state updates
      }
    }).catch((error) => {
      console.error("Axios Error:", error);
      setInvestmentData([]);
    });
  };


  useEffect(() => {
    if (selectedShop) {
      investData()
      getWallete()
    }
  }, [selectedShop])

  useEffect(() => {
    getShopList()
  }, []);



  const todayInvestmentStats = useMemo(() => {
    if (!InvestmentData?.length) {
      return {
        totalAmount: 0,
        totalGold: 0,
      };
    }

    const todayFormatted = moment().format("DD-MM-YYYY");

    return InvestmentData.reduce(
      (totals, item) => {
        if (!item?.Investment?.length) return totals;

        const todayInvestments = item.Investment.filter(investment => {
          if (!investment?.InvestmentDate) return false;
          return moment(investment.InvestmentDate).format("DD-MM-YYYY") === todayFormatted;
        });

        todayInvestments.forEach(investment => {
          const amount = investment?.Amount || 0;
          const rate = investment?.GoldRateondate || 0;
          const gold = rate > 0 ? amount / rate : 0;

          totals.totalAmount += amount;
          totals.totalGold += gold;
        });

        return totals;
      },
      { totalAmount: 0, totalGold: 0 }
    );
  }, [InvestmentData]);



  useEffect(() => {
    if (InvestmentData) {
      setCustomerList(removeDuplicateUsers())
    }
  }, [InvestmentData])

  const removeDuplicateUsers = () => {
    const uniqueUsersMap = new Map();
    InvestmentData.forEach((item) => {
      const userID = item?.UserID?._id;
      if (!uniqueUsersMap.has(userID)) {
        uniqueUsersMap.set(userID, item);
      }
    });
    return Array.from(uniqueUsersMap.values());
  };



  const getWallete = async () => {
    axios
      .get(`${BaseURL}/user/Wallete/StoresWallete/${selectedShop}`, {
        headers: {
          "x-access-token": localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const walletAmount = response.data.Wallete?.reduce((a, b) => a + b.Amount, 0)
          const formattedAmount = walletAmount.toLocaleString('en-IN');
          const DayData = response.data.Wallete?.filter((item) => item?.date === moment().format("DD-MM-YYYY"))
          const walletAmountDay = DayData?.reduce((a, b) => a + b.Amount, 0)
          const formattedAmount1 = walletAmountDay.toLocaleString('en-IN');
          const walletGoldDay = DayData?.reduce((a, b) => a + (b.Amount / b.goldRate), 0)
          setWallete(formattedAmount);
          setDayWallete(formattedAmount1)
          setDayWalletegold(walletGoldDay)
        } else {
          console.error("Error fetching data:", response);
          setWallete(0);
          setDayWallete(0)
          setDayWalletegold(0)
        }
      })
      .catch((error) => {
        console.error("Axios Error:", error);
        setWallete(0);
        setDayWallete(0)
        setDayWalletegold(0)
      });
  };





  // console.log("Total Investment Amount Today:", totalInvestmentAmountToday);

  console.log("InvestmentData", InvestmentData);
  // console.log("selectedShop", selectedShop);
  // console.log("ShopList", ShopList);

  return (
    <div>
      <div class="sidebar">
        <SideBar />
      </div>
      <div class="content">

        <div className="container">
          <div className="d-flex mt-4 justify-content-between">
            <div>
              <Button
                variant={activeView === "dashboard" ? "success" : "secondary"}
                onClick={handleDashboardClick}
                className={`${activeView === "dashboard" ? "bg-success" : "bg-secondary"
                  } text-White mt-2`}>
                Dashboard
              </Button>{" "}
              <Button variant={activeView === "statistics" ? "bg-success" : "primary"}
                onClick={handleStatsClick}
                className={`${activeView === "statistics" ? "bg-success" : "bg-secondary"
                  } text-white mt-2`}
              >
                Statistics
              </Button>
            </div>

            <div className="">
              <FirstNavbar />
            </div>
          </div>

          {/* Create buttons to switch between views */}

          <>
            {activeView === "dashboard" ? (
              <>
                <h3 className="headertext fw-bold mt-4">Dashboard</h3>
                <div>
                  <Card className="p-2">
                    {/* <h3 className="headertext">{userDetails.name}</h3> */}
                    <div>
                      {/* <h6 className="text ">Live Rate</h6> */}
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        {/* <p>{liveRate}</p> */}
                        <Form.Select
                          aria-label="Default select example"
                          size={"sm"}
                          className="selectsizesmall w-25 m-auto"
                          onChange={(e) => setselectedShop(e.target.value)}
                          defaultValue={localStorage.getItem("shopId")} // Set the default value here
                        >
                          {ShopList?.map((shop) => (
                            <option key={shop._id} value={shop._id}>
                              {shop.name}
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                    </div>
                    <hr />
                    <Card className="p-2">
                      <h3 className="text1">Statistics</h3>
                      <Row>
                        <Col md={3} className=" ">
                          <Card className="p-2 background">
                            <h3 style={{ textAlign: "center" }}>Schemes Sold</h3>
                            <h6 style={{ textAlign: "center" }}>Total</h6>
                            {/* <div
                              style={{
                                borderRadius: 50,
                                height: 100,
                                width: 100,
                                // border: "3px solid #BE783B",
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                              }}
                            > */}
                            <h5 style={{ textAlign: "center" }}>
                              {InvestmentData?.length > 0
                                ? InvestmentData?.length
                                : 0}
                            </h5>
                            {/* </div> */}
                          </Card>
                        </Col>
                        <Col md={4} className=" ">
                          <Card className="p-2 background">
                            <h3 style={{ textAlign: "center" }}>Total Amount</h3>
                            <h6 style={{ textAlign: "center" }}>{moment().format("DD-MM-YYYY")}</h6>
                            {/* <div
                              style={{
                                borderRadius: 50,
                                height: 100,
                                width: 100,
                                // border: "3px solid #BE783B",
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                              }}
                            > */}
                            {/* Brochure Requests Count: {dashboardData.brochureReqs.length} */}
                            <h5 style={{ textAlign: "center" }}>
                              {todayInvestmentStats?.totalAmount?.toLocaleString('en-IN')} /-
                            </h5>
                            {/* </div> */}
                          </Card>
                        </Col>
                        <Col md={4} className=" ">
                          <Card className="p-2 background">
                            <h3 style={{ textAlign: "center" }}>Total Gold</h3>
                            <h6 style={{ textAlign: "center" }}>{moment().format("DD-MM-YYYY")}</h6>
                            {/* <div
                              style={{
                                borderRadius: 50,
                                height: 100,
                                width: 100,
                                // border: "3px solid #BE783B",
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                              }}
                            > */}
                            {/* Brochure Requests Count: {dashboardData.brochureReqs.length} */}
                            <h5 style={{ textAlign: "center" }}>
                              {(todayInvestmentStats?.totalGold)?.toFixed(3)}/gm
                            </h5>
                            {/* </div> */}
                          </Card>
                        </Col>
                      </Row>

                      <Row className="mt-2">
                        <Col md={3} className=" ">
                          <Card className="p-2 background">
                            <h3 style={{ textAlign: "center" }}>Wallet</h3>
                            <h6 style={{ textAlign: "center" }}>Total Amount</h6>
                            {/* <div
                              style={{
                                borderRadius: 50,
                                height: 100,
                                width: 100,
                                // border: "3px solid #BE783B",
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                              }}
                            > */}
                            <h5 style={{ textAlign: "center" }}>
                              {Wallete} /-
                            </h5>
                            {/* </div> */}
                          </Card>
                        </Col>
                        <Col md={4} className=" ">
                          <Card className="p-2 background">
                            <h3 style={{ textAlign: "center" }}>Total Amount</h3>
                            <h6 style={{ textAlign: "center" }}>{moment().format("DD-MM-YYYY")}</h6>
                            {/* <div
                              style={{
                                borderRadius: 50,
                                height: 100,
                                width: 100,
                                // border: "3px solid #BE783B",
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                              }}
                            > */}
                            {/* Brochure Requests Count: {dashboardData.brochureReqs.length} */}
                            <h5 style={{ textAlign: "center" }}>
                              {DayWallete} /-
                            </h5>
                            {/* </div> */}
                          </Card>
                        </Col>
                        <Col md={4} className=" ">
                          <Card className="p-2 background">
                            <h3 style={{ textAlign: "center" }}>Total Gold</h3>
                            <h6 style={{ textAlign: "center" }}>{moment().format("DD-MM-YYYY")}</h6>
                            {/* <div
                              style={{
                                borderRadius: 50,
                                height: 100,
                                width: 100,
                                // border: "3px solid #BE783B",
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                              }}
                            > */}
                            {/* Brochure Requests Count: {dashboardData.brochureReqs.length} */}
                            <h5 style={{ textAlign: "center" }}>
                              {DayWalletegold?.toFixed(3)}/gm
                            </h5>
                            {/* </div> */}
                          </Card>
                        </Col>
                      </Row>
                      <hr />
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h3 className="text1">Customers</h3>
                        <button style={{ background: "transparent", border: "none" }} onClick={() => window.location.assign("CustomersList")}>
                          <h6 className="text1">View All</h6>
                        </button>
                      </div>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Customer Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {CustomerList?.length > 0 &&
                            CustomerList?.slice(0, 5)?.map((user, i) => (
                              <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{user?.UserID?.name}</td>
                                <td>{user?.UserID?.phone}</td>
                                <td>{user?.UserID?.email}</td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </Card>
                  </Card>
                </div>
              </>

            ) : (
              <>
                {/* <h3 className="headertext">statistics</h3> */}
                <Stats />
              </>
            )}
          </>

        </div>
      </div>
    </div>
  );
}

export default VendorDashboard;