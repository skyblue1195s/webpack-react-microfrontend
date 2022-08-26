import React, { Suspense } from 'react';
import './App.css';
const OrderRemote = React.lazy(() => import('app2/Order'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={'loading...'}>
        <OrderRemote />
      </Suspense>
    </div>
  );
}

export default App;
