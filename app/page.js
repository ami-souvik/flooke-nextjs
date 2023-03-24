"use client";
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Backdrop from '../components/card-pieces/backdrops';
import '../styles/components-st/card-pieces.css'

export default function Home() {
  return (
    <main>
      <Backdrop.Basic polish={{ padding: 0 }}>
        <Backdrop.Header
          title="Table 1"
          total="25000"
        />
      </Backdrop.Basic>
    </main>
  )
}
