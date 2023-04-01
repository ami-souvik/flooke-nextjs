"use client"
import { useContext } from 'react'
import { FirebaseRealtimeDB } from '../../context/context'

export default function Orders() {
  const { edibles, orders } = useContext(FirebaseRealtimeDB);
  return (
  );
}
