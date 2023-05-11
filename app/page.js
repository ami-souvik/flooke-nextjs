"use client";
import { useContext, useState } from 'react';
import { FirebaseRealtimeDB } from '../context/context'
import { Box, Button, IconButton, Typography } from '@mui/material';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { OPageAction } from '../components/form-components/page-action';
import { deleteActiveOrder } from '../utils/web/apis/activeOrderApis';
import OrderEditor from './order-editor/page';
import FigureClick from '../components/form-components/figure-click';
import ConfirmOverlay from '../components/overlays/confirm-overlay';
import { TABLES_MAP, PATH_ORDER_EDITOR, PATH_ORDER_PROCESSOR } from '../utils/constantUtils';
import { navigate } from '../utils/helperUtils.ts';
import '../styles/responsive-pages-styles/orders.css';

export default function Home() {
  const { orders } = useContext(FirebaseRealtimeDB);
  const [deleteTable, confirmDelete] = useState(null);
  return (
    <main
      suppressHydrationWarning
      style={{
        height: "100vh"
      }}>
      <ConfirmOverlay
        open={!!deleteTable}
        handleClose={() => confirmDelete(null)}
        title="Delete table"
        message="Are you surely want to delete the table?"
        onSuccess={() => deleteActiveOrder({ "table-number": orders[deleteTable]["table-number"] })}
      />
      <Box className="cs-component-root">
        <Box
          className="cs-component-col-1"
          sx={{ position: "relative" }}>
          <Box
            className="scrollable-div"
            height="100vh"
            sx={{
              overflowY: "scroll",
              padding: "0px"
            }}>
            {
              orders &&
              Object.keys(orders).map((key, index) => (
                <Box
                  key={index}
                  margin="12px">
                  <Typography
                    mx="12px"
                    marginTop="12px"
                    fontSize="1.4rem"
                    fontFamily="Comme, sans-serif"
                    fontWeight="600"
                  >{TABLES_MAP[orders[key]["table-number"]]}</Typography>
                  <Box
                    px="24px"
                    py="12px"
                    borderRadius="4px"
                    boxShadow="0px 0px 8px var(--gray-subtle-500)">
                    {
                      orders[key]["order-details"].map(
                        eachItem =>
                        <Box
                          key={eachItem["item-unique"]}
                          my="8px"
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between">
                          <Box>
                            <Typography
                              paddingRight="6px"
                              fontSize="0.8rem"
                              fontFamily="Comme, sans-serif"
                            >{eachItem["item-name"]}</Typography>
                            {
                              eachItem.comment && <Typography
                                padding="0px 4px"
                                marginRight="12px"
                                fontSize="0.8rem"
                                fontFamily="Comme, sans-serif"
                                border="0.5px solid #000"
                                borderRadius="4px"
                              >{eachItem.comment}</Typography>
                            }
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
                            >{eachItem["item-count"]}</Typography>
                          </Box>
                        </Box>
                      )
                    }
                    <Box>
                      <FigureClick
                        icon={<NoteAltOutlinedIcon htmlColor="var(--white-X00)" />}
                        padding="12px"
                        clickWork={() => navigate(`${PATH_ORDER_EDITOR}?id=${orders[key]["table-number"]}`)}
                      />
                      <FigureClick
                        icon={<DeleteOutlineRoundedIcon htmlColor="var(--white-X00)" />}
                        padding="12px"
                        clickWork={() => confirmDelete(key)}
                      />
                      <FigureClick
                        id="cs-order-editor-go-switch"
                        icon={<DescriptionOutlinedIcon htmlColor="var(--white-X00)" />}
                        padding="12px"
                        clickWork={() => navigate(`${PATH_ORDER_PROCESSOR}?id=${orders[key]["table-number"]}`)}
                      />
                    </Box>
                  </Box>
                </Box>
              ))
            }
          </Box>
          <OPageAction
            clickAction={() => navigate(PATH_ORDER_EDITOR)}
          />
        </Box>
        <Box className="cs-component-col-2">
          <OrderEditor />
        </Box>
      </Box>
    </main>
  )
}
