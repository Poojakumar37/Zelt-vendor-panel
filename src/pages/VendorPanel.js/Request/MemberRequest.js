import React from 'react'
import { AgGridReact } from "ag-grid-react";
import { Card, Form, Row, Col, Button, Modal, Figure } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function MemberRequest() {

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
            headerName: "Shop Name",
            // filter: true,
            field: "name",
        },
        {
            headerName: "Phone",
            // filter: true,
            field: "phone",
        },
        // {
        //     headerName: "Date of Request",
        //     // filter: true,
        //     field: "date",
        // },
        {
            headerName: "View Banner",
            // filter: true,
            // field: "view",
            cellRendererFramework: (params) => (
                <center>
                    {/* <div onClick={() => handleShowModal(params?.data)} className="editIcon" icon={faEye}> View Banner </div>{" "} */}
                </center>
            ),
        },
        {
            headerName: "Acccept",
            // filter: true,
            // field: "approve",
            cellRendererFramework: (params) => (
                <center>
                    <div>
                        {/* <Button onClick={() => approveBanner(params?.data)} variant="outline-warning">Acccept</Button> */}
                    </div>
                </center>
            ),
        },
        {
            headerName: "Decline",
            // filter: true,
            // field: "approve",
            cellRendererFramework: (params) => (
                <center>
                    <div>
                        {/* <Button onClick={() => declineBanner(params?.data)} variant="outline-danger">Decline</Button> */}
                    </div>
                </center>
            ),
        },
    ])

    const [rowData, setRowData] = useState([
        // { name: "Hari", shop: "Sri Vinayaka Jewellers", mail: 'hari@gmail.com', date:'22/10/2021' },
        // { name: "Manu", shop: "Sri Vinayaka Jewellers", mail: 'manu@gmail.com', date:'22/10/2021' },
        // { name: "Anu", shop: "Sri Vinayaka Jewellers", mail: 'anu@gmail.com', date:'22/10/2021' }
    ]);


    return (
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
            />
        </div>
    )
}

export default MemberRequest