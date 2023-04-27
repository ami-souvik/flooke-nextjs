import React, { useState, useContext, useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { getDatabase, ref, set } from "firebase/database"
import { FirebaseRealtimeDB } from "../context/context";
import Header from "./header";
import Pieces from "./card/pieces.jsx"
import Preview from "./preview"
import AddUploadButtonSet from "./form-components/addUploadButtonSet";
import { DoublePicker } from "./form-components/pickers";
import { Picker } from "./form-components/pickers";

const Editor = ({ title, active }) => {
  const { edibles, orders } = useContext(FirebaseRealtimeDB);
  const [details, setDetails] = useState(
    active && orders?[active] && orders[active]?.orderDetails ? orders[active].orderDetails : {} : {}
  );
  const [table, setTable] = useState(active);
  const [category, setCategory] = useState(null);
  const [item, setItem] = useState(null);
  const [comment, setComment] = useState(null);
  const [number, setNumber] = useState(null);
  const [count, setCount] = useState(0);
  const updateOrder = () => {
    if(!category || !item) {
      alert('Please select an item to add');
      return
    }
    else if(!count || Number(count) === 0) {
      alert('Please provide the item count');
      return
    }
    else if(!table) {
      alert('Please provide the table number');
      return
    }
    const cloneOrder = {...details}
    if(!cloneOrder[category])
      cloneOrder[category] = {}
    if(!cloneOrder[category][item])
      cloneOrder[category][item] = {}
    cloneOrder[category][item].unit = edibles[category][item].sellingCost
    cloneOrder[category][item].count = count
    cloneOrder[category][item].price =
     Number(count) * Number(edibles[category][item].sellingCost)
    cloneOrder[category][item].comment = comment
    cloneOrder[category][item].cooked = false
    cloneOrder[category][item].served = false
    cloneOrder[category][item].elapsedMillis = new Date().getTime()
    cloneOrder[category][item].timestring = new Date().toLocaleTimeString()
    setDetails(cloneOrder)
  }
  const uploadOrder = () => {
    var tableSum = 0
    Object.keys(details).forEach(cat => {
      Object.keys(details[cat]).forEach(item => {
        tableSum += Number(details[cat][item].price)
      })
    })
    set(ref(getDatabase(), '/collections/sandbox1/freeData/activeOrders/' + table), {
      orderDetails: details,
      orderComputation: {
        orderTotal: tableSum,
        billingAmount: tableSum
      },
      phnumber: number
    });
  }
  useEffect(() => {
    setDetails(table && orders?[table] && orders[table]?.orderDetails ? orders[table].orderDetails : {} : {});
  }, [table])
  return (<Box
    sx={{
      position: "fixed",
      left: "0px",
      top: "0px",
      right: "0px",
      bottom: "0px",
      padding: "16px",
      backgroundColor: "white"
    }}>
    <Header label="Order Editor"/>
    <Typography
      color="black"
      fontSize="2rem"
      fontFamily="alpha beta"
    >Table {table}</Typography>
    <Preview
      data={details}
      setCount={setCount}
      setItem={setItem}
      setCategory={setCategory}
    />
    <h3>{number}</h3>
    <DoublePicker />
    <TextField
      label="Item instruction..."
      value={comment}
      sx={{
        width: "100%",
        fontFamily: "alpha beta",
      }}
      fontFamily="alpha beta"
      style={{
        borderRadius: 0,
        borderStyle: "solid",
        borderWidth: "3px",
        borderBottomWidth: "6px",
        borderColor: "black"
      }}
      onChange={e => setComment(e.target.value)}
    />
    <Picker
      active={table}
      setActive={setTable}
      values={['1', '2', '3', '4', '5', '6']}
    />
  </Box>)
}

export default Editor;