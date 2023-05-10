"use client"
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import DashboardCard from "../../components/ui-components/dashboard-card";
import PastOrders from "../../components/past-orders/past-orders";
import { filterProcessedOrderByDate } from '../../utils/web/apis/processedOrderFilterApis';
import '../../styles/responsive-pages-styles/dashboard.css';

export default function Dashboard() {
  const [pastOrders, setPastOrders] = useState([]);
  const gotoOrders = () => {
    const dashboardCol2 = document.getElementById("cs-dashboard-col-2");
    dashboardCol2.scrollIntoView({
      behavior:"smooth",
      block: "end",
      inline:"nearest"
    });
  }
  return (
    <main
      style={{
        position: "relative",
        overflowX: "scroll"
      }}>
      <Box id="cs-dashboard-root">
        <Box
          id="cs-dashboard-col-1"
          display="flex"
          flexDirection="column">
          <Box
            height="100vh"
            display="flex"
            flexDirection="column">
            <Typography
              padding="8px 0px 12px 0px"
              fontSize="1rem"
              fontWeight="100"
              fontFamily="Comme, sans-serif"
              textAlign="right"
            >Good Evening, BOSS!</Typography>
            <DashboardCard
              setPastOrders={setPastOrders}
              retrieveApi={filterProcessedOrderByDate}
              gotoOrders={gotoOrders}
            />
          </Box>
        </Box>
        <Box id="cs-dashboard-col-2">
          <PastOrders content={pastOrders} />
        </Box>
      </Box>
    </main>
  )
}