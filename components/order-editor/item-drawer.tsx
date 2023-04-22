import { useState } from "react";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, TextField } from "@mui/material";
import ItemLine from "./item-line";

interface ItemDrawerProps {}

export default function ItemDrawer({}: ItemDrawerProps) : JSX.Element {
  const [isOpen, setDrawer] = useState(false);
  const [category, setCategory] = useState('Appetizers');

  const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setDrawer(open);
    };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  
  return (
    <Box>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
      <Box
        onClick={toggleDrawer(true)}
        sx={{
          color: "var(--white-X00)",
          fontFamily: "Montserrat",
          bgcolor: "var(--gray-hard-500)",
          fontSize: "1.2rem",
          padding: "8px 12px",
          textAlign: "right"
        }}
      >{category}</Box>
      <Box
        /** 12 full screen padding bottom */
        /** 39.5 header category name */
        /** 64 input field height */
        /** 10 divider half height */
        height="calc(50vh - 12px - 39.5px - 64px - 10px)"
        overflow="scroll">
        <ItemLine itemName="Chicken Dry Fry" price={189} />
        <ItemLine itemName="Fish & Chips" price={189} />
        <ItemLine itemName="Barbecue Wings" price={189} />
        <ItemLine itemName="Chicken Dry Fry" price={189} />
        <ItemLine itemName="Fish & Chips" price={189} />
        <ItemLine itemName="Barbecue Wings" price={189} />
        <ItemLine itemName="Chicken Dry Fry" price={189} />
        <ItemLine itemName="Fish & Chips" price={189} />
        <ItemLine itemName="Barbecue Wings" price={189} />
        <ItemLine itemName="Chicken Dry Fry" price={189} />
        <ItemLine itemName="Fish & Chips" price={189} />
        <ItemLine itemName="Barbecue Wings" price={189} />
        <ItemLine itemName="Chicken Dry Fry" price={189} />
        <ItemLine itemName="Fish & Chips" price={189} />
        <ItemLine itemName="Barbecue Wings" price={189} />
      </Box>
      <TextField
        sx={{
          width: "100%",
          fontFamily: "Montserrat",
          borderWidth: "4px",
          borderStyle: "solid",
          borderColor: "rgb(var(--foreground-rgb))",
          color: "rgb(var(--foreground-rgb))",
          backgroundColor: "rgb(var(--background-end-rgb))"
        }}/>
    </Box>
  )
}