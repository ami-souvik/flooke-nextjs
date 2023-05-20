import sendApiRequest from "../requestWebService";
import {
  GET_DATE_FILTERED_PROCESSED_ORDERS
} from "../../constantUtils";

export const filterProcessedOrderByDate = async (params: object) => {
  try {
    const res = await sendApiRequest(
      GET_DATE_FILTERED_PROCESSED_ORDERS,
      params
    );
    if (!res) return null;
    return res;
  } catch (exp) {
    return null;
  }
};