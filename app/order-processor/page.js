"use client"
import { useEffect, useState } from 'react';
import { Box, Divider, InputBase, Typography } from '@mui/material';
import { setAlertWithDelay } from '../../store/services/uiServices';
import { previewProcessOrder, processOrder } from '../../utils/web/apis/processOrderApis';
import Picker from '../../components/form-components/picker';
import searchAndConnectBt from '../../utils/printUtils/searchAndConnectBt';
import { PATH_DEFAULT, WRAPPER_BASE_URL } from '../../utils/constantUtils';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { navigate } from '../../utils/helperUtils';
import FigureClick from '../../components/form-components/figure-click';

const serviceTypes = ["Dine in", "Takeout", "Delivery", "Zomato", "Swiggy"]
const paymentMethods = ["Cash", "UPI", "Card"]

export default function OrderProcessor() {
  const queryParameters = new URLSearchParams(window.location.search)
  const tableId = queryParameters.get("id")
  const [processed, setProcessed] = useState(null);
  const [serviceType, setServiceType] = useState(serviceTypes[0]);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [billedAmount, setBilledAmount] = useState();
  const _readPreviewProcessed = async () => {
    const res = await previewProcessOrder({
      "table-number": tableId
    })
    if(res?.data?.firebase?.content) {
      setProcessed(res.data.firebase.content);
      setBilledAmount(res.data.firebase.content["billed-amount"]);
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
  const _processOrder = async () => {
    const res = await processOrder({
      "table-number": tableId,
      "payment-type": paymentMethod,
      "service-type": serviceType,
      "billed-amount": billedAmount,
      "order-total": processed["order-total"]
    })
    if(res?.data?.mongodb?.status) {
      navigate(`${PATH_DEFAULT}`)
      setAlertWithDelay({
        status: "success",
        message: res.data.mongodb.status
      });
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
        /** 24 full screen padding */
        /** 12 Divider */
        /** 78 processing details section */
        /** 56 process actions */
        height={`calc(100vh - 24px - 12px - 78px - 56px)`}>
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
        justifyContent="space-between"
        marginBottom="6px">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between">
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
        <Box
          display="flex"
          flexDirection="column">
          <Box
            display="flex"
            justifyContent="space-between">
            <Typography>Sub Total - </Typography>
            <Typography
              sx={{
                width: "80px",
                textAlign: "right"
              }}>{processed && processed["order-total"]}</Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between">
            <Typography>Tax (0%) - </Typography>
            <Typography
              sx={{
                width: "80px",
                textAlign: "right"
              }}>0.00</Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between">
            <Typography>Total -</Typography>
            <InputBase
              sx={{
                width: "80px",
                textAlign: "right",
                borderBottom: "1px solid var(--gray-hard-500)",
              }}
              inputProps={{
                style: {
                  padding: 0,
                  textAlign: "right"
                }
              }}
              value={billedAmount}
              onChange={e => setBilledAmount(e.target.value)}
            />
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end">
        <Box
          display="flex"
          alignItems="flex-end">
          <FigureClick
            icon={<PrintRoundedIcon htmlColor="var(--white-X00)" />}
            clickWork={() => parent.window.postMessage({
              method: "print",
              content: 2
            }, WRAPPER_BASE_URL)}
          />
          <FigureClick
            icon={<ArrowCircleRightOutlinedIcon htmlColor="var(--white-X00)" />}
            clickWork={_processOrder}
          />
        </Box>
      </Box>
    </main>
  )
}