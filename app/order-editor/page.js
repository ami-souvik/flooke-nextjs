"use client"
import { useEffect, useState } from "react";
import PreviewCard from "../../components/order-editor/preview-card";
import ItemDrawer from "../../components/order-editor/item-drawer";
import { addActiveOrder, readActiveOrder, deleteActiveOrder } from "../../utils/web/apis/activeOrderApis";
import { setAlertWithDelay } from "../../store/services/uiServices";

export default function OrderEditor() {
  const queryParameters = new URLSearchParams(window.location.search)
  const tableId = queryParameters.get("id")
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
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
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "12px"
      }}>
      <PreviewCard
        loading={loading}
        data={details}
        table={table}
        setCount={setItemCount}
        deleteItem={deleteItem}
        setTable={setTable}
      />
      <ItemDrawer
        addItem={addItem}
        syncWithDatabase={syncWithDatabase}
      />
    </div>
  );
}
