"use client";
import { useState, useContext } from 'react';
import { FirebaseRealtimeDB } from '../context/context'
import { ManagerCard } from '../components/card/types';
import Picker from '../components/picker';
import '../styles/components-st/card-pieces.css'

const views = ["Manager", "Chef", "Steward"]

export default function Home() {
  const { edibles, orders } = useContext(FirebaseRealtimeDB);
  const [view, setView] = useState(views[0]);
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
    </main>
  )
}
