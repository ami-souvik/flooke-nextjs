import { Box, Typography } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { convertUTCtoLocalDate } from "../../utils/helperUtils.ts";

const GuestDetailsCard = ({ data = {} }) => {
  return (
    <>
      <Typography
        fontSize="0.8rem">{convertUTCtoLocalDate(data["created-date"])}</Typography>
      <Box
        width="100%"
        display="flex"
        p="12px 16px"
        marginBottom="12px"
        borderRadius="20px"
        boxShadow="0px 0px 8px var(--gray-subtle-500)">
        <Box
          className="cs-past-order-card-left"
          padding="0px 5px">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            padding="2px 0px">
            <Typography
              padding="0px 3px"
              fontWeight="100"
              fontSize="0.8rem"
              fontFamily="Comme, sans-serif">{data.name}</Typography>
            <Typography
              padding="0px 4px"
              border="0.5px solid var(--gray-hard-500)"
              borderRadius="4px"
              fontWeight="600"
              fontSize="0.8rem"
              fontFamily="Comme, sans-serif">{data["phone-number"]}</Typography>
            {data["is-whatsapp"] ? (
              <CheckBoxIcon
                fontSize="small"
                htmlColor="var(--lightblue-400)"
              />
            ) : (
              <CheckBoxOutlineBlankIcon
                fontSize="small"
                htmlColor="var(--lightblue-400)"
              />
            )}
            {/* <Typography
              padding="0px 4px"
              border="0.5px solid var(--gray-hard-500)"
              borderRadius="4px"
              fontWeight="600"
              fontSize="0.8rem"
              fontFamily="Comme, sans-serif">{data["is-whatsapp"]}</Typography> */}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default GuestDetailsCard;