import React, {Suspense} from 'react';
import './App.css';
const ProductRemote = React.lazy(() => import('app1/Product'));
const OrderRemote = React.lazy(() => import('app2/Order'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={'loading...'}>
        <ProductRemote />
        <OrderRemote />
      </Suspense>
    </div>
  );
}

export default App;
