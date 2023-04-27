"use client"
import { useState } from "react";
import { Box } from "@mui/material";
import Header from "../../components/header"
import PreviewCard from "../../components/order-editor/preview-card";
import ItemDrawer from "../../components/order-editor/item-drawer";

export default function OrderEditor() {
  const [details, setDetails] = useState({})
  const addItem = (item, count) => {
    const _details = {...details}
    _details[item.unique] = {
      "category-name": item["category-name"],
      "item-count": count,
      "item-name": item.name,
      "item-unique": item.unique
    }
    setDetails(_details);
  }
  const deleteItem = (item) => {
    const _details = {...details}
    delete _details[item.unique];
    setDetails(_details);
  }
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "12px"
      }}>
      <Header label="Order Editor"/>
      <PreviewCard />
      <ItemDrawer
        addItem={addItem}
        deleteItem={deleteItem}
      />
    </div>
  );
}
