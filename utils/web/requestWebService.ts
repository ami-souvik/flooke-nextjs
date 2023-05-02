import axios from "axios";
import { DATABASE, BACKEND_API_BASE_URL } from "../constantUtils";

const sendApiRequest = async (
  apiDetails,
  params = {}
) => {
  try {
    const requestConfig = {
      method: apiDetails.METHOD,
      url: BACKEND_API_BASE_URL + apiDetails.URL,
      headers: {
        "Content-Type": "application/json",
        "CS-Database": DATABASE,
        "CS-Access-Key": ":w?No-08bTDC\\!Hif"
      },
      data: params,
    };
    return await axios(requestConfig);
  } catch (exp) {
    console.error("EXCEPTION: INSIDE sendApiRequest() METHOD. : ", exp);
    return exp;
  }
};

export default sendApiRequest;
