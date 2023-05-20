import sendApiRequest from "../requestWebService";
import {
  MONTHLY_SALES_REPORT_DETAILS
} from "../../constantUtils";

export const monthlySalesReport = async (params: object) => {
  try {
    const res = await sendApiRequest(
      MONTHLY_SALES_REPORT_DETAILS,
      params
    );
    if (!res) return null;
    return res;
  } catch (exp) {
    return null;
  }
}