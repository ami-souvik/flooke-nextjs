"use client"
import { useEffect, useState } from "react";
import { Box, IconButton, InputBase, Typography, Button } from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FigureClick from "../../components/form-components/figure-click";
import { getAllCategories } from "../../utils/web/apis/categoryApis";
import { addCategory, deleteItemFromCategory, bulkImportCategories } from "../../utils/web/apis/categoryApis";
import { IEPageAction } from "../../components/form-components/page-action";
import Editor from "../../components/item-editor/editor";
import TypeIn from "../../components/form-components/type-in";

export default function ItemEditor() {
  const [edibles, setEdibles] = useState([]);
  const [error, setError] = useState(null);
  const [formopen, setFormopen] = useState(null);
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
  const _addCategory = async value => {
    if(value) setError("Category name cannot be blank");
    const res = await addCategory({ name: value })
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
          /** 12 full screen padding bottom */
          /** 48 item editor actions height */
          height={`calc(100vh - 12px - 48px${error ? " - 24px" : ""})`}
          sx={{
            overflowY: "scroll"
          }}>
          <table
            width={window.innerWidth > 600 ? "600px" : "auto"}
            style={{
              margin: "8px"
            }}>
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
                edibles &&
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
                            fontWeight="200"
                            fontSize="1.2rem"
                          >{each.name}</Typography>
                        </Box>
                      </td>
                    </tr>
                    {
                      each.expanded &&
                      each["menu-items"]?.map((eachItem, index) =>
                        <>
                          <Box height="4px"/>
                          <tr
                            key={`${eachItem.name}${index}`}
                            style={{
                              borderRadius: "8px",
                              boxShadow: "0px 0px 8px var(--gray-subtle-500)"
                            }}>
                            <td>
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
                                  htmlColor="var(--gray-hard-X00)"
                                />
                              </Box>
                            </td>
                            <td width="70%">
                              <Box
                                display="flex"
                                alignItems="center"
                                padding="6px 12px">
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
                          <Box height="4px"/>
                        </>
                      )
                    }
                  </>
                )
              }
            </tbody>
          </table>
        </Box>
        <IEPageAction
          error={error}
          clearError={() => setError(null)}
          categoryAdd={_addCategory}
          itemAdd={() => setFormopen({})}
        />
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