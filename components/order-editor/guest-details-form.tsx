import { useState } from "react"
import { Box, InputBase, Typography, IconButton } from "@mui/material"
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { DialogCase } from "../overlays/dialog-case";
import CloseButton from "../ui-components/close-button";
import FigureClick from "../form-components/figure-click";
import { addGuestDetails } from "../../utils/web/apis/guestDetailsApis";
import { setAlertWithDelay } from "../../store/services/uiServices";

const GuestDetailsForm = ({ data, handleClose }) => {
  const [name, setName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [isWhatsapp, setIsWhatsapp] = useState(false);
  const _addGuestDetails = async () => {
    const res = await addGuestDetails({
      name,
      "phone-number": phoneNumber,
      "is-whatsapp": isWhatsapp
    })
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
    }
  }
  const setValue = (setFunc) => (event) => {
    setFunc(event.target.value);
  }
  return (
    <DialogCase
      open={!!data}
      setOpen={() => handleClose()}>
      <Box
        display="flex"
        justifyContent="flex-end">
        <CloseButton handleClose={handleClose} />
      </Box>
      <InputBase
        value={name}
        placeholder="Guest name"
        onChange={setValue(setName)}
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
        value={phoneNumber}
        placeholder="Guest phone number"
        onChange={setValue(setPhoneNumber)}
        sx={{
          margin: "4px 0px",
          width: "100%",
          borderBottom: "1px solid var(--red-hard-500)",
          fontFamily: "Comme, sans-serif",
          fontSize: "0.8rem",
          textAlign: "right"
        }}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-end">
        <Box
          display="flex"
          alignItems="flex-end"
          onClick={() => setIsWhatsapp(!isWhatsapp)}>
          <IconButton>
            {isWhatsapp ? (
              <CheckBoxIcon htmlColor="var(--primary-deepBlue)" />
            ) : (
              <CheckBoxOutlineBlankIcon />
            )}
          </IconButton>
          <Typography
            fontSize="0.8rem"
            marginBottom="8px"
          >is whatsapp?</Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="flex-end">
          <FigureClick
            Icon={(props) => <SaveRoundedIcon fontSize="small" {...props} />}
            padding="12px"
            clickWork={_addGuestDetails}
          />
        </Box>
      </Box>
    </DialogCase>
  )
}

export default GuestDetailsForm;