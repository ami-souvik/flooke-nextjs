import { useContext } from 'react'
import { FirebaseRealtimeDB } from '../context/context'

export default function Header() : JSX.Element{
  const { edibles, orders } = useContext(FirebaseRealtimeDB);
  console.log('Header called');
  
  return (
    <>
      <h1>{edibles ? 'Edibles fetched' : 'Not connected'}</h1>
      <h1>{orders ? 'Orders fetched' : 'Not connected'}</h1>
    </>
  )
}