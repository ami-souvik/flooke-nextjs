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
        margin: "6px",
        padding: "0 12px",
        borderRadius: "8px",
        opacity: "0.95",
        zIndex: 1301
      }}
      onClick={() => dispatch(setAlert(null))}
    >
      <Typography
        fontFamily="Comme"
        fontSize="0.8rem"
      >{alert.message}</Typography>
    </Alert>
}