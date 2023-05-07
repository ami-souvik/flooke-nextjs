import { useEffect, useState } from 'react';
import { Box, Divider, Skeleton, Typography } from '@mui/material';
import { DialogCase } from '../overlays/dialog-case';
import PreviewCardLine from './preview-card-line';
import OrderEditorTablePick from '../overlays/order-editor-table-pick';
import { TABLES_MAP } from '../../utils/constantUtils';

interface PreviewCardProps {
  loading: boolean
  data: object
  compare: object
  changed: boolean
  setChanged: (v: boolean) => void
  deleteItem: (item: object) => void
  table: object
  setCount: (item: object, count: number) => void
  setTable: (table: object) => void
}

export default function PreviewCard({
  loading = false,
  data = {},
  compare={},
  changed,
  setChanged,
  deleteItem,
  table,
  setCount = null,
  setTable = null
}: PreviewCardProps) : JSX.Element {
  const [overlay, setOverlay] = useState(false);
  const [guestOpen, setGuestOpen] = useState(false);
  const [guest, setGuest] = useState({});
  const _compare = () => {
    let flag = false
    const merged = JSON.parse(JSON.stringify({...data, ...compare}));
    Object.keys(merged).forEach(each => {
      if(compare[each] && !data[each]) {
        flag = true
        merged[each].deleted = true
      }
      else if(!compare[each] && data[each]) {
        flag = true
        merged[each].added = true
      }
      else if(compare[each] && data[each]
      && !(compare[each]["item-count"] === data[each]["item-count"])) {
        flag = true
        merged[each]["item-count"] = data[each]["item-count"]
        merged[each].updated = true
      }
    })
    setChanged(flag)
    return merged;
  }
  const compared = _compare();
  return (<div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      borderStyle: "solid",
      borderColor: "var(--gray-hard-500)",
      borderWidth: "4px"
    }}>
    <DialogCase
      open={guestOpen}
      setOpen={setGuestOpen}
    >
      <></>
    </DialogCase>
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
        compared &&
        Object.keys(compared).length > 0 ?
        Object.keys(compared).reverse().map(each =>
          <>
            <PreviewCardLine
              key={compared[each]["item-unique"]}
              added={compared[each].added}
              updated={compared[each].updated}
              deleted={compared[each].deleted}
              deleteItem={() => deleteItem(compared[each])}
              itemName={compared[each]["item-name"]}
              count={compared[each]["item-count"]}
              setCount={c => setCount(compared[each], c)}
            />
            <Divider />
          </>
        ) :
        <Typography>{"Table doesn't have an order"}</Typography>
      }
    </Box>
    <Box display="flex">
      <Box
        flexGrow={1}
        padding="4px"
        bgcolor="var(--primary-purple)"
        onClick={() => setGuestOpen(true)}>
        <Typography
          color="var(--white-X00)"
          fontSize="0.6rem"
          fontFamily="Comme, sans-serif"
        >Guest Details</Typography>
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