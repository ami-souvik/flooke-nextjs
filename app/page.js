"use client";
import { useContext } from 'react';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { FirebaseRealtimeDB } from '../context/context'
import TemporaryDrawer from './order-editor/temporaryDrawer';
import Backdrop from '../components/card-pieces/backdrops';
import '../styles/components-st/card-pieces.css'

export default function Home() {
  const { edibles, orders } = useContext(FirebaseRealtimeDB);
  return (
    <main>
      <TemporaryDrawer />
      {orders && Object.keys(orders).map(tableKey => (
        <Backdrop.Basic polish={{ padding: 0 }}>
          <Backdrop.Header
            title={tableKey}
            total="498"
          />
          <Backdrop.Body details={orders[tableKey].orderDetails} />
        </Backdrop.Basic>
      ))}
    </main>
  )
}
