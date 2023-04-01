import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

interface PreviewProps {
  data: any,
  setCount: any,
  setItem: any,
  setCategory: any
}

export default function Preview({
  data = {},
  setCount = null,
  setItem = null,
  setCategory = null
}: PreviewProps) : JSX.Element{
  return (<div className='preview-case'>
    <h4>Preview:</h4>
    {Object.keys(data).map(cat => (
      <>
        <p>{cat}</p>
        <List>
          {Object.keys(data[cat]).map(item => (
            <ListItem key={item} disablePadding>
              <ListItemButton
                style={{ padding: 0 }}
                onClick={() => {
                  setCount(data[cat][item].count)
                  setItem(item)
                  setCategory(cat)
                }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}>
                  <p>{data[cat][item].count} x {item}</p>
                  {data[cat][item].comment && <p style={{ backgroundColor: '#57C5B6' }}>{data[cat][item].comment}</p>}
                </div>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </>
    ))}
  </div>)
}