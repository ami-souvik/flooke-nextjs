import { Box, Typography } from "@mui/material";
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FigureClick from "../form-components/figure-click";
import { TABLES_MAP, PATH_ORDER_EDITOR, PATH_ORDER_PROCESSOR, WRAPPER_BASE_URL } from "../../utils/constantUtils";
import { navigate } from '../../utils/helperUtils.ts';

interface ManagerViewProps {
  orders: object
  confirmDelete: (v: string) => void
}

const ManagerView = ({ orders={}, confirmDelete }: ManagerViewProps): JSX.Element => 
  <>
  {
    orders &&
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
          <Box>
            <FigureClick
              id="cs-order-editor-go-switch"
              icon={<NoteAltOutlinedIcon htmlColor="var(--white-X00)" />}
              padding="12px"
              margin="0px 2px"
              clickWork={() => navigate(`${PATH_ORDER_EDITOR}?id=${orders[key]["table-number"]}`)}
            />
            <FigureClick
              icon={<DeleteOutlineRoundedIcon htmlColor="var(--white-X00)" />}
              padding="12px"
              margin="0px 2px"
              clickWork={() => confirmDelete(key)}
            />
            <FigureClick
              icon={<DescriptionOutlinedIcon htmlColor="var(--white-X00)" />}
              padding="12px"
              margin="0px 2px"
              clickWork={() => navigate(`${PATH_ORDER_PROCESSOR}?id=${orders[key]["table-number"]}`)}
            />
            <FigureClick
              icon={<PrintRoundedIcon htmlColor="var(--white-X00)" />}
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
    ))
  }
  </>

export default ManagerView;