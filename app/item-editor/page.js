"use client"
import { useEffect, useState } from "react";
import { Box, IconButton, InputBase, Typography, Button } from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FigureClick from "../../components/form-components/figureClick";
import { getAllCategories } from "../../utils/web/apis/categoryApis";
import { addCategory, deleteItemFromCategory, bulkImportCategories } from "../../utils/web/apis/categoryApis";
import { IEPageAction } from "../../components/form-components/page-action";
import Editor from "../../components/item-editor/editor";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

export default function ItemEditor() {
  const [edibles, setEdibles] = useState([]);
  const [error, setError] = useState(null);
  const [formopen, setFormopen] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [fileContent, setFileContent] = useState(null);
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
  const handleFile = file => {
    const fileReader = new FileReader();
    fileReader.onloadend = e => {
      const content = fileReader.result;
      setFileContent(content);
    }
    fileReader.readAsText(file);
  }
  const calculateTableHeight = () => {
    var height = window.innerHeight - 56 - 64
    if(error) {
      height -= 24
    }
    return `${height}px`
  }
  const _bulkImportCategories = () => {
    const contents = fileContent.split('\r\n');
    const lineItems = []
    contents.slice(1, contents.length).forEach(eachContent => {
      const lineItem = {}
      const elements = eachContent.split(',');
      lineItem["category-name"] = elements[0]
      lineItem.name = elements[1]
      lineItem.serving = elements[2]
      lineItem["processing-cost"] = elements[3]
      lineItem["selling-cost"] = elements[4]
      lineItems.push(lineItem);
    });
    bulkImportCategories(lineItems);
  }
  useEffect(() => {
    _setEdibles()
  }, [])
  return (
    <main
      style={{
        height: "100vh",
        position: "relative",
        display: window.innerWidth > 600 ? "flex" : "block",
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
          <table
            width={window.innerWidth > 600 ? "600px" : "auto"}>
            <thead>
              <tr>
                <td>
                  <Box width="40px" />
                </td>
                <td width="70%">
                  <Box
                    display="flex"
                    alignItems="center"
                    padding="4px 12px">
                    <Typography
                      fontFamily="Comme, sans-serif"
                      fontWeight="400"
                      fontSize="0.8rem"
                    >Name</Typography>
                  </Box>
                </td>
                <td width="30%">
                  <Box
                    display="flex"
                    alignItems="center"
                    padding="4px 8px">
                    <Typography
                      fontFamily="Comme, sans-serif"
                      fontWeight="400"
                      fontSize="0.8rem"
                    >Price</Typography>
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
                        <Box
                          padding="2px 12px">
                          <Typography
                            fontFamily="Comme, sans-serif"
                            fontWeight="800"
                            fontSize="1rem"
                          >{each.name}</Typography>
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
                              padding="4px 12px">
                              <Typography
                                fontFamily="Comme, sans-serif"
                                fontSize="0.8rem"
                              >{eachItem.name}</Typography>
                            </Box>
                          </td>
                          <td width="30%">
                            <Box
                              display="flex"
                              alignItems="center"
                              paddingLeft="20px">
                              <Typography
                                fontFamily="Comme, sans-serif"
                                fontSize="0.8rem"
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
        <IEPageAction
          clickAction={() => setFormopen({})}
        />
        <Box>
          <Typography color="var(--red-hard-500)">{error}</Typography>
          <Box
            display="flex">
            <InputBase
              placeholder="Category name"
              value={categoryName}
              onChange={event => {
                setError(null)
                setCategoryName(event.target.value)
              }}
              sx={{
                width: "100%",
                border: "2px solid #000",
                fontFamily: "Comme",
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
      {
        window.innerWidth > 600 &&
        <Box
          height="100vh"
          position="relative">
          <Box
            height="calc(100vh - 36px)"
            sx={{
              overflowY: "scroll"
            }}>
            {
              fileContent &&
              <table>
                <thead>
                  <tr>
                    {
                      fileContent?.split('\r\n')[0]?.split(',')?.map((element, index) =>
                        <th
                          key={index}
                          style={{
                            textAlign: "left",
                            padding: "0px 8px"
                          }}>
                          <Typography
                            fontFamily="DM Sans"
                            fontSize="0.8rem"
                          >{element}</Typography>
                        </th>
                      )
                    }
                  </tr>
                </thead>
                <tbody>
                  {
                    fileContent?.split('\r\n').slice(1,
                      fileContent?.split('\r\n').length).map((elements, index) => 
                      <tr key={index}>
                        {
                          elements.split(',')?.map((element, ind2) =>
                          <td
                            key={ind2}
                            style={{
                              padding: "0px 8px"
                            }}>
                            <Typography
                              fontFamily="DM Sans"
                              fontSize="0.8rem"
                              textAlign={ind2 > 1 && "right"}
                            >{element}</Typography>
                          </td>)
                        }
                      </tr>
                    )
                  }
                </tbody>
              </table>
            }
          </Box>
          <Box
            position="absolute"
            bottom="0px"
            display="flex">
            <Button
              variant="contained"
              component="label"
              sx={{
                marginRight: "8px",
                boxShadow: "none",
                ":hover": {
                  boxShadow: "none"
                }
              }}
            >
              <FileDownloadOutlinedIcon />
              <input
                type="file"
                hidden
                accept=".csv"
                onChange={e => handleFile(e.target.files[0])}
              />
            </Button>
            <Button
              variant="outlined"
              onClick={_bulkImportCategories}
            >Import</Button>
          </Box>
        </Box>
      }
    </main>
  )
}