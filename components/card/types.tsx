import Skeleton from '@mui/material/Skeleton'
import Pieces from "./pieces"

export const ManagerCard = ({
  title,
  orders = {},
  onEdit = null,
  onDelete = null,
  onProcess = null,
  loading = true
}) : JSX.Element => {
  return loading ?
  (<Skeleton variant="text" sx={{ fontSize: '1rem' }} />) :
  (
    <Pieces.Basic>
      <Pieces.Header
        title={title}
        total={orders.total}
      />
      <h3>{orders.phnumber}</h3>
      <Pieces.Body
        details={orders.details}
        onEdit={onEdit}
        onDelete={onDelete}
        onProcess={onProcess}
      />
    </Pieces.Basic>
  )
}