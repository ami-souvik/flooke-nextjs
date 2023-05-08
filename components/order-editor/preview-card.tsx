import { useState } from 'react';
import { Box, Divider, Skeleton, Typography } from '@mui/material';
import PreviewCardLine from './preview-card-line';


interface PreviewCardProps {
  loading: boolean
  data: object
  compare: object
  setChanged: (v: boolean) => void
  deleteItem: (item: object) => void
  table: object
  setComment: (unique: string, v: string) => void
  setSelected: (unique: string) => void
  setCount: (item: object, count: number) => void
  setTable: (table: object) => void
}

export default function PreviewCard({
  loading = false,
  data = {},
  compare = {},
  setChanged,
  deleteItem,
  table,
  setComment,
  setSelected,
  setCount = null,
  setTable = null
}: PreviewCardProps) : JSX.Element {
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
      && (!(compare[each]["item-count"] === data[each]["item-count"])
      || !(compare[each].comment === data[each].comment))) {
        flag = true
        merged[each]["item-count"] = data[each]["item-count"]
        merged[each].comment = data[each].comment
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
        Object.keys(compared).reverse().map((each, index) =>
          <Box
            key={index}
            onClick={() => setSelected(each["item-unique"])}>
            <PreviewCardLine
              key={compared[each]["item-unique"]}
              added={compared[each].added}
              updated={compared[each].updated}
              deleted={compared[each].deleted}
              deleteItem={() => deleteItem(compared[each])}
              itemName={compared[each]["item-name"]}
              itemComment={compared[each].comment}
              setComment={v => setComment(compared[each]["item-unique"], v)}
              count={compared[each]["item-count"]}
              setCount={c => setCount(compared[each], c)}
            />
            <Divider />
          </Box>
        ) :
        <Typography
          fontFamily="Comme, sans-serif"
          fontSize="0.8rem"
        >{"Table doesn't have an order"}</Typography>
      }
    </Box>
  </div>)
}