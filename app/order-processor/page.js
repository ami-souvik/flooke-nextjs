"use client"
import { useEffect, useState } from 'react';
import { Box, Divider, InputBase, Typography } from '@mui/material';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { setAlertWithDelay } from '../../store/services/uiServices';
import { previewProcessOrder, processOrder } from '../../utils/web/apis/processOrderApis';
import Picker from '../../components/form-components/picker';
import { PATH_DEFAULT, WRAPPER_BASE_URL } from '../../utils/constantUtils';
import { navigate } from '../../utils/helperUtils.ts';
import InputDialogCase from '../../components/form-components/input-dialog-case';
import ConfirmOverlay from '../../components/overlays/confirm-overlay';
import FigureClick from '../../components/form-components/figure-click';

const serviceTypes = ["Dine in", "Takeout", "Delivery", "Zomato", "Swiggy"]
const paymentMethods = ["Cash", "UPI", "Card"]

export default function OrderProcessor() {
  const queryParameters = new URLSearchParams(window.location.search)
  const tableId = queryParameters.get("id")
  const [open, setOpen] = useState(false);
  const [confirmOpen, confirmProcess] = useState(false);
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
    confirmProcess(false);
    if(res?.data?.mongodb?.status
    || res?.data?.firebase?.status) {
      navigate(`${PATH_DEFAULT}`)
      setAlertWithDelay({
        status: "success",
        message: res.data.firebase.status
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
  useEffect(() => {
    console.log(processed);
  }, [processed])
  return (
    <main
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center"
      }}>
      <ConfirmOverlay
        open={confirmOpen}
        handleClose={() => confirmProcess(false)}
        title="Process order"
        message="Are you surely want to process the order?"
        onSuccess={_processOrder}
      />
      <InputDialogCase
        isOpen={open}
        handleClose={() => setOpen(false)}
        value={billedAmount}
        setValue={setBilledAmount}
      />
      <Box
        className="cs-component-col-1">
        <Box
          /** 24 full screen padding */
          /** 12 Divider */
          /** 78 processing details section */
          /** 74 process actions */
          height={`calc(100vh - 24px - 12px - 78px - 74px)`}
          sx={{
            overflowY: "scroll"
          }}>
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
                  fontSize="0.8rem"
                  fontFamily="Comme, sans-serif"
                >{eachItem["item-name"]}</Typography>
                <Box
                  width="100px"
                  display="flex"
                  justifyContent="space-between">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="4px">
                    <Typography
                      color="var(--gray-hard-500)"
                      fontSize="1rem"
                      fontFamily="Comme, sans-serif"
                    >{eachItem["item-count"]}</Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    padding="0px 8px"
                    border="1px solid var(--gray-hard-500)"
                    borderRadius="4px">
                    <Typography
                      color="var(--gray-hard-500)"
                      fontSize="1rem"
                      fontFamily="Comme, sans-serif"
                    >{Number(eachItem["item-count"]) * Number(eachItem.price)}</Typography>
                  </Box>
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
          marginBottom="24px">
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
              <Box
                onClick={() => setOpen(true)}
                sx={{
                  width: "80px",
                  textAlign: "right",
                  borderBottom: "1px solid var(--gray-hard-500)",
                }}>
                <Typography textAlign="right">{billedAmount}</Typography>
              </Box>
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
              Icon={(props) => <PrintRoundedIcon {...props} />}
              margin="0px 4px"
              clickWork={() => parent.window.postMessage({
                method: "print",
                content: processed
              }, WRAPPER_BASE_URL)}
            />
            <FigureClick
              Icon={(props) => <ArrowCircleRightOutlinedIcon {...props} />}
              clickWork={() => confirmProcess(true)}
            />
          </Box>
        </Box>
      </Box>
    </main>
  )
}