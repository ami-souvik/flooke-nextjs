import { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import Pieces from "./card/pieces"
import Picker from "./picker"
import Counter from "./counter";
import Preview from "./preview"

const Editor = ({ title, data }) => {
  const [details, setDetails] = useState({});
  const [table, setTable] = useState(null);
  const [category, setCategory] = useState(null);
  const [item, setItem] = useState(null);
  const [comment, setComment] = useState(null);
  const [count, setCount] = useState(null);
  const updateOrder = () => {
    const cloneOrder = {...details}
    if(!cloneOrder[category])
      cloneOrder[category] = {}
    cloneOrder[category][item] = data[category][item]
    cloneOrder[category][item].count = count
    cloneOrder[category][item].comment = comment
    setDetails(cloneOrder)
  }
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
      <Picker
        label="Choose Category"
        values={data ? Object.keys(data) : []}
        active={category}
        setActive={setCategory}
        width="full"
        size="small"
        polishLabel={{ backgroundColor: "white", paddingRight: "6px" }}
      />
      <Picker
        label="Choose Item"
        values={data && data[category] ? Object.keys(data[category]) : []}
        active={item}
        setActive={setItem}
        disabled={!category}
        width="full"
        size="small"
        polishLabel={{ backgroundColor: "white", paddingRight: "6px" }}
      />
      <Picker
        label="Choose Table"
        values={['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5', 'Table 6']}
        active={table}
        setActive={setTable}
        width="full"
        size="small"
        polishLabel={{ backgroundColor: "white", paddingRight: "6px" }}
      />
      <TextField
        id="outlined-required"
        label="Comment"
        value={comment}
        style={{ fontFamily: 'DM Sans, sans-serif' }}
        onChange={e => setComment(e.target.value)}
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
        // onClick={() => setOpenEd(!openEd)}
        style={{
          backgroundColor: "#ddd"
        }}>
        <KeyboardDoubleArrowUpRoundedIcon fontSize="large"/>
      </IconButton>
    </div>
  </Pieces.Basic>)
}

export default Editor;