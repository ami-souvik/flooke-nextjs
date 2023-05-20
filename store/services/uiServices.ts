import { setAlert } from "../slice/uiSlice"
import store from "../index";

export const setAlertWithoutDelay = (alert) => {
  store.dispatch(setAlert(alert))
}

export const setAlertWithDelay = (alert) => {
  store.dispatch(setAlert(alert))
  setTimeout(() => {
    store.dispatch(setAlert(null))
  }, 3000);
}