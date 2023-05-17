import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { addActiveOrder } from "../../utils/web/apis/activeOrderApis";
import FigureClick from "../form-components/figure-click";
import { setAlertWithDelay } from "../../store/services/uiServices";
import { TABLES_MAP } from "../../utils/constantUtils";

interface ChefViewProps {
  orders: object
}

const ChefView = ({ orders={} }: ChefViewProps): JSX.Element => {
  const [group, setGroup] = useState(orders || {});
  const _handleServe = async (what, tableIndex, itemIndex) => {
    const tableOrder = JSON.parse(JSON.stringify(orders[tableIndex]))
    if(!tableOrder || !tableOrder["order-details"] || !tableOrder["order-details"][itemIndex]) 
      return;
    const {
      "item-count": itemCount,
      "served-count": servedCount
    } = tableOrder["order-details"][itemIndex]
    tableOrder["order-details"][itemIndex]["served-count"] = itemCount
    switch(what) {
      case "serve-one":
        if(servedCount < itemCount)
          tableOrder["order-details"][itemIndex]["served-count"] = servedCount + 1
        break;
      case "serve-all":
        tableOrder["order-details"][itemIndex]["served-count"] = itemCount
        break;
      case "unserve-one":
        if(servedCount > 0)
          tableOrder["order-details"][itemIndex]["served-count"] = servedCount - 1
        break;
      case "unserve-all":
        tableOrder["order-details"][itemIndex]["served-count"] = 0
        break;
      default:
        return;
    }
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
  const groupOrders = () => {
    const chefGroup = {}
    Object.keys(orders).forEach(key => {
      orders[key]["order-details"].forEach((each, itemIndex) => {
        const unique = each["item-unique"]
        if(unique && chefGroup[unique] && each["item-count"]) {
          chefGroup[unique]["item-count"] += Number(each["item-count"])
          chefGroup[unique]["served-count"] += Number(each["served-count"])
          if(chefGroup[unique].tables) {
            chefGroup[unique].tables.push({
              "table-number": orders[key]["table-number"],
              "item-count": Number(each["item-count"]),
              "served-count": Number(each["served-count"]),
              comment: each.comment,
              itemIndex
            })
          }
        }
        else if(unique) {
          chefGroup[unique] = {
            name: each["item-name"],
            "item-count": Number(each["item-count"]),
            "served-count": Number(each["served-count"]),
            tables: [
              {
                "table-number": orders[key]["table-number"],
                "item-count": Number(each["item-count"]),
                "served-count": Number(each["served-count"]),
                comment: each.comment,
                itemIndex
              }
            ]
          }
        }
      })
    })
    setGroup(chefGroup)
  }
  useEffect(() => {
    groupOrders()
  }, [orders])
  return <>
  {
    group &&
    Object.keys(group).map((key, index) => (
      <Box
        key={index}
        margin="12px">
        <Box
          px="24px"
          py="12px"
          borderRadius="4px"
          boxShadow="0px 0px 8px var(--gray-subtle-500)">
          <Box
            my="8px"
            display="flex"
            alignItems="center"
            justifyContent="space-between">
            <Box>
              <Typography
                paddingRight="6px"
                fontSize="1.2rem"
                fontFamily="Comme, sans-serif"
              >{group[key].name}</Typography>
            </Box>
            <Box
              display="flex">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginRight="4px"
                padding="0px 8px"
                border="1px solid var(--gray-hard-500)"
                borderRadius="4px"
                bgcolor="var(--green-subtle-400)">
                <Typography
                  color="var(--gray-hard-500)"
                  fontSize="1.2rem"
                  fontFamily="Comme, sans-serif"
                >{group[key]["served-count"]}</Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                padding="0px 8px"
                border="1px solid var(--gray-hard-500)"
                borderRadius="4px"
                bgcolor="var(--white-X00)">
                <Typography
                  color="var(--gray-hard-500)"
                  fontSize="1.2rem"
                  fontFamily="Comme, sans-serif"
                >{group[key]["item-count"]}</Typography>
              </Box>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="column">
            {
              group[key].tables &&
              group[key].tables.map((each, index) => <Box
                key={index}
                display="flex"
                flexDirection="column">
                <Box
                  display="flex"
                  alignItems="flex-end"
                  justifyContent="space-between"
                  marginTop="2px">
                  <Box
                    display="flex">
                    <FigureClick
                      icon={<ArrowBackIosNewIcon
                        htmlColor="var(--white-X00)"
                        fontSize="small"
                      />}
                      padding="8px"
                      clickWork={() => _handleServe("unserve-one", each["table-number"], each.itemIndex)}
                    />
                    <Box width="4px"/>
                    <FigureClick
                      icon={
                        <Box
                          display="flex"
                          alignItems="center"
                          p="0"
                          m="0">
                          <ArrowBackIosNewIcon
                            htmlColor="var(--white-X00)"
                            fontSize="small"
                          />
                          <Typography
                            color="var(--white-X00)"
                          >{each["item-count"]}</Typography>
                        </Box>
                      }
                      padding="8px"
                      clickWork={() => _handleServe("unserve-all", each["table-number"], each.itemIndex)}
                    />
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center">
                    <Box
                      display="flex"
                      alignItems="center">
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        paddingRight="8px"
                        borderRadius="4px"
                        bgcolor="var(--white-X00)">
                        <Typography
                          color="var(--gray-hard-500)"
                          fontSize="0.8rem"
                          fontFamily="Comme, sans-serif"
                        >{TABLES_MAP[each["table-number"]]}</Typography>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        padding="0px 4px"
                        marginRight="2px"
                        border="1px solid var(--gray-hard-500)"
                        borderRadius="4px"
                        bgcolor="var(--green-subtle-400)">
                        <Typography
                          color="var(--gray-hard-500)"
                          fontSize="1rem"
                          fontFamily="Comme, sans-serif"
                        >{each["served-count"]}</Typography>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        padding="0px 4px"
                        border="1px solid var(--gray-hard-500)"
                        borderRadius="4px"
                        bgcolor="var(--white-X00)">
                        <Typography
                          color="var(--gray-hard-500)"
                          fontSize="1rem"
                          fontFamily="Comme, sans-serif"
                        >{each["item-count"]}</Typography>
                      </Box>
                    </Box>
                    {
                      each.comment &&
                      <Typography
                        lineHeight="0.9rem"
                        padding="6px"
                        margin="4px 4px 0px 4px"
                        fontSize="0.8rem"
                        fontFamily="DM Sans, sans-serif"
                        fontStyle="italic"
                        borderRadius="4px"
                        boxShadow="0px 0px 8px var(--gray-subtle-500)"
                        color="var(--white-X00)"
                        bgcolor="var(--lightblue-400)"
                      >{each.comment}</Typography>
                    }
                  </Box>
                  <Box
                    display="flex">
                    <FigureClick
                      icon={
                        <Box
                          display="flex"
                          alignItems="center"
                          p="0"
                          m="0">
                          <Typography
                            color="var(--white-X00)"
                          >{each["item-count"]}</Typography>
                          <ArrowForwardIosIcon
                            htmlColor="var(--white-X00)"
                            fontSize="small"
                          />
                        </Box>
                      }
                      padding="8px"
                      clickWork={() => _handleServe("serve-all", each["table-number"], each.itemIndex)}
                    />
                    <Box width="4px"/>
                    <FigureClick
                      icon={<ArrowForwardIosIcon
                        htmlColor="var(--white-X00)"
                        fontSize="small"
                      />}
                      padding="8px"
                      clickWork={() => _handleServe("serve-one", each["table-number"], each.itemIndex)}
                    />
                  </Box>
                </Box>
              </Box>)
            }
          </Box>
        </Box>
      </Box>
    ))
  }
  </>
}

export default ChefView;