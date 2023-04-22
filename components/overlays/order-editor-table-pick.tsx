import { Box, Typography, Modal } from "@mui/material"

const TableClick = ({ label }) => (
  <Box
    border="8px solid var(--gray-hard-500)"
    borderRadius="16px"
    padding="12px"
    bgcolor="var(--primary-yellow)"
    >
    <Typography
      width="7rem"
      fontSize="1.6rem"
      fontFamily="Montserrat">
      {label}
    </Typography>
  </Box>
)

const TableClickLine = ({
  leftLabel,
  rightLabel
}) => (
  <Box
    display="flex"
    justifyContent="space-between">
    <TableClick label={leftLabel} />
    <TableClick label={rightLabel} />
  </Box>
)

const OrderEditorTablePick = ({
  open,
  handleClose
}) => (
  <Modal
    keepMounted
    open={open}
    onClose={handleClose}
  >
    <Box
      sx={{
        padding: 4,
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: "var(--white-X00)",
        border: '8px solid var(--gray-hard-500)',
        boxShadow: 24,
      }}>
      <TableClickLine leftLabel="Table 1" rightLabel="Table 2" />
      <TableClickLine leftLabel="Table 3" rightLabel="Table 4" />
      <TableClickLine leftLabel="Table 5" rightLabel="Table 6" />
      <TableClickLine leftLabel="Table 7" rightLabel="Table 8" />
      <TableClickLine leftLabel="Table 9" rightLabel="Table 10" />
    </Box>
  </Modal>
)

export default OrderEditorTablePick;