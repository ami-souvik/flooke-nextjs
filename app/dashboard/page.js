"use client"
import { useEffect, useState } from "react";
import { Box, Skeleton, IconButton, Typography } from "@mui/material";
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DashboardOrderCard from "../../components/dashboard/dashboard-order-card";
import DashboardGuestCard from "../../components/dashboard/dashboard-guest-card";
import PastOrders from "../../components/past-orders/past-orders";
import GuestDetails from "../../components/guest-details/guest-details";
import { filterProcessedOrderByDate } from '../../utils/web/apis/processedOrderFilterApis';
import { getAllGuestDetails } from '../../utils/web/apis/guestDetailsApis';
import '../../styles/responsive-pages-styles/dashboard.css';
import FigureClick from "../../components/form-components/figure-click";
import Report from "../../components/dashboard/dashboard-report";

export default function Dashboard() {
  const [view, setView] = useState(null);
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
              gotoOrders={() => {
                setView("past-orders");
                gotoOrders()
              }}
            />
            <DashboardGuestCard
              setGuestDetails={setGuestDetails}
              retrieveApi={getAllGuestDetails}
              gotoOrders={() => {
                setView("guest-details");
                gotoOrders()
              }}
            />
            <Box
              margin="6px 0px"
              display="flex"
              overflow="scroll">
              <FigureClick
                invert
                Icon={(props) => <AssessmentOutlinedIcon {...props} />}
                label="Reporting"
                margin="0px 8px"
                padding="32px"
                rounded="12px"
                clickWork={() => {
                  setView("reporting")
                  gotoOrders()
                }}
              />
              <FigureClick
                invert
                Icon={(props) => <TimelineOutlinedIcon {...props} />}
                label="Business growth"
                margin="0px 8px"
                padding="32px"
                rounded="12px"
              />
              <FigureClick
                invert
                Icon={(props) => <LightbulbOutlinedIcon {...props} />}
                label="Insights"
                margin="0px 8px"
                padding="32px"
                rounded="12px"
              />
              <FigureClick
                invert
                Icon={(props) => <InfoOutlinedIcon {...props} />}
                label="Further Info"
                margin="0px 8px"
                padding="32px"
                rounded="12px"
              />
            </Box>
          </Box>
        </Box>
        <Box
          id="cs-dashboard-col-2"
          className="cs-component-col-2">
          {view === "past-orders" && <PastOrders content={pastOrders} />}
          {view === "guest-details" && <GuestDetails content={guestDetails}/>}
          {view === "reporting" && <Report />}
        </Box>
      </Box>
    </main>
  )
}