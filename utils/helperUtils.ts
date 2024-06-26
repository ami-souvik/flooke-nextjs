import { WRAPPER_BASE_URL } from "./constantUtils";

export const getTodayFormatted = () => {
  const today = new Date();
  return `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`
}

export const getDatestamp = () => {
  // 2023|04|02
  var today = new Date
  var month
  if(today.getMonth() + 1 < 10) {
    month = `0${today.getMonth() + 1}`
  }
  var date
  if(today.getDate() < 10) {
    date = `0${today.getDate()}`
  }
  else {
    date = `${today.getDate()}`
  }
  return `${today.getFullYear()}|${month}|${date}`
}

export const navigate = (path) => {
  parent.window.postMessage({
    method: "navigate",
    content: path
  }, WRAPPER_BASE_URL);
}

export const formatDate = (v) => Number(v) > 9 ? `${v}` : `0${v}`

export const getUTCDateLimit = () => {
  const from = new Date();
  return {
    "from-date": `${from.getFullYear()}-${
      formatDate(from.getMonth()+1)}-${
      formatDate(from.getDate())}T00:00:00.000Z`,
    "to-date": `${from.getUTCFullYear()}-${
      formatDate(from.getMonth()+1)}-${
      formatDate(from.getDate())}T23:59:59.999Z`
  }
}

export const convertUTCtoLocalDate = (utcString: string): string => {
  return new Date(utcString).toString().substring(0, 24);
}