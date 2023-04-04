import React, { useState, useContext, useEffect } from "react";
import { TextField, IconButton, Snackbar } from "@mui/material";
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import { getDatabase, ref, set } from "firebase/database"
import { FirebaseRealtimeDB } from "../context/context";
import Pieces from "./card/pieces.jsx"
import Picker from "./picker"
import Counter from "./counter"
import Preview from "./preview"

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
    setDetails(table && orders?[table] && orders[table].orderDetails ? orders[table].orderDetails : {} : {});
  }, [table])
  return (<Pieces.Basic
    polish={{
      position: "fixed",
      left: "0px",
      top: "0px",
      right: "0px",
      bottom: "0px",
      margin: "20px"
    }}>
    <Pieces.Header
      title={title}
      total=""
    />
    <div>
      <Preview
        data={details}
        setCount={setCount}
        setItem={setItem}
        setCategory={setCategory}
      />
      <h3>{number}</h3>
      <Picker
        label="Choose Category"
        values={edibles ? Object.keys(edibles) : []}
        active={category}
        setActive={setCategory}
        width="full"
        size="small"
        polishLabel={{ backgroundColor: "white" }}
      />
      <Picker
        label="Choose Item"
        values={edibles && edibles[category] ? Object.keys(edibles[category]) : []}
        active={item}
        setActive={setItem}
        disabled={!category}
        width="full"
        size="small"
        polishLabel={{ backgroundColor: "white" }}
      />
      <Picker
        label="Choose Table"
        values={['1', '2', '3', '4', '5', '6']}
        active={table}
        setActive={setTable}
        width="full"
        size="small"
        polishLabel={{ backgroundColor: "white" }}
      />
      <TextField
        id="outlined-required"
        label="Comment"
        value={comment}
        style={{ fontFamily: 'DM Sans, sans-serif' }}
        onChange={e => setComment(e.target.value)}
      />
      <TextField
        id="outlined-required"
        label="Phone number"
        value={number}
        style={{ fontFamily: 'DM Sans, sans-serif' }}
        onChange={e => setNumber(e.target.value)}
      />
      <Counter
        count={count}
        setCount={setCount}
      />
      <IconButton
        aria-label="add"
        onClick={updateOrder}
        style={{
          backgroundColor: "#ddd"
        }}>
        <KeyboardArrowUpRoundedIcon fontSize="large"/>
      </IconButton>
      <IconButton
        aria-label="upload"
        onClick={uploadOrder}
        style={{
          backgroundColor: "#ddd"
        }}>
        <KeyboardDoubleArrowUpRoundedIcon fontSize="large"/>
      </IconButton>
    </div>
  </Pieces.Basic>)
}

export default Editor;