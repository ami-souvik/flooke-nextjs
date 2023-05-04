import { useEffect, useState } from 'react';
import { Box, Skeleton, Typography } from '@mui/material';
import PreviewCardLine from './preview-card-line';
import OrderEditorTablePick from '../overlays/order-editor-table-pick';
import { TABLES_MAP } from '../../utils/constantUtils';

interface PreviewCardProps {
  loading: boolean
  data: any
  deleteItem: (item: object) => void
  table: object
  setCount: (item: object, count: number) => void
  setTable: (table: object) => void
}

export default function PreviewCard({
  loading = false,
  data = {},
  deleteItem,
  table,
  setCount = null,
  setTable = null
}: PreviewCardProps) : JSX.Element {
  const [overlay, setOverlay] = useState(false);
  return (<div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      borderStyle: "solid",
      borderColor: "var(--gray-hard-500)",
      borderWidth: "4px"
    }}>
    <OrderEditorTablePick
      open={overlay}
      options={TABLES_MAP}
      pickTable={setTable}
      handleClose={() => setOverlay(false)}
    />
    <Box
      /** 12 full screen padding top and preview card border */
      /** 8 element border width x2 */
      /** 46.4 bottom button case height */
      height="calc(50vh - 12px - 8px - 46.6px)"
      overflow="scroll"
      style={{
        paddingTop: "12px",
        paddingLeft: "12px",
        paddingBottom: "12px"
      }}>
      {
        loading ?
        <Box
          display="flex"
          flexDirection="column"
          paddingRight="12px">
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} height={40} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} height={40} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} height={40} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} height={40} />
        </Box> :
        data &&
        Object.keys(data).length > 0 ?
        Object.keys(data).map(each =>
          <PreviewCardLine
            key={data[each]["item-unique"]}
            deleteItem={() => deleteItem(data[each])}
            itemName={data[each]["item-name"]}
            count={data[each]["item-count"]}
            setCount={c => setCount(data[each], c)}
          />
        ) :
        <Typography>{"Table doesn't have an order"}</Typography>
      }
    </Box>
    <Box
      sx={{
        display: "flex"
      }}>
      <Box
        flexGrow={1}
        padding="4px"
        bgcolor="var(--primary-purple)">
        <Typography fontSize="1.6rem" fontFamily="Montserrat">Guest Details</Typography>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        padding="4px 16px"
        bgcolor="var(--primary-yellow)"
        onClick={() => setOverlay(true)}>
        <Typography
          fontSize="1.2rem"
          fontFamily="Montserrat"
        >{TABLES_MAP[table]}</Typography>
      </Box>
    </Box>
  </div>)
}