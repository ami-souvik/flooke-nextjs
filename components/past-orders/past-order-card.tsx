import { Box, Typography } from "@mui/material";
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import FigureClick from "../form-components/figure-click";
import { WRAPPER_BASE_URL } from "../../utils/constantUtils";
import { convertUTCtoLocalDate } from "../../utils/helperUtils.ts";

const PastOrderCard = ({ data = {} }) => {
  return (
    <>
      <Typography
        fontSize="0.8rem">{convertUTCtoLocalDate(data["order-date"])}</Typography>
      <Box
        width="100%"
        display="flex"
        alignItems="flex-start"
        p="12px 16px"
        marginBottom="12px"
        borderRadius="20px"
        boxShadow="0px 0px 8px var(--gray-subtle-500)">
        <Box
          className="cs-past-order-card-left"
          padding="0px 5px">
          {
            data["order-details"].map((each, index) => 
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                padding="2px 0px">
                <Typography
                  padding="0px 3px"
                  fontWeight="100"
                  fontSize="0.8rem"
                  fontFamily="Comme, sans-serif">{each["item-name"]}</Typography>
                <Typography
                  padding="0px 4px"
                  border="0.5px solid var(--gray-hard-500)"
                  borderRadius="4px"
                  fontWeight="600"
                  fontSize="0.8rem"
                  fontFamily="Comme, sans-serif">{each.price}</Typography>
              </Box>
            )
          }
        </Box>
        <Box
          className="cs-past-order-card-right"
          padding="0px 5px">
          <Box
            className="elements"
            display="flex"
            justifyContent="space-between">
            <Typography
              fontSize="0.8rem"
              className="cs-discount-given-key"
            />
            <Typography
              fontSize="inherit">{data["discount-given"]}%</Typography>
          </Box>
          <Box
            className="elements"
            display="flex"
            justifyContent="space-between">
            <Typography
              fontSize="0.8rem"
              className="cs-billed-amount-key"
            />
            <Typography
              fontSize="inherit">{data["billed-amount"]}/-</Typography>
          </Box>
        </Box>
        <FigureClick
          icon={<PrintRoundedIcon htmlColor="var(--white-X00)" />}
          padding="12px"
          margin="4px"
          clickWork={() => parent.window.postMessage({
            method: "print",
            content: []
          }, WRAPPER_BASE_URL)}
        />
      </Box>
    </>
  )
}

export default PastOrderCard;