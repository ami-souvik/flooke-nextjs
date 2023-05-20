import { useState, useEffect } from "react";
import dayjs from 'dayjs';
import { Skeleton, Box, IconButton, Typography, Dialog, DialogContent } from "@mui/material";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { getUTCDateLimit } from "../../utils/helperUtils.ts";

const GuestCardSm = ({ retrieveApi }) => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);
  const _retrieveApi = async () => {
    setLoading(true);
    const response = await retrieveApi(getUTCDateLimit());
    setLoading(false);
    setContent({
      guestCount: response.data.mongodb.content.length
    });
  }
  useEffect(() => {
    _retrieveApi();
  }, []);
  return (
    <Box
      width="114px"
      p="12px 16px"
      fontSize="2.6rem"
      borderRadius="20px"
      boxShadow="0px 0px 8px var(--gray-subtle-500)">
      <Box
        display="flex"
        justifyContent="flex-start">
        <PeopleRoundedIcon
          fontSize="inherit"
          htmlColor="var(--primary-purple)"
        />
        <IconButton
          sx={{
            padding: "4px 4px 12px 12px"
          }}
          onClick={_retrieveApi}>
          <RefreshRoundedIcon fontSize="small"/>
        </IconButton>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start">
        <Typography
          padding="0px 3px"
          fontWeight="100"
          fontSize="0.8rem"
          fontFamily="Comme, sans-serif">{`Guests Acquired`}</Typography>
        {
          loading ?
          <Skeleton
            variant="rounded"
            width={18}
            height={20.2}
          /> :
          <Typography
            padding="0px 4px"
            border="0.5px solid var(--gray-hard-500)"
            borderRadius="4px"
            fontWeight="600"
            fontSize="0.8rem"
            fontFamily="Comme, sans-serif">{content?.guestCount}</Typography>
        }
      </Box>
    </Box>
  )
}

const GuestCardFull = ({ setGuestDetails, retrieveApi, gotoOrders }) => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(null);
  const [openCalender, setOpenCalender] = useState(null);
  const [from, setFrom] = useState(new Date());
  const [end, setEnd] = useState(new Date(Date.now()+(24*60*60*1000)));
  const _retrieveApi = async () => {
    const response = await retrieveApi();
    retrieveApi(response.data.mongodb.content);
    setGuestDetails(response.data.mongodb.content);
  }
  useEffect(() => {
    _retrieveApi();
  }, [from, end]);
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="12px 16px"
      fontSize="2.6rem"
      borderRadius="20px"
      boxShadow="0px 0px 8px var(--gray-subtle-500)">
      <Dialog
        open={!!openCalender}
        onClose={() => setOpenCalender(false)}>
        <DialogContent
          sx={{
            padding: 0
          }}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={{
              calendarWeekNumberHeaderText: '#',
              calendarWeekNumberText: (weekNumber) => `${weekNumber}.`,
            }}
          >
            <DateCalendar
              defaultValue={dayjs(new Date())}
              onChange={(v, event) => {
                if(event === "finish" && openCalender === "from") {
                  setFrom(new Date(v["$y"], v["$M"], v["$D"]+1))
                  setOpenCalender(null)
                }
                else if(event === "finish" && openCalender === "end") {
                  setEnd(new Date(v["$y"], v["$M"], v["$D"]+1))
                  setOpenCalender(null)
                }
              }}
            />
          </LocalizationProvider>
        </DialogContent>
      </Dialog>
      <Box
        width="100%"
        display="flex"
        padding="4px 12px"
        border="1px solid var(--gray-subtle-500)"
        borderRadius="8px">
        <Box
          width="50%"
          borderRight="0.5px solid var(--gray-subtle-500)"
          onClick={() => setOpenCalender("from")}>
          <Typography
            fontWeight="100"
            fontSize="0.8rem"
            fontFamily="Comme, sans-serif">FROM DATE</Typography>
          <Typography
            fontSize="0.8rem"
            fontFamily="Comme, sans-serif">{from ? from.toISOString().substring(0, 10) : "Select Date"}</Typography>
        </Box>
        <Box
          width="50%"
          onClick={() => setOpenCalender("end")}>
          <Typography
            fontWeight="100"
            fontSize="0.8rem"
            fontFamily="Comme, sans-serif"
            textAlign="right">TO DATE</Typography>
          <Typography
            fontSize="0.8rem"
            fontFamily="Comme, sans-serif"
            textAlign="right">{end ? end.toISOString().substring(0, 10) : "Select Date"}</Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end">
        <Box
          display="flex"
          alignItems="center"
          paddingLeft="8px"
          sx={{
            cursor: "pointer"
          }}
          onClick={gotoOrders}>
          <Typography
            fontSize="0.8rem"
            fontFamily="Comme, sans-serif">guest details</Typography>
          <ChevronRightOutlinedIcon fontSize="small"/>
        </Box>
      </Box>
    </Box>
  )
}

const DashboardGuestCard = ({
  setGuestDetails,
  retrieveApi,
  gotoOrders
}) => (
  <Box
    m="6px 0px"
    display="flex">
    <GuestCardSm retrieveApi={retrieveApi} />
    <Box width="12px"/>
    <GuestCardFull
      setGuestDetails={setGuestDetails}
      retrieveApi={retrieveApi}
      gotoOrders={gotoOrders}
    />
  </Box>
)

export default DashboardGuestCard;