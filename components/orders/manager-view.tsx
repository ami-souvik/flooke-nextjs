import { Box, Skeleton, Typography } from "@mui/material";
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FigureClick from "../form-components/figure-click";
import { addActiveOrder } from "../../utils/web/apis/activeOrderApis";
import { navigate } from '../../utils/helperUtils.ts';
import { setAlertWithDelay } from "../../store/services/uiServices";
import { TABLES_MAP, PATH_ORDER_EDITOR, PATH_ORDER_PROCESSOR, WRAPPER_BASE_URL } from "../../utils/constantUtils";

interface ManagerViewProps {
  orders: object
  confirmDelete: (v: string) => void
}

const ManagerView = ({ orders={}, confirmDelete }: ManagerViewProps): JSX.Element => {
  const unserveOne = async (tableIndex, itemIndex) => {
    const tableOrder = JSON.parse(JSON.stringify(orders[tableIndex]))
    if(!tableOrder || !tableOrder["order-details"] || !tableOrder["order-details"][itemIndex]) 
      return;
    const {
      "served-count": servedCount
    } = tableOrder["order-details"][itemIndex]
    if(servedCount === 0) return;
    tableOrder["order-details"][itemIndex]["served-count"] = servedCount - 1
    const res = await addActiveOrder(tableOrder);
    if(res?.data?.firebase?.error) {
      setAlertWithDelay({
        status: "error",
        message: res.data.firebase.error
      });
    }
    else if(res?.data?.firebase?.status) {
      setAlertWithDelay({
        status: "success",
        message: res.data.firebase.status
      });
    }
    else {
      setAlertWithDelay({
        status: "error",
        message: "Something went wrong"
      });
    }
  }
  return <>
  {
    orders && Object.keys(orders).length > 0 ?
    Object.keys(orders).map((key, index) => (
      <Box
        key={index}
        margin="12px">
        <Box
          px="24px"
          py="12px"
          borderRadius="4px"
          boxShadow="0px 0px 8px var(--gray-subtle-500)">
          <Box
            display="flex"
            alignItems="flex-end"
            justifyContent="space-between">
            <Box>
              <Typography
                fontSize="1.6rem"
                fontFamily="DM Sans, sans-serif"
                fontWeight="600"
              >{TABLES_MAP[orders[key]["table-number"]]}</Typography>
            </Box>
            <Box display="flex">
              <Typography
                width="40px"
                marginRight="4px"
                color="var(--gray-hard-500)"
                fontSize="0.7rem"
                fontFamily="DM Sans, sans-serif"
                fontStyle="italic"
              >served</Typography>
              <Typography
                width="40px"
                color="var(--gray-hard-500)"
                fontSize="0.7rem"
                fontFamily="DM Sans, sans-serif"
                fontStyle="italic"
              >total</Typography>
            </Box>
          </Box>
          {
            orders[key]["order-details"].map(
              (eachItem, index) =>
              <Box
                key={eachItem["item-unique"]}
                my="8px"
                display="flex"
                alignItems="center"
                justifyContent="space-between">
                <Box
                  display="flex"
                  alignItems="center">
                  <FigureClick
                    Icon={(props) => <WhatshotRoundedIcon fontSize="small" {...props} />}
                    padding="8px"
                    clickWork={() => unserveOne(orders[key]["table-number"], index)}
                  />
                  <Box width="4px"/>
                  <Box>
                    <Typography
                      paddingX="12px"
                      fontSize="0.8rem"
                      fontFamily="Comme, sans-serif"
                      textAlign="center"
                    >{eachItem["item-name"]}</Typography>
                    {
                      eachItem.comment && <Typography
                        lineHeight="0.9rem"
                        padding="6px"
                        margin="4px 8px 0px -4px"
                        fontSize="0.8rem"
                        fontFamily="DM Sans, sans-serif"
                        fontStyle="italic"
                        borderRadius="4px"
                        boxShadow="0px 0px 8px var(--gray-subtle-500)"
                        color="var(--white-X00)"
                        bgcolor="var(--lightblue-400)"
                      >{eachItem.comment}</Typography>
                    }
                  </Box>
                </Box>
                <Box display="flex">
                  <Box
                    width="40px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    marginRight="4px"
                    border="1px solid var(--gray-hard-500)"
                    borderRadius="4px"
                    bgcolor="var(--green-subtle-400)">
                    <Typography
                      color="var(--gray-hard-500)"
                      fontSize="1.2rem"
                      fontFamily="Comme, sans-serif"
                    >{eachItem["served-count"]}</Typography>
                  </Box>
                  <Box
                    width="40px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    border="1px solid var(--gray-hard-500)"
                    borderRadius="4px"
                    bgcolor="var(--white-X00)">
                    <Typography
                      color="var(--gray-hard-500)"
                      fontSize="1.2rem"
                      fontFamily="Comme, sans-serif"
                    >{eachItem["item-count"]}</Typography>
                  </Box>
                </Box>
              </Box>
            )
          }
          <Box
            display="flex">
            <FigureClick
              Icon={(props) => <NoteAltOutlinedIcon {...props} />}
              id="cs-order-editor-go-switch"
              padding="12px"
              margin="0px 2px"
              clickWork={() => navigate(`${PATH_ORDER_EDITOR}?id=${orders[key]["table-number"]}`)}
            />
            <FigureClick
              Icon={(props) => <DeleteOutlineRoundedIcon {...props} />}
              padding="12px"
              margin="0px 2px"
              clickWork={() => confirmDelete(key)}
            />
            <FigureClick
              Icon={(props) => <DescriptionOutlinedIcon {...props} />}
              padding="12px"
              margin="0px 2px"
              clickWork={() => navigate(`${PATH_ORDER_PROCESSOR}?id=${orders[key]["table-number"]}`)}
            />
            <FigureClick
              Icon={(props) => <PrintRoundedIcon {...props} />}
              padding="12px"
              margin="0px 2px"
              clickWork={() => parent.window.postMessage({
                method: "print",
                content: []
              }, WRAPPER_BASE_URL)}
            />
          </Box>
        </Box>
      </Box>
    )) :
    <Box
      height="260px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      margin="12px">
      <Skeleton
        width="100%"
        height="80px"
        variant="rounded"
      />
      <Skeleton
        width="100%"
        height="80px"
        variant="rounded"
      />
      <Skeleton
        width="100%"
        height="80px"
        variant="rounded"
      />
    </Box>
  }
  </>
}

export default ManagerView;