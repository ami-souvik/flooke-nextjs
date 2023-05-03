import { FRONTEND_BASE_URL } from "./constantUtils";

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

export const goBack = e => {
  var defaultLocation = FRONTEND_BASE_URL;
  var oldHash = window.location.hash;

  history.back();

  var newHash = window.location.hash;

  /* If the previous page hasn't been loaded in a given time (in this case
  * 1000ms) the user is redirected to the default location given above.
  * This enables you to redirect the user to another page.
  */

  if(
    newHash === oldHash &&
    (typeof(document.referrer) !== "string" || document.referrer  === "")
  ){
    window.setTimeout(function(){
      // redirect to default location
      window.location.href = defaultLocation;
    }, 1000); // set timeout in ms
  }
  if(e){
    if(e.preventDefault)
      e.preventDefault();
    if(e.preventPropagation)
      e.preventPropagation();
  }
  return false; // stop event propagation and browser default event
}

export function openFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

export function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}