import React, { useState, useEffect } from 'react'
import SideBar from '../../dashboard/SideBar'
import FirstNavbar from '../../dashboard/FirstNavbar'
import { Card, Form, Row, Col, Button } from 'react-bootstrap'
import { AgGridReact } from "ag-grid-react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";

// const earRing = require('../../../assets/imagesCustomer/earRing1.png')
// const image = require('../../../assets/imagesCustomer/image18.png')

function Customer() {
    const [selection, setSelection] = useState('1')
    const navigate = useNavigate();

    const onDataSelect = (e) => {
        setSelection(e.target.value)
    }

    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        customerDataList()
    }, []);

    const customerDataList = () => {
        let token = localStorage.getItem('accessToken');
        axios.get("https://zelt-admin-api.moshimoshi.cloud/user/all?type=customer&account=requested", {
            headers: {
                "x-access-token": token
            }
        }).then((response) => {
            console.log(response.data.data, "RESPONSE DATA")
            setRowData(response.data.data)
            if (response.data.error == false) {

            }
        });
    }

    const declineVendor = async (data) => {
        try {
            const payload = {
                _id: data?._id,
                status: 'blocked',
            }
            // const disApproveVendor = await AuthServices.patchAdmin('/user/approveOrBlockVendor', payload)
            // console.log('disApproveVendor', disApproveVendor);
            // if (disApproveVendor?.error === false) {
            //     customerDataList()
            // }
        } catch (e) {
            console.log('error', e);
        }
    }

    const rowHeight = 50;
    const DefaultColumnSetting = {
        sortable: true,
        //   filter: true,

        //   floatingFilter: true,
        flex: 1,
        resizable: true,
        minWidth: 120,
    };

    const [colDefs, setColDefs] = useState([
        {
            headerName: "#",
            valueGetter: "node.rowIndex + 1",
            // filter: true,
            lockPosition: true,
        },
        {
            headerName: "Customer Name",
            // filter: true,
            field: "name",
            cellRendererFramework: (params) => (
                <center>
                    <div onClick={() => navigate('/customerData', { state: params?.data })}>{params?.data?.name}</div>
                </center>
            ),
        },
        {
            headerName: "Phone Number",
            // filter: true,
            field: "phone",
        },
        {
            headerName: "E-mail Id ",
            // filter: true,
            field: "email",
        },
        // {
        //     headerName: "View",
        //     // filter: true,
        //     // field: "view",
        //     cellRendererFramework: (params) => (
        //         <center>
        //             <FontAwesomeIcon onClick={() => navigate('/customerData', { state: params.data})} className="editIcon" icon={faEye}> </FontAwesomeIcon>
        //         </center>
        //     ),
        // },
        {
            headerName: "Block",
            // filter: true,
            // field: "approve",
            cellRendererFramework: (params) => (
                <center>
                    <div>
                        <Button onClick={() => declineVendor(params.data)} variant="outline-danger">Block</Button>
                    </div>
                </center>
            ),
        },
    ])


    return (
        <div>
            <div class="sidebar">
                <SideBar />
            </div>
            <div class="content">
                <div className="container">
                    <FirstNavbar />
                    <h3 className='headertext'>Customer Data</h3>
                    <div
                        className="ag-theme-alpine"
                        style={{ height: "70vh", width: "100%" }}
                    >
                        <AgGridReact
                            rowHeight={rowHeight}
                            // columnDefs={columns}
                            columnDefs={colDefs}
                            defaultColDef={DefaultColumnSetting}
                            pagination={true}
                            paginationPageSize={10}
                            // onGridReady={onGridReady}
                            rowData={rowData}
                        // onRowClicked={(e) => 
                        //     navigate('/customerData?id='+e.data._id)}
                        />
                    </div>
                    {/* <Button variant="warning" onClick={() => navigate('/customerData')}>Next</Button> */}
                </div>
            </div>
        </div>
    )
}

export default Customer