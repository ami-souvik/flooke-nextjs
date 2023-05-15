import { Box, Typography } from "@mui/material";
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FigureClick from "../form-components/figure-click";
import { TABLES_MAP, PATH_ORDER_EDITOR, PATH_ORDER_PROCESSOR } from "../../utils/constantUtils";
import { navigate } from '../../utils/helperUtils.ts';
import { useEffect, useState } from "react";

interface ChefViewProps {
  orders: object
  confirmDelete: (v: string) => void
}

const ChefView = ({ orders={}, confirmDelete }: ChefViewProps): JSX.Element => {
  const [group, setGroup] = useState(orders || {});
  const groupOrders = () => {
    const chefGroup = {}
    Object.keys(orders).forEach(key => {
      orders[key]["order-details"].forEach(each => {
        const unique = each["item-unique"]
        if(unique && chefGroup[unique] && each["item-count"]) {
          chefGroup[unique].count += Number(each["item-count"])
          if(chefGroup[unique].tables) {
            chefGroup[unique].tables.push({
              "table-number": orders[key]["table-number"],
              count: Number(each["item-count"]),
              comment: each.comment
            })
          }
        }
        else if(unique) {
          chefGroup[unique] = {
            name: each["item-name"],
            count: Number(each["item-count"]),
            tables: [
              {
                "table-number": orders[key]["table-number"],
                count: Number(each["item-count"]),
                comment: each.comment
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
              >{group[key].count}</Typography>
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
                  justifyContent="space-between">
                  <Box>
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
                        border="1px solid var(--gray-hard-500)"
                        borderRadius="4px"
                        bgcolor="var(--white-X00)">
                        <Typography
                          color="var(--gray-hard-500)"
                          fontSize="1rem"
                          fontFamily="Comme, sans-serif"
                        >{each.count}</Typography>
                      </Box>
                    </Box>
                    {
                      each.comment &&
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        padding="4px 8px"
                        margin="4px 8px 0px 0px"
                        border="0.5px solid var(--gray-hard-500)"
                        borderRadius="8px"
                        bgcolor="var(--primary-yellow)">
                        <Typography
                          color="var(--gray-hard-500)"
                          fontSize="0.8rem"
                          fontFamily="Comme, sans-serif"
                        >{each.comment}</Typography>
                      </Box>
                    }
                  </Box>
                  <FigureClick
                    id="cs-order-editor-go-switch"
                    icon={<ArrowForwardIosIcon
                      htmlColor="var(--white-X00)"
                      fontSize="small"
                    />}
                    padding="8px"
                    margin="2px 0px 0px 0px"
                    clickWork={() => {}}
                  />
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