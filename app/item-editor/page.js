"use client"
import { useEffect, useState } from "react";
import { Box, IconButton, InputBase, Typography, Button } from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FigureClick from "../../components/form-components/figureClick";
import { getAllCategories } from "../../utils/web/apis/categoryApis";
import { addCategory, deleteItemFromCategory } from "../../utils/web/apis/categoryApis";
import PageAction from "../../components/form-components/page-action";
import BottomNav from "../../components/bottomNav";
import Editor from "../../components/item-editor/editor";

export default function ItemEditor() {
  const [edibles, setEdibles] = useState([]);
  const [error, setError] = useState(null);
  const [formopen, setFormopen] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const _setEdibles = async () => {
    const res = await getAllCategories();
    setEdibles(res?.data?.mongodb?.content);
  }
  const toggleEdibles = (index) => {
    const ediblesClone = [...edibles]
    ediblesClone[index].expanded = !ediblesClone[index].expanded
    setEdibles(ediblesClone);
  }
  const _addCategory = async () => {
    const res = await addCategory({ name: categoryName })
    if(res?.data?.mongodb?.error) {
      setError(res.data.mongodb.error);
      return;
    }
    _setEdibles()
  }
  const _deleteItem = async (categoryName, itemName, index) => {
    if(confirm("Are you surely want to delete the item?")) {
      await deleteItemFromCategory({
        "category-name": categoryName,
        name: itemName,
        index,
      });
      _setEdibles();
      setFormopen(null);
    }
  }
  const calculateTableHeight = () => {
    var height = window.innerHeight - 143 - 65
    if(error) {
      height -= 24
    }
    return `${height}px`
  }
  useEffect(() => {
    _setEdibles()
  }, [])
  return (
    <main
      style={{
        height: "100vh",
        position: "relative"
      }}>
      {
        formopen &&
        <Editor
          data={formopen}
          _setEdibles={_setEdibles}
          _deleteItem={_deleteItem}
          handleClose={() => setFormopen(null)}
        />
      }
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between">
        <Box
          height={calculateTableHeight()}
          sx={{
            overflowX: "scroll"
          }}>
          <table>
            <thead>
              <tr>
                <td>
                  <Box
                    width="40px"
                    height="40px" />
                </td>
                <td width="70%">
                  <Box
                    height="40px"
                    display="flex"
                    alignItems="center"
                    paddingLeft="20px">
                    <Typography fontFamily="DM Sans, sans-serif">Name</Typography>
                  </Box>
                </td>
                <td width="30%">
                  <Box
                    height="40px"
                    display="flex"
                    alignItems="center"
                    paddingLeft="20px">
                    <Typography fontFamily="DM Sans, sans-serif">Price</Typography>
                  </Box>
                </td>
              </tr>
            </thead>
            <tbody>
              {
                edibles.map((each, index) =>
                  <>
                    <tr key={each.name}>
                      <td>
                        <Box
                          width="40px"
                          height="40px"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          onClick={() => toggleEdibles(index)}>
                          {
                            each.expanded ? <RemoveOutlinedIcon />
                            : <AddOutlinedIcon />
                          }
                        </Box>
                      </td>
                      <td width="70%" colSpan={2}>
                        <Box paddingLeft="20px">
                          <Typography fontFamily="DM Sans, sans-serif">{each.name}</Typography>
                        </Box>
                      </td>
                    </tr>
                    {
                      each.expanded &&
                      each["menu-items"]?.map((eachItem, index) =>
                        <tr key={`${eachItem.name}${index}`}>
                          <td
                            style={{
                              backgroundColor: "var(--gray-hard-500)"
                            }}>
                            <Box
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              onClick={() => setFormopen({
                                ...eachItem,
                                index
                              })}>
                              <InfoOutlinedIcon
                                fontSize="small"
                                htmlColor="var(--white-X00)"
                              />
                            </Box>
                          </td>
                          <td width="70%">
                            <Box
                              display="flex"
                              alignItems="center"
                              padding="8px 20px">
                              <Typography fontFamily="DM Sans, sans-serif">{eachItem.name}</Typography>
                            </Box>
                          </td>
                          <td width="30%">
                            <Box
                              height="40px"
                              display="flex"
                              alignItems="center"
                              paddingLeft="20px">
                              <Typography
                                fontFamily="DM Sans, sans-serif"
                              >{eachItem["selling-cost"]}</Typography>
                            </Box>
                          </td>
                        </tr>
                      )
                    }
                  </>
                )
              }
            </tbody>
          </table>
        </Box>
        <PageAction
          label="Add Item"
          clickAction={() => setFormopen({})}
        />
        <Box>
          <Typography color="var(--red-hard-500)">{error}</Typography>
          <Box
            display="flex">
            <InputBase
              placeholder="Category name"
              value={categoryName}
              onChange={event => setCategoryName(event.target.value)}
              sx={{
                width: "100%",
                border: "2px solid #000",
                fontFamily: "DM Sans",
                paddingLeft: "12px"
              }}
            />
            <FigureClick
              icon={<AddOutlinedIcon htmlColor="var(--white-X00)" />}
              clickWork={_addCategory}
            />
          </Box>
        </Box>
      </Box>
      <BottomNav />
    </main>
  )
}