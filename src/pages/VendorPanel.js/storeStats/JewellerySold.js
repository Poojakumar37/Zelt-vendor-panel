import React, { useEffect, useState } from 'react';
import SideBar from '../../dashboard/SideBar';
import FirstNavbar from '../../dashboard/FirstNavbar';
import { Card, Table } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import JewelleryDetail from './JewelleryDetail';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const image = require('../../../assets/imagesCustomer/image.png');

function JewellerySold({statss ,history}) {
    const [stats, setStats] = useState([]);
    const [shopId] = useState(localStorage.getItem('shopId'));
    const navigate = useNavigate();

    useEffect(() => {
        const getStats = async () => {
            try {
                const response = await axios.get(`https://zelt-product.moshimoshi.cloud/product/stats?shopId=${shopId}`, {
                    headers: { "x-access-Token": localStorage.getItem("accessToken") }
                });
                console.log("getShopStats ===>", response.data.data[0].products);
                setStats(response.data.data[0].products);
                console.log(response.data.data[0].products[0].users)
                
            } catch (error) {
                console.log('error ==>', error);
            }
        };
        getStats();
    }, [shopId]);
    // const history = useHistory();

    // const history = useHistory();
    // console.log(stats.users,"ZT VD 81ZT VD 81")

    const handleRowClick = (statsData) => {
      // Navigate to the next component and pass the data as props
      history.push('/JewelleryDetail', { data: statsData });
    };
    return (
        <div>
            <div className="sidebar">
                <SideBar />
            </div>
            <div className="content">
                <div className="container">
                    <FirstNavbar />
                    <h3 className='headertext'>Jewellery Sold</h3>
                    <div>
                        <Card className='p-2'>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>Image</th>
                                        <th>Amount</th>
                                        {/* <th>Qty</th> */}
                                        <th>Metal</th>
                                        <th>View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.map((p, i) => (
                                    
                                        <tr key={i} className='cursor fa-mouse-pointer'>
                                            
                                            <td>{i + 1}</td>
                                            <td>{p?.title}</td>
                                            <td>    
                                                <img
                                                    src={p?.image[0]}
                                                    alt={p?.title}
                                                    width={100}
                                                    height={50}
                                                    />
                                            </td>
                                            <td>{p?.price}</td>
                                            {/* <td>{p?.qty}</td> */}
                                            <td>{p?.metal}</td>
                                      
                                            <td> <Link   to='/JewelleryDetail' state={{ data: p }} >
                                            <FontAwesomeIcon
                                                      
                                                        icon={faEye} className="editIcon"
                                                    />
                                                </Link> </td>
                                           
                                        </tr>
                                            
                                    ))}
                                </tbody>
                            </Table>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JewellerySold;
