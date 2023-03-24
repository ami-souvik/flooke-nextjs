"use client"
import { useContext, useState } from 'react'
import Image from 'next/image'
import { FirebaseRealtimeDB } from '../../context/context'
import Button from '@mui/material/Button'
import searchAndConnectBt from '../../utils/printUtils/searchAndConnectBt'
import theEngineersLogo from '../../assets/the_engineers_logo.png'

export default function OrderProcessor() {
  const { edibles, orders } = useContext(FirebaseRealtimeDB);
  return (
    <div>
      <Image
        id='the_engineers_logo'
        src={theEngineersLogo}
        alt="the engineers"
        width={600}
        height={150}
      />
      <Button
        onClick={() => searchAndConnectBt()}
        variant="outlined">Print</Button>
    </div>
  );
}
