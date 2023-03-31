import { useState } from "react";
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import Pieces from "./card/pieces"
import Picker from "./picker";

const Editor = ({ title, data }) => {
  const [category, setCategory] = useState(null);
  const [item, setItem] = useState(null);
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
      {/* <Preview
        data={orderDetails}
        setCount={setCount}
        setItem={setItem}
        setCategory={setCategory}
      /> */}
      {/* <h1>{category}</h1>
      <h1>{item}</h1> */}
      {/* <Counter count={count} setCount={setCount} /> */}
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
      <IconButton
        aria-label="upload"
        // onClick={() => setOpenEd(!openEd)}
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