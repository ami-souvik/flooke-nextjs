"use client"
import { Box } from "@mui/material";
import Header from "../../components/header"
import PreviewCard from "../../components/order-editor/preview-card";
import ItemDrawer from "../../components/order-editor/item-drawer";

export default function OrderEditor() {
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
      <ItemDrawer />
    </div>
  );
}
