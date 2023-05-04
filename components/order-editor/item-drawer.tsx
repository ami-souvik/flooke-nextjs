import { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Divider,
  InputBase,
  Typography,
  IconButton,
  Skeleton
} from "@mui/material";
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import FigureClick from "../form-components/figureClick";
import ItemLine from "./item-line";
import { getAllCategories } from "../../utils/web/apis/categoryApis";

interface ItemDrawerProps {
  addItem: (item: object) => void
  syncWithDatabase: () => void
}

export default function ItemDrawer({ addItem, syncWithDatabase }: ItemDrawerProps) : JSX.Element {
  const [ edibles, setEdibles ] = useState([]);
  const [isOpen, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(null);
  const _setCategory = async () => {
    setLoading(true);
    const res = await getAllCategories();
    if(res?.data?.mongodb?.content) {
      setLoading(false)
      setEdibles(res.data.mongodb.content);
      setCategory(res.data.mongodb.content[0]);
    }
  }
  useEffect(() => {
    _setCategory()
  }, [])
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
      sx={{
        width: 250,
        paddingX: 1,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {edibles?.map(each => (
          <>
            <ListItem key={each._id}>
              <ListItemButton
                onClick={() => setCategory(each)}>
                <Typography fontFamily="Montserrat">{each.name}</Typography>
              </ListItemButton>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Box>
  );
  
  return (
    <Box>
    {
      loading ?
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between">
        <Box>
          <Skeleton variant="rectangular" height={48} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} height={40} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} height={40} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} height={40} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} height={40} />
        </Box>
        <Skeleton variant="rounded" height={60} />
      </Box> :
      <>
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
        >{category?.name}</Box>
        <Box
          /** 12 full screen padding bottom */
          /** 39.5 header category name */
          /** 64 input field height */
          height="calc(50vh - 12px - 39.5px - 48px)"
          overflow="scroll">
          {
            category &&
            category["menu-items"]?.map(each => 
              <ItemLine
                key={each.unique}
                itemName={each.name}
                price={each["selling-cost"]}
                clickHandle={() => addItem(each)}
              />
            )
          }
        </Box>
        <Box display="flex">
          <InputBase
            sx={{
              flexGrow: 1,
              fontFamily: "Montserrat",
              padding: "0px 12px",
              borderWidth: "2px",
              borderStyle: "solid",
              borderColor: "var(--gray-hard-500)",
              color: "rgb(var(--foreground-rgb))",
              backgroundColor: "rgb(var(--background-end-rgb))"
            }}
          />
          <FigureClick
            icon={<PublishRoundedIcon htmlColor="var(--white-X00)" />}
            padding="12px"
            clickWork={syncWithDatabase}
          />
        </Box>
      </>
    }
    </Box>
  )
}