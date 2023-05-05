"use client";
import { useContext } from 'react';
import { FirebaseRealtimeDB } from '../context/context'
import { Box, Button, IconButton, Typography } from '@mui/material';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { OPageAction } from '../components/form-components/page-action';
import { deleteActiveOrder } from '../utils/web/apis/activeOrderApis';
import { TABLES_MAP } from '../utils/constantUtils';

export default function Home() {
  const { orders } = useContext(FirebaseRealtimeDB);
  return (
    <main
      suppressHydrationWarning
      style={{
        height: "100vh",
        position: "relative"
      }}>
      <Box
        height={`${window.innerHeight - 60.5}px`}
        sx={{
          overflowY: "scroll"
        }}>
        {
          orders &&
          Object.keys(orders).map((key, index) => (
            <Box key={index}>
              <Typography
                mx="12px"
                fontSize="2rem"
                fontFamily="DM Sans"
              >{TABLES_MAP[orders[key]["table-number"]]}</Typography>
              <Box
                m="12px"
                px="24px"
                py="12px"
                borderRadius="4px"
                boxShadow="0px 0px 2px #000">
                {
                  orders[key]["order-details"].map(
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
                <Box>
                  <IconButton
                    onClick={() => {
                      window.open(`/order-editor?id=${orders[key]["table-number"]}`, '_self');
                    }}>
                    <NoteAltOutlinedIcon fontSize="large" />
                  </IconButton>
                  <IconButton onClick={() => {
                    if(confirm("Are you surely want to delete the table?")) {
                      deleteActiveOrder({ "table-number": orders[key]["table-number"] });
                    }
                  }}>
                    <DeleteOutlineRoundedIcon fontSize="large" />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      window.open(`/order-processor?id=${orders[key]["table-number"]}`, '_self');
                    }}>
                    <DescriptionOutlinedIcon fontSize="large" />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          ))
        }
      </Box>
      <OPageAction
        clickAction={() => window.open('/order-editor', '_self')}
      />
    </main>
  )
}
