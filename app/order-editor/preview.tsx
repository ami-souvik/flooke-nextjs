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
        <h3>{cat}</h3>
        <List>
          {Object.keys(data[cat]).map(item => (
            <ListItem key={item} disablePadding>
              <ListItemButton
                onClick={() => {
                  setCount(data[cat][item].count)
                  setItem(item)
                  setCategory(cat)
                }}>
                <ListItemText primary={`${data[cat][item].count} x ${item}`} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </>
    ))}
  </div>)
}