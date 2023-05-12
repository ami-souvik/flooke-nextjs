"use client"
import { useEffect, useState } from "react";
import { Box, Skeleton, IconButton, Typography } from "@mui/material";
import DashboardOrderCard from "../../components/dashboard/dashboard-order-card";
import DashboardGuestCard from "../../components/dashboard/dashboard-guest-card";
import PastOrders from "../../components/past-orders/past-orders";
import { filterProcessedOrderByDate } from '../../utils/web/apis/processedOrderFilterApis';
import { getAllGuestDetails } from '../../utils/web/apis/guestDetailsApis';
import '../../styles/responsive-pages-styles/dashboard.css';

export default function Dashboard() {
  const [pastOrders, setPastOrders] = useState([]);
  const [guestDetails, setGuestDetails] = useState([]);
  const gotoOrders = () => {
    const dashboardCol2 = document.getElementById("cs-dashboard-col-2");
    dashboardCol2.scrollIntoView({
      behavior:"smooth",
      block: "end",
      inline:"center"
    });
  }
  return (
    <main
      style={{
        position: "relative"
      }}>
      <Box
        id="cs-dashboard-root"
        className="cs-component-root">
        <Box
          id="cs-dashboard-col-1"
          className="cs-component-col-1"
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
            <DashboardOrderCard
              setPastOrders={setPastOrders}
              retrieveApi={filterProcessedOrderByDate}
              gotoOrders={gotoOrders}
            />
            <DashboardGuestCard
              setPastOrders={setGuestDetails}
              retrieveApi={getAllGuestDetails}
              gotoOrders={gotoOrders}
            />
          </Box>
        </Box>
        <Box
          id="cs-dashboard-col-2"
          className="cs-component-col-2">
          <PastOrders content={pastOrders} />
        </Box>
      </Box>
    </main>
  )
}