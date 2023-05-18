import { useState, useEffect } from "react";
import dayjs from 'dayjs';
import { Skeleton, Box, IconButton, Typography, Dialog, DialogContent } from "@mui/material";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { formatDate, getUTCDateLimit } from "../../utils/helperUtils.ts";

const OrderCardSm = ({ retrieveApi }) => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(null);
  const _retrieveApi = async () => {
    setLoading(true);
    let orderCount = 0
    let totalBusiness = 0
    console.log(getUTCDateLimit());
    const response = await retrieveApi(getUTCDateLimit());
    setLoading(false);
    response.data.mongodb.content.forEach(each => {
      orderCount += 1;
      totalBusiness += Number(each["billed-amount"])
    });
    setContent({
      orderCount,
      totalBusiness
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
        <AccountBalanceWalletRoundedIcon
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
        justifyContent="space-between">
        <Typography
          padding="0px 3px"
          fontWeight="100"
          fontSize="0.8rem"
          fontFamily="Comme, sans-serif">{`Orders`}</Typography>
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
            fontFamily="Comme, sans-serif">{content?.orderCount}</Typography>
        }
      </Box>
      {
        loading ?
        <Skeleton variant="rounded" height={21.5} /> :
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center">
          <Typography
            paddingLeft="3px"
            fontWeight="600"
            fontSize="0.9rem"
            fontFamily="Comme, sans-serif">Rs. </Typography>
          <Typography
            paddingRight="3px"
            fontWeight="600"
            fontSize="0.9rem"
            textAlign="right"
            fontFamily="Comme, sans-serif">{content?.totalBusiness}</Typography>
        </Box>
      }
    </Box>
  )
}

const OrderCardFull = ({ setPastOrders, retrieveApi, gotoOrders }) => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(null);
  const [openCalender, setOpenCalender] = useState(null);
  const [from, setFrom] = useState(new Date(Date.now()-(24*60*60*1000)));
  const [end, setEnd] = useState(new Date());
  const _retrieveApi = async () => {
    if(!from || !end) return;
    let totalBusiness = 0
    setLoading(true);
    const response = await retrieveApi({
      "from-date": `${from.getFullYear()}-${
        formatDate(from.getMonth()+1)}-${
        formatDate(from.getDate())}T00:00:00.000Z`,
      "to-date": `${end.getUTCFullYear()}-${
        formatDate(end.getMonth()+1)}-${
        formatDate(end.getDate())}T23:59:59.999Z`
    });
    setLoading(false);
    response.data.mongodb.content.forEach(each => {
      totalBusiness += Number(each["billed-amount"])
    });
    setPastOrders(response.data.mongodb.content);
    setContent({
      totalBusiness
    });
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
              defaultValue={dayjs(
                openCalender === "from" ? from
                : openCalender === "end" ? end
                : new Date()
              )}
              onChange={(v, event) => {
                console.log(v);
                if(event === "finish" && openCalender === "from") {
                  setFrom(new Date(v["$y"], v["$M"], v["$D"]))
                  setOpenCalender(null)
                }
                else if(event === "finish" && openCalender === "end") {
                  setEnd(new Date(v["$y"], v["$M"], v["$D"]))
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
            fontFamily="Comme, sans-serif">{from ?
              `${from.getFullYear()}-${
                formatDate(from.getMonth()+1)}-${
                formatDate(from.getDate())}` : "Select Date"}</Typography>
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
            textAlign="right">{end ?
              `${end.getFullYear()}-${
                formatDate(end.getMonth()+1)}-${
                formatDate(end.getDate())}` : "Select Date"}</Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="flex-end">
        <Box
          width="100%">
          {
            loading ?
            <Skeleton variant="rounded" height={21.5} /> :
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center">
              <Typography
                paddingLeft="3px"
                fontWeight="600"
                fontSize="0.9rem"
                fontFamily="Comme, sans-serif">Rs. </Typography>
              <Typography
                paddingRight="3px"
                fontWeight="600"
                fontSize="0.9rem"
                textAlign="right"
                fontFamily="Comme, sans-serif">{content?.totalBusiness}</Typography>
            </Box>
          }
        </Box>
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
            fontFamily="Comme, sans-serif">orders</Typography>
          <ChevronRightOutlinedIcon fontSize="small"/>
        </Box>
      </Box>
    </Box>
  )
}

const DashboardOrderCard = ({
  setPastOrders,
  retrieveApi,
  gotoOrders
}) => (
  <Box
    m="6px 0px"
    display="flex">
    <OrderCardSm retrieveApi={retrieveApi} />
    <Box width="12px"/>
    <OrderCardFull
      setPastOrders={setPastOrders}
      retrieveApi={retrieveApi}
      gotoOrders={gotoOrders}
    />
  </Box>
)

export default DashboardOrderCard;