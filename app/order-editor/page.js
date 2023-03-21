"use client";
import { useContext } from 'react';
import { FirebaseRealtimeDB } from '../../context/context'
import Preview from "./preview";
import TemporaryDrawer from './temporaryDrawer';

export default function OrderEditor() {
  const { edibles, orders } = useContext(FirebaseRealtimeDB);
  console.log(edibles);
  console.log(orders);
  return (
    <div>
      <Preview />
      <TemporaryDrawer
        anchor='bottom'
        label='Choose Category'
        values={['Sandwiches', 'Drinks']}
      />
      <TemporaryDrawer
        anchor='bottom'
        label='Pick Item'
      />
    </div>
  );
}
