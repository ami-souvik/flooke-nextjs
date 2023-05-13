import { Box, Typography } from "@mui/material";
import GuestDetailsCard from "./guest-details-card";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import '../../styles/responsive-pages-styles/past-orders.css';

const GuestDetails = ({ content=[] }) => {
  const gotoDashboard = () => {
    const dashboardCol1 = document.getElementById("cs-dashboard-col-1");
    dashboardCol1.scrollIntoView({
      behavior:"smooth",
      block: "end",
      inline:"center"
    });
  }
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-end"
        padding="0px 12px">
        <Typography
          padding="8px 0px 12px 0px"
          fontSize="1rem"
          fontWeight="100"
          fontFamily="Comme, sans-serif"
        >Guest Details</Typography>
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
        className="scrollable-div"
        sx={{
          height: "calc(100vh - 44px)",
          padding: "0px 12px",
          overflowY: "scroll"
        }}>
        {
          content?.map((each, index) =>
            <GuestDetailsCard key={index} data={each} />
          )
        }
      </Box>
    </Box>
  )
}

export default GuestDetails;