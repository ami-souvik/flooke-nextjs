import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FlookeLineChart from "../ui-components/flooke-line-chart";
import { monthlySalesReport } from "../../utils/web/apis/reportApis";

const Report = () => {
  const [data, setData] = useState([]);
  const gotoDashboard = () => {
    const dashboardCol1 = document.getElementById("cs-dashboard-col-1");
    dashboardCol1.scrollIntoView({
      behavior:"smooth",
      block: "end",
      inline:"center"
    });
  }
  const _retrieveMonthlySalesDatails = async () => {
    const reportData = {}
    const today = new Date();
    let response = await monthlySalesReport({
      month: today.getMonth(),
      year: today.getFullYear()
    })
    response.data.mongodb.content.forEach(each => {
      const datetxt = each._id
      reportData[`${datetxt.substring(8, 10)}/${datetxt.substring(5, 7)}`] = {
        name: `${datetxt.substring(8, 10)}/${datetxt.substring(5, 7)}`,
        "current month": each.totalSale
      }
    })
    response = await monthlySalesReport({
      month: today.getMonth()-1,
      year: today.getFullYear()
    })
    response.data.mongodb.content.forEach(each => {
      const datetxt = each._id
      if(reportData[`${datetxt.substring(8, 10)}/${datetxt.substring(5, 7)}`]) {
        reportData[`${datetxt.substring(8, 10)}/${datetxt.substring(5, 7)}`]["previous month"] = each.totalSale
      }
      else {
        reportData[`${datetxt.substring(8, 10)}/${datetxt.substring(5, 7)}`] =
        {
          name: `${datetxt.substring(8, 10)}/${datetxt.substring(5, 7)}`,
          "previous month": each.totalSale
        }
      }
    })
    console.log(reportData);
    setData(Object.values(reportData));
  }
  useEffect(() => {
    _retrieveMonthlySalesDatails()
  }, [])
  return (
    <Box
      width="100%"
      height="100%"
      overflow="scroll">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="0px 12px">
        <Typography
          padding="8px 0px 12px 0px"
          fontSize="1rem"
          fontWeight="100"
          fontFamily="Comme, sans-serif"
        >Reporting</Typography>
        <Box
          display="flex"
          padding="12px 0px"
          alignItems="center"
          sx={{
            cursor: "pointer"
          }}
          onClick={gotoDashboard}>
          <ChevronLeftIcon fontSize="small"/>
          <Typography
            fontSize="0.8rem"
            fontFamily="Comme, sans-serif">dashboard</Typography>
        </Box>
      </Box>
      <Box
        width="100%"
        height="30%">
        <FlookeLineChart
          data={data}
        />
      </Box>
    </Box>
  )
}

export default Report;