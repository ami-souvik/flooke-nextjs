"use client"
import { useContext, useState } from 'react'
import { FirebaseRealtimeDB } from '../../context/context'
import Button from '@mui/material/Button'
import Counter from '../../components/counter'
import TemporaryDrawer from './temporaryDrawer'
import './order-editor.css'

export default function OrderEditor() {
  const { edibles, orders } = useContext(FirebaseRealtimeDB);
  console.log(edibles);
  console.log(orders);
  const [category, setCategory] = useState(null)
  const [item, setItem] = useState(null)
  const [count, setCount] = useState(0)
  const [orderDetails, setOrderDetails] = useState({})

  const updateOrderDetails = () => {
    const detailsClone = {...orderDetails}
    if(!detailsClone[category])
      detailsClone[category] = {}
    console.log(edibles[category][item]);
    detailsClone[category][item] = edibles[category][item]
    detailsClone[category][item].count = count
    setOrderDetails(detailsClone)
  }

  return (
    <div>
      <h1>{category}</h1>
      <h1>{item}</h1>
      <Counter count={count} setCount={setCount} />
      <TemporaryDrawer
        anchor='bottom'
        label='Choose Category'
        values={edibles ? Object.keys(edibles) : []}
        setValue={setCategory}
      />
      <TemporaryDrawer
        anchor='bottom'
        label='Pick Item'
        values={Object.keys(
          edibles && edibles[category] ? edibles[category] : []
        )}
        setValue={setItem}
      />
      <Button
        onClick={updateOrderDetails}
        variant="outlined">Add</Button>
    </div>
  );
}
