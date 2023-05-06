"use client"
import { useEffect, useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { setAlertWithDelay } from '../../store/services/uiServices';
import { processOrder } from '../../utils/web/apis/processOrderApis';
import Picker from '../../components/form-components/picker';
import searchAndConnectBt from '../../utils/printUtils/searchAndConnectBt';
import { WRAPPER_BASE_URL } from '../../utils/constantUtils';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import FigureClick from '../../components/form-components/figureClick';

const serviceTypes = ["Dine in", "Takeout", "Delivery", "Zomato", "Swiggy"]
const paymentMethods = ["Cash", "UPI", "Card"]

export default function OrderProcessor() {
  const queryParameters = new URLSearchParams(window.location.search)
  const tableId = queryParameters.get("id")
  const [processed, setProcessed] = useState(null);
  const [serviceType, setServiceType] = useState(serviceTypes[0]);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const _readPreviewProcessed = async () => {
    const res = await processOrder({
      "table-number": tableId
    })
    if(res?.data?.firebase?.content) {
      setProcessed(res.data.firebase.content);
    }
    else if(res?.data?.firebase?.error) {
      setAlertWithDelay({
        status: "error",
        message: res.data.firebase.error
      });
    }
    else {
      setAlertWithDelay({
        status: "error",
        message: "Something went wrong"
      });
    }
  }
  useEffect(() => {
    _readPreviewProcessed();
  }, [])
  return (
    <main
      style={{
        height: "100vh",
        position: "relative",
        padding: "12px 20px"
      }}>
      <Box
        height={`calc(${window.innerHeight}px - 211px)`}>
        {
          processed &&
          processed["order-details"].map(
            eachItem =>
            <Box
              key={eachItem["item-unique"]}
              my="8px"
              display="flex"
              alignItems="center"
              justifyContent="space-between">
              <Typography
                fontSize="1rem"
                fontFamily="DM Sans, sans-serif"
              >{eachItem["item-name"]}</Typography>
              <Box
                height="32px"
                width="32px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                borderRadius="40px"
                bgcolor="var(--gray-hard-500)">
                <Typography
                  color="var(--white-X00)"
                  fontSize="1.2rem"
                  fontFamily="DM Sans, sans-serif"
                >{eachItem["item-count"]}</Typography>
              </Box>
            </Box>
          )
        }
      </Box>
      <Divider
        sx={{
          borderRadius: "1px",
          marginBottom: "12px"
        }}
      />
      <Box
        display="flex"
        justifyContent="space-between">
        <Box
          display="flex">
          <Box
            display="flex"
            flexDirection="column">
            <Picker
              label="Service Type"
              values={serviceTypes}
              active={serviceType}
              setActive={setServiceType}
            />
            <Picker
              label="Payment Method"
              values={paymentMethods}
              active={paymentMethod}
              setActive={setPaymentMethod}
            />
          </Box>
          <Box>
            <Typography>{processed["billed-amount"]}</Typography>
            <Typography>{processed["order-total"]}</Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between">
          <FigureClick
            icon={<PrintRoundedIcon htmlColor="var(--white-X00)" />}
            clickWork={() => parent.window.postMessage({
              method: "print",
              content: 2
            }, WRAPPER_BASE_URL)}
          />
          <FigureClick
            icon={<ArrowCircleRightOutlinedIcon htmlColor="var(--white-X00)" />}
          />
        </Box>
      </Box>
    </main>
  )
}