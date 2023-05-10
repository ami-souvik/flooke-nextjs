import { Box, Typography } from "@mui/material";
import PastOrderCard from "./past-order-card";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import '../../styles/responsive-pages-styles/past-orders.css';

const PastOrders = ({ content=[] }) => {
  const gotoDashboard = () => {
    const dashboardCol2 = document.getElementById("cs-dashboard-col-1");
    dashboardCol2.scrollIntoView({
      behavior:"smooth",
      block: "end",
      inline:"nearest"
    });
  }
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-end">
        <Typography
          padding="8px 0px 0px 0px"
          fontSize="1rem"
          fontWeight="100"
          fontFamily="Comme, sans-serif"
        >Past Orders</Typography>
        <Box
          display="flex"
          padding="2px 0px"
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
      {
      content?.map((each, index) =>
        <PastOrderCard key={index} data={each} />
      )}
    </Box>
  )
}

export default PastOrders;