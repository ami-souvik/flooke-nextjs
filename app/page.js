"use client";
import { useContext, useState } from 'react';
import { FirebaseRealtimeDB } from '../context/db-context'
import { Box } from '@mui/material';
import { OPageAction } from '../components/form-components/page-action';
import { deleteActiveOrder } from '../utils/web/apis/activeOrderApis';
import OrderEditor from './order-editor/page';
import ManagerView from '../components/orders/manager-view';
import ChefView from '../components/orders/chef-view';
import StewardView from '../components/orders/steward-view';
import ConfirmOverlay from '../components/overlays/confirm-overlay';
import { navigate } from '../utils/helperUtils.ts';
import { PATH_ORDER_EDITOR } from '../utils/constantUtils';
import '../styles/responsive-pages-styles/orders.css';

export default function Home() {
  const { orders } = useContext(FirebaseRealtimeDB);
  const [activeView, setActiveView] = useState(1);
  const [deleteTable, confirmDelete] = useState(null);
  return (
    <main
      suppressHydrationWarning
      style={{
        height: "100vh"
      }}>
      <ConfirmOverlay
        open={!!deleteTable}
        handleClose={() => confirmDelete(null)}
        title="Delete table"
        message="Are you surely want to delete the table?"
        onSuccess={() => deleteActiveOrder({ "table-number": orders[deleteTable]["table-number"] })}
      />
      <Box className="cs-component-root">
        <Box
          className="cs-component-col-1"
          sx={{ position: "relative" }}>
          <Box
            className="scrollable-div"
            height="calc(100vh - 48px)"
            sx={{
              overflowY: "scroll",
              padding: "0px"
            }}>
            {activeView === 0 && <ChefView orders={orders}/>}
            {activeView === 1 && <ManagerView orders={orders} confirmDelete={confirmDelete} />}
            {activeView === 2 && <StewardView orders={orders}/>}
          </Box>
          <OPageAction
            activeView={activeView}
            setActiveView={setActiveView}
            clickAction={() => navigate(PATH_ORDER_EDITOR)}
          />
        </Box>
        <Box className="cs-component-col-2">
          <OrderEditor />
        </Box>
      </Box>
    </main>
  )
}
