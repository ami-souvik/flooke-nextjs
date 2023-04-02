import React, { useState, useContext, useEffect } from "react";
import { getDatabase, ref, set } from "firebase/database";
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import PrintDisabledIcon from '@mui/icons-material/PrintDisabled';
import { FirebaseRealtimeDB } from "../context/context";
import Pieces from "./card/pieces.jsx"
import searchAndConnectBt from "../utils/printUtils/searchAndConnectBt"

const BillPreview = ({ table, handleClose }) => {
  const { orders, addToPastOrder, deleteTable } = useContext(FirebaseRealtimeDB);
  const data = orders[table].orderDetails
  var tableSum = 0
  Object.keys(data).map(cat => {
    Object.keys(data[cat]).map(item => {
      tableSum += Number(data[cat][item].price)
    })
  })
  const processOrder = () => {
    addToPastOrder(table)
    set(ref(getDatabase(), '/collections/sandbox1/freeData/activeOrders/' + table), null);
    handleClose();
  }
  return (<Pieces.Basic
    polish={{
      position: "fixed",
      left: "0px",
      top: "0px",
      right: "0px",
      bottom: "0px",
      margin: "20px",
      padding: "20px"
    }}>
      <Button variant="contained" onClick={handleClose} disableElevation>close</Button>
      <div
        style={{
          height: "80%",
          overflowY: "scroll"
        }}>
        {Object.keys(data).map(cat => (
          <List key={cat}>
            {Object.keys(data[cat]).map(item => (
              <ListItem key={item} disablePadding>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    fontSize: "18px",
                    fontFamily: 'DM Sans, sans-serif'
                  }}>
                  <p>{item}</p>
                  <p>{data[cat][item].price}</p>
                </div>
              </ListItem>
            ))}
          </List>
        ))}
      </div>
      <Divider />
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          fontSize: "18px",
          fontFamily: 'DM Sans, sans-serif'
        }}>
        <p>Total</p>
        <p>{tableSum}</p>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between"
        }}>
        <Button
          variant="contained"
          onClick={() => {
            searchAndConnectBt(data)
            processOrder()
          }}
          endIcon={<LocalPrintshopIcon />}
          disableElevation>
          Print
        </Button>
        <Button
          variant="contained"
          onClick={processOrder}
          endIcon={<PrintDisabledIcon />}
          disableElevation>
          Skip Print
        </Button>
      </div>
  </Pieces.Basic>)
}

export default BillPreview;