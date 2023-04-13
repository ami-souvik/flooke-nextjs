"use client";
import { useState, useContext, useEffect } from 'react';
import { FirebaseRealtimeDB } from '../context/context'
import { ManagerCard } from '../components/card/types';
import { IconButton, Switch } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EditOffRoundedIcon from '@mui/icons-material/EditOffRounded';
import Editor from '../components/editor';
import BillPreview from '../components/billPreview';
import Picker from '../components/picker';
import { getDatestamp } from '../utils/helperUtils';

const views = ["Manager", "Chef", "Steward"]

export default function Home() {
  const { edibles, orders, pastOrders, deleteTable } = useContext(FirebaseRealtimeDB);
  const [view, setView] = useState(views[0]);
  const [openEd, setOpenEd] = useState(false);
  const [openPcs, setOpenPcs] = useState(false);
  const [active, setActive] = useState('1');
  const [todaysTotal, setTodaysTotal] = useState(0);
  const calculateTotal = () => {
    var total = 0
    Object.keys(pastOrders).forEach(each => {
      if(each.substring(0, 10) === getDatestamp()) {
        total += Number(pastOrders[each].orderComputation.billingAmount)
      }
    })
    setTodaysTotal(total)
  }
  useEffect(() => {
    calculateTotal()
  }, [pastOrders])
  return (
    <main>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Switch checked={!!edibles} color="success" />
        <h3 style={{ paddingRight: "12px" }}>Total: {todaysTotal}</h3>
      </div>
      <Picker
        label="View"
        values={views}
        active={view}
        setActive={setView}
      />
      {orders && Object.keys(orders).map(key => (
        <ManagerCard
          key={key}
          loading={orders ? false : true}
          title={key}
          orders={{
            details: orders[key].orderDetails,
            total: orders[key].orderComputation
              && orders[key].orderComputation.orderTotal
              ? orders[key].orderComputation.orderTotal : null,
            phnumber: orders[key].phnumber
          }}
          onEdit={() => {
            setOpenEd(true)
            setActive(key)
          }}
          onDelete={() => deleteTable(key)}
          onProcess={() => {
            setOpenPcs(true)
            setActive(key)
          }}
        />
      ))}
      {openEd &&
        <Editor
          title="Order editor"
          data={edibles}
          active={active}
        />
      }
      {openPcs &&
        <BillPreview
          table={active}
          handleClose={() => setOpenPcs(false)}
        />
      }
      <IconButton
        aria-label="edit"
        onClick={() => setOpenEd(!openEd)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          padding: "12px",
          backgroundColor: "#ddd"
        }}>
        {openEd ? <EditOffRoundedIcon fontSize="large" />
        : <EditRoundedIcon fontSize="large" />}
      </IconButton>
    </main>
  )
}
