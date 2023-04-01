import { useState, useContext, useEffect } from "react";
import { TextField, IconButton } from "@mui/material";
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import { getDatabase, ref, set } from "firebase/database"
import { FirebaseRealtimeDB } from "../context/context";
import Pieces from "./card/pieces"
import Picker from "./picker"
import Counter from "./counter"
import Preview from "./preview"

const Editor = ({ title, active }) => {
  const { edibles, orders } = useContext(FirebaseRealtimeDB);
  
  const [details, setDetails] = useState(
    active && orders[active] && orders[active].orderDetails ? orders[active].orderDetails : {}
  );
  const [table, setTable] = useState(active);
  const [category, setCategory] = useState(null);
  const [item, setItem] = useState(null);
  const [comment, setComment] = useState(null);
  const [number, setNumber] = useState(null);
  const [count, setCount] = useState(null);
  const updateOrder = () => {
    const cloneOrder = {...details}
    if(!cloneOrder[category])
      cloneOrder[category] = {}
    cloneOrder[category][item] = edibles[category][item]
    cloneOrder[category][item].count = count
    cloneOrder[category][item].comment = comment
    setDetails(cloneOrder)
  }
  const uploadOrder = () => {
    set(ref(getDatabase(), '/collections/sandbox1/freeData/activeOrders/' + table), {
      orderDetails: details,
      cooked: false,
      elapsedMillis: new Date().getTime(),
      served: false,
      phnumber: number
    });
  }
  useEffect(() => {
    setDetails(table && orders[table] && orders[table].orderDetails ? orders[table].orderDetails : {});
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