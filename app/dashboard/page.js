"use client"
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import DashboardCard from "../../components/ui-components/dashboard-card";
import { filterProcessedOrderByDate } from '../../utils/web/apis/processedOrderFilterApis';

export default function Dashboard() {
  return (
    <main
      style={{
        height: "100vh",
        margin: "0px 12px",
        position: "relative",
        display: window.innerWidth > 600 ? "flex" : "block",
      }}>
      <Box
        display="flex"
        flexDirection="column">
        <Typography
          padding="8px 0px 12px 0px"
          fontSize="1rem"
          fontWeight="100"
          fontFamily="Comme, sans-serif"
          textAlign="right"
        >Good Evening, BOSS!</Typography>
        <DashboardCard retrieveApi={filterProcessedOrderByDate} />
      </Box>
    </main>
  )
}