import Skeleton from '@mui/material/Skeleton'
import Pieces from "./pieces"

export const ManagerCard = ({
  title,
  orders = {},
  loading = true
}) : JSX.Element => {
  return loading ?
  (<Skeleton variant="text" sx={{ fontSize: '1rem' }} />) :
  (
    <Pieces.Basic polish={{ padding: 0 }}>
      <Pieces.Header
        title={title}
        total="498"
      />
      <Pieces.Body details={orders.details} />
    </Pieces.Basic>
  )
}