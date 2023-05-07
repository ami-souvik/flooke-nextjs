import { useSelector, useDispatch } from "react-redux";
import { Alert, Typography } from "@mui/material"
import { setAlert } from "../../store/slice/uiSlice";

export const AlertUI = () => {
  const alert = useSelector(state => state.ui.alert);
  const dispatch = useDispatch();
  if(alert)
    return <Alert
      variant="filled"
      severity={alert.status}
      sx={{
        position: "absolute",
        top: "0px",
        margin: "12px",
        zIndex: 1301
      }}
      onClick={() => dispatch(setAlert(null))}
    >
      <Typography fontFamily="DM Sans">{alert.message}</Typography>
    </Alert>
}