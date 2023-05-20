import { Box, Typography, Modal } from "@mui/material"

const TableClick = ({ label, clickHandle }) => (
  <Box
    border="2px solid var(--gray-hard-500)"
    borderRadius="8px"
    padding="12px"
    marginY="6px"
    bgcolor="var(--primary-yellow)"
    onClick={clickHandle}>
    <Typography
      width="7rem"
      fontSize="1rem"
      fontFamily="Comme, sans-serif"
      textAlign="center">
      {label}
    </Typography>
  </Box>
)

const OrderEditorTablePick = ({
  open,
  options,
  pickTable,
  handleClose
}) => (
  <Modal
    keepMounted
    open={open}
    onClose={handleClose}
  >
    <Box
      sx={{
        width: "calc(100% - 30px)",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        padding: 3,
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: "var(--white-X00)",
        border: '4px solid var(--gray-hard-500)',
        boxShadow: 12,
      }}>
      {
        Object.keys(options).map(each => <TableClick
          key={each}
          label={options[each]}
          clickHandle={() => {
            pickTable(each)
            handleClose()
          }}
        />)
      }
    </Box>
  </Modal>
)

export default OrderEditorTablePick;