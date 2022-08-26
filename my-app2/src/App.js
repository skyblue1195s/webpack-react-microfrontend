import React, {Suspense} from 'react';
import './App.css';
const ProductRemote = React.lazy(() => import('app1/Product'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={'loading...'}>
        <ProductRemote />
      </Suspense>
    </div>
  );
}

export default App;
