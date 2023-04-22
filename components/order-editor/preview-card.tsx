import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import PreviewCardLine from './preview-card-line';
import OrderEditorTablePick from '../overlays/order-editor-table-pick';

interface PreviewCardProps {
  data: any,
  setCount: any,
  setItem: any,
  setCategory: any
}

const elementInnerHeight = window.innerHeight/2
 - 12 /** full screen padding top */
 - 48 /** screen header height */
 - 8 /** element border width x2 */
 - 46.4 /** bottom button case height */
 - 10 /** divider half height */

export default function PreviewCard({
  data = {},
  setCount = null,
  setItem = null,
  setCategory = null
}: PreviewCardProps) : JSX.Element {
  const [overlay, setOverlay] = useState(false);
  return (<div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      borderStyle: "solid",
      borderColor: "var(--foreground-rgb)",
      borderWidth: "4px"
    }}>
    <OrderEditorTablePick open={overlay} handleClose={() => setOverlay(false)} />
    <Box
      height={`${elementInnerHeight}px`}
      overflow="scroll"
      style={{
        paddingTop: "12px",
        paddingLeft: "12px",
        paddingBottom: "12px"
      }}>
      <PreviewCardLine itemName="Honey mustard chicken sandwich" />
      <PreviewCardLine itemName="Barbecue Lollipop" />
      <PreviewCardLine itemName="Honey mustard chicken sandwich" />
      <PreviewCardLine itemName="Barbecue Lollipop" />
      <PreviewCardLine itemName="Honey mustard chicken sandwich" />
      <PreviewCardLine itemName="Barbecue Lollipop" />
      <PreviewCardLine itemName="Honey mustard chicken sandwich" />
      <PreviewCardLine itemName="Barbecue Lollipop" />
      <PreviewCardLine itemName="Honey mustard chicken sandwich" />
      <PreviewCardLine itemName="Barbecue Lollipop" />
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
        padding="4px"
        bgcolor="var(--primary-yellow)"
        onClick={() => setOverlay(true)}>
        <Typography fontSize="1.6rem" fontFamily="Montserrat">Table 1</Typography>
      </Box>
    </Box>
  </div>)
}