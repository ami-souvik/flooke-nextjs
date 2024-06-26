import { useEffect, useState } from "react"
import { Box, Drawer, List, ListItem, ListItemButton, Divider, InputBase, Typography } from "@mui/material"
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { DialogCase } from "../overlays/dialog-case";
import { getAllCategories, addItemToCategory, updateItemToCategory } from "../../utils/web/apis/categoryApis";
import CloseButton from "../ui-components/close-button";
import { setAlertWithDelay } from "../../store/services/uiServices";
import FigureClick from "../form-components/figure-click";

const Editor = ({ data, _setEdibles, _deleteItem, handleClose }) => {
  const [isOpen, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(
    data && data["category-name"] ? data["category-name"] : null
  );
  const [itemName, setItemName] = useState(
    data && data.name ? data.name : null
  );
  const [description, setDescription] = useState(
    data && data.description ? data.description : null
  );
  const [serving, setServing] = useState(
    data && data.serving ? data.serving : null
  );
  const [processingCost, setProcessingCost] = useState(
    data && data["processing-cost"] ? data["processing-cost"] : null
  );
  const [sellingCost, setSellingCost] = useState(
    data && data["selling-cost"] ? data["selling-cost"] : null
  );
  const [edibles, setEdibles] = useState([]);
  const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setDrawer(open);
    };
  const setValue = (setFunc) => (event) => {
    setError(null);
    setFunc(event.target.value);
  }
  const _setCategory = async () => {
    setLoading(true);
    const res = await getAllCategories();
    if(res?.data?.mongodb?.content) {
      setLoading(false)
      setEdibles(res.data.mongodb.content);
    }
  }
  const list = () => (
    <Box
      sx={{
        width: 250,
        paddingX: 1,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {edibles?.map(each => (
          <>
            <ListItem key={each._id}>
              <ListItemButton
                onClick={() => setCategory(each.name)}>
                <Typography fontFamily="Montserrat">{each.name}</Typography>
              </ListItemButton>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Box>
  );
  const _addItemToCategory = async () => {
    if(!category
      || !itemName
      || !sellingCost) {
      setError("Please fill out all the required fields")
      return;
    }
    const res = await addItemToCategory({
      "category-name": category,
      name: itemName,
      serving,
      "processing-cost": processingCost,
      "selling-cost": sellingCost
    });
    if(res?.data?.mongodb?.error) {
      setAlertWithDelay({
        status: "error",
        message: res.data.mongodb.error
      });
    }
    else if(res?.data?.mongodb?.status) {
      setAlertWithDelay({
        status: "success",
        message: res.data.mongodb.status
      });
      _setEdibles();
    }
    else {
      setAlertWithDelay({
        status: "error",
        message: "Something went wrong"
      });
    }
  }
  const _saveItemToCategory = async () => {
    if(!category
      || !itemName
      || !sellingCost) {
      setError("Please fill out all the required fields")
      return;
    }
    const res = await updateItemToCategory({
      "category-name": category,
      name: itemName,
      unique: data.unique,
      serving,
      "processing-cost": processingCost,
      "selling-cost": sellingCost
    });
    if(res?.data?.mongodb?.error) {
      setAlertWithDelay({
        status: "error",
        message: res.data.mongodb.error
      });
    }
    else if(res?.data?.mongodb?.status) {
      setAlertWithDelay({
        status: "success",
        message: res.data.mongodb.status
      });
      _setEdibles();
    }
    else {
      setAlertWithDelay({
        status: "error",
        message: "Something went wrong"
      });
    }
  }
  useEffect(() => {
    _setCategory()
  }, [])
  return (
    <DialogCase
      open={!!data}
      setOpen={() => handleClose()}>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer(false)}
        sx={{
          zIndex: 1301
        }}
      >
        {list()}
      </Drawer>
      <Box
        display="flex"
        justifyContent="flex-end">
        <CloseButton handleClose={handleClose} />
      </Box>
      <Box
        margin="4px 0px"
        padding="4px 0px"
        borderBottom="1px solid var(--red-hard-500)"
        onClick={toggleDrawer(true)}>
        <Typography
          fontFamily="Comme, sans-serif"
          fontSize="1rem"
        >{category || "Choose Category"}</Typography>
      </Box>
      <InputBase
        value={itemName}
        placeholder="Item name"
        onChange={setValue(setItemName)}
        sx={{
          margin: "4px 0px",
          width: "100%",
          borderBottom: "1px solid var(--red-hard-500)",
          fontFamily: "Comme, sans-serif",
          fontSize: "0.8rem",
          textAlign: "right"
        }}
      />
      <InputBase
        value={description}
        placeholder="Item description"
        onChange={setValue(setDescription)}
        sx={{
          margin: "4px 0px",
          width: "100%",
          borderBottom: "1px solid var(--gray-hard-500)",
          fontFamily: "Comme, sans-serif",
          fontSize: "0.8rem",
          textAlign: "right"
        }}
      />
      <Box
        display="flex"
        justifyContent="space-between">
        <InputBase
          value={serving}
          placeholder="Servings"
          onChange={setValue(setServing)}
          sx={{
            width: "80px",
            padding: "0px 6px",
            margin: "4px 0px",
            marginRight: "8px",
            border: "1px solid var(--red-hard-500)",
            fontFamily: "Comme, sans-serif",
            fontSize: "1.2rem"
          }}
          inputProps={{
            style: {
              textAlign: "right"
            }
          }}
        />
        <InputBase
          value={processingCost}
          placeholder="Processing Cost"
          onChange={setValue(setProcessingCost)}
          sx={{
            width: "180px",
            padding: "0px 6px",
            margin: "4px 0px",
            marginRight: "8px",
            border: "1px solid var(--red-hard-500)",
            fontFamily: "Comme, sans-serif",
            fontSize: "1.2rem"
          }}
          inputProps={{
            style: {
              textAlign: "right"
            }
          }}
        />
        <InputBase
          value={sellingCost}
          placeholder="Selling Cost"
          onChange={setValue(setSellingCost)}
          sx={{
            width: "180px",
            padding: "0px 6px",
            margin: "4px 0px",
            border: "1px solid var(--red-hard-500)",
            fontFamily: "Comme, sans-serif",
            fontSize: "1.2rem"
          }}
          inputProps={{
            style: {
              textAlign: "right"
            }
          }}
        />
      </Box>
      <Typography
        fontFamily="Comme, sans-serif"
        color="var(--red-hard-500)"
      >{error}</Typography>
      <Box
        display="flex"
        justifyContent="flex-end">
        {
          (data?.unique !== null
          && data?.unique !== undefined) &&
          <FigureClick
            Icon={(props) => <DeleteForeverRoundedIcon fontSize="small" {...props} />}
            padding="12px"
            clickWork={() => _deleteItem(category, itemName, data?.index)}
          />
        }
        <FigureClick
          Icon={(props) => <SaveRoundedIcon fontSize="small" {...props} />}
          padding="12px"
          clickWork={() => {
            (data?.unique !== null
            && data?.unique !== undefined) ?
            _saveItemToCategory() :
            _addItemToCategory()
          }}
        />
      </Box>
    </DialogCase>
  )
}

export default Editor;