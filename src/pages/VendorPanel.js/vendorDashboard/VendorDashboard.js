
import React from 'react'
import SideBar from '../../dashboard/SideBar'
import FirstNavbar from '../../dashboard/FirstNavbar'
import { Card, Row, Col, Button, Table } from 'react-bootstrap'
import Plot from 'react-plotly.js'

function VendorDashboard() {
    return (
        <div>
            <div class="sidebar">
                <SideBar />
            </div>
            <div class="content">
                <div className="container">
                    <FirstNavbar />
                    <h3 className='headertext'>Dashboard</h3>
                    <div>
                        <Card className='p-2'>
                            <h3 className='headertext'>PNG Jewellers</h3>
                            <div>
                                <h6 className='text'>Live Rate</h6>
                                <Button>Rs 5900 /- /gm</Button>
                            </div>
                            <hr />
                            <Card className='p-2'>
                                <h3 className='text1'>Statistics</h3>
                                <Row>
                                    <Col md={3} className=''>
                                        <Card className='p-2 background'>
                                            <div className='centerAlign'>
                                                <h3>Jewellery Sold</h3>
                                                <div style={{ borderRadius: 50, height: 100, width: 100, border: '3px solid #BE783B', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                                    <h1 style={{}}>
                                                        20
                                                    </h1>
                                                </div>
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col md={3} className=' '>
                                        <Card className='p-2 background'>
                                            <h3>Schemes Sold</h3>
                                            <div style={{ borderRadius: 50, height: 100, width: 100, border: '3px solid #BE783B', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                                <h1 style={{}}>
                                                    20
                                                </h1>
                                            </div>
                                        </Card>
                                    </Col>
                                </Row>
                                <hr />
                                <h3 className='text1'>Customers</h3>
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
                                        <tr>
                                            <td>1</td>
                                            <td>Manu</td>
                                            <td>9878976098</td>
                                            <td>manu@gmail.com</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Manu</td>
                                            <td>9878976098</td>
                                            <td>manu@gmail.com</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Manu</td>
                                            <td>9878976098</td>
                                            <td>manu@gmail.com</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card>
                        </Card>
                    </div>
                </div>
            </div>


            {/* <div className="row my-2">
              <div className="col-md-2">
                <h3>
                  <b>Dashboard</b>
                </h3>
              </div>
              </div> */}
            {/* <h1></h1> */}
        </div>
    )
}

export default VendorDashboard