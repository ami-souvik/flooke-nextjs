"use client";
import { useContext, useState } from 'react';
import { FirebaseRealtimeDB } from '../../context/context'
import Preview from "./preview";
import TemporaryDrawer from './temporaryDrawer';

export default function OrderEditor() {
  const { edibles, orders } = useContext(FirebaseRealtimeDB);
  console.log(edibles);
  console.log(orders);
  const [category, setCategory] = useState(null)
  const [item, setItem] = useState(null)
  return (
    <div>
      <Preview />
      <h1>{category}</h1>
      <h1>{item}</h1>
      <TemporaryDrawer
        anchor='bottom'
        label='Choose Category'
        values={Object.keys(edibles)}
        setValue={(e, d) => setCategory(e.target.innerText)}
      />
      <TemporaryDrawer
        anchor='bottom'
        label='Pick Item'
        values={Object.keys(
          edibles && edibles[category] ? edibles[category] : []
        )}
        setValue={(e) => setItem(e.target.innerText)}
      />
    </div>
  );
}
