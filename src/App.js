import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';
import { OrderDetailsProvider } from './contexts/OrderDetails';

function App() {
  const [orderPhase, setOrderPhase] = useState('entry');

  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and order page need provider */}
        {orderPhase === 'entry' && <OrderEntry setOrderPhase={setOrderPhase} />}
        {orderPhase === 'summary' && <OrderSummary setOrderPhase={setOrderPhase} />}
        {orderPhase === 'confirmation' && <OrderConfirmation setOrderPhase={setOrderPhase} />}
      </OrderDetailsProvider>
      {/* conformation page does not need provider */}
    </Container>
  );
}

export default App;
