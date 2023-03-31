"use client";
import { useState, useContext } from 'react';
import { FirebaseRealtimeDB } from '../context/context'
import { ManagerCard } from '../components/card/types';
import IconButton from '@mui/material/IconButton';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EditOffRoundedIcon from '@mui/icons-material/EditOffRounded';
import Editor from '../components/editor';
import Picker from '../components/picker';
import '../styles/components-st/card-pieces.css'

const views = ["Manager", "Chef", "Steward"]

export default function Home() {
  const { edibles, orders } = useContext(FirebaseRealtimeDB);
  const [view, setView] = useState(views[0]);
  const [openEd, setOpenEd] = useState(false);
  return (
    <main>
      <Picker
        label="View"
        values={views}
        active={view}
        setActive={setView}
      />
      {orders && Object.keys(orders).map(key => (
        <ManagerCard
          loading={orders ? false : true}
          title={key}
          orders={{
            details: orders[key].orderDetails
          }}
        />
      ))}
      {openEd &&
        <Editor
          title="Order editor"
          data={edibles}
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
