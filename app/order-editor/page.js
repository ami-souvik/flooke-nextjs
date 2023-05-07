"use client"
import { useEffect, useState } from "react";
import { Box, InputBase } from "@mui/material";
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import FigureClick from "../../components/form-components/figureClick";
import PreviewCard from "../../components/order-editor/preview-card";
import ItemDrawer from "../../components/order-editor/item-drawer";
import { addActiveOrder, readActiveOrder, deleteActiveOrder } from "../../utils/web/apis/activeOrderApis";
import { setAlertWithDelay } from "../../store/services/uiServices";

export default function OrderEditor() {
  const queryParameters = new URLSearchParams(window.location.search)
  const tableId = queryParameters.get("id")
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState({});
  const [details, setDetails] = useState({});
  const [changed, setChanged] = useState(false);
  const [table, setTable] = useState(tableId || "table1");
  const setItemCount = (item, count) => {
    const {
      "item-unique": itemUnique
    } = item;
    const _details = {...details}
    if(_details[itemUnique]) {
      _details[itemUnique]["item-count"] = count;
    }
    else {
      _details[itemUnique] = {
        "category-name": item["category-name"],
        "item-count": count,
        "item-name": item.name,
        price: item.price,
      }
    }
    setDetails(_details);
  }
  const addItem = (item) => {
    const {
      "unique": itemUnique,
      "selling-cost": price
    } = item;
    const _details = {...details}
    if(_details[itemUnique]) {
      _details[itemUnique]["item-count"] += 1;
    }
    else {
      _details[itemUnique] = {
        "category-name": item["category-name"],
        "item-count": 1,
        "item-name": item.name,
        "item-unique": item.unique,
        price
      }
    }
    setDetails(_details);
  }
  const deleteItem = (item) => {
    const _details = {...details}
    delete _details[item["item-unique"]];
    setDetails(_details);
  }
  const _readActiveOrder = async () => {
    setLoading(true);
    const res = await readActiveOrder({
      "table-number": table
    })
    if(res?.data?.firebase?.content) {
      const _details = res.data.firebase.content["order-details"]
      const _detailsObj = {}
      _details?.forEach(each => {
        _detailsObj[each["item-unique"]] = each
      })
      setContent(JSON.parse(JSON.stringify(_detailsObj)));
      setDetails(_detailsObj);
      setLoading(false);
    }
    else if(res?.data?.firebase?.error) {
      setAlertWithDelay({
        status: "error",
        message: res.data.firebase.error
      });
    }
    else {
      setAlertWithDelay({
        status: "error",
        message: "Something went wrong"
      });
    }
  }
  const syncWithDatabase = async () => {
    const apiDetails = {};
    if(Object.values(details).length === 0) {
      if(confirm("Are you surely want to delete the table?")) {
        deleteActiveOrder({ "table-number": table });
      }
      return;
    }
    else {
      apiDetails["table-number"] = table;
      apiDetails["order-details"] = Object.values(details);
    }
    const res = await addActiveOrder(apiDetails);
    if(res?.data?.firebase?.error) {
      setAlertWithDelay({
        status: "error",
        message: res.data.firebase.error
      });
    }
    else if(res?.data?.firebase?.status) {
      setAlertWithDelay({
        status: "success",
        message: res.data.firebase.status
      });
      _readActiveOrder();
    }
    else {
      setAlertWithDelay({
        status: "error",
        message: "Something went wrong"
      });
    }
  }
  useEffect(() => {
    _readActiveOrder();
  }, [table])
  return (
    <div
      style={{
        height: "calc(100vh - 48px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "12px"
      }}>
      <PreviewCard
        loading={loading}
        data={details}
        compare={content}
        changed={changed}
        setChanged={setChanged}
        table={table}
        setCount={setItemCount}
        deleteItem={deleteItem}
        setTable={setTable}
      />
      <ItemDrawer
        addItem={addItem}
        syncWithDatabase={syncWithDatabase}
      />
      <Box
        width="calc(100% - 24px)"
        display="flex"
        position="absolute"
        bottom="0px">
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
          disabled={!changed}
          icon={<PublishRoundedIcon htmlColor="var(--white-X00)" />}
          padding="12px"
          clickWork={syncWithDatabase}
        />
      </Box>
    </div>
  );
}
