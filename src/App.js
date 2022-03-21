import Container from 'react-bootstrap/Container';
import OrderEntry from './pages/entry/OrderEntry';
import { OrderDetailsProvider } from './contexts/OrderDetails';

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and order page need provider */}
        <OrderEntry />
      </OrderDetailsProvider>
      {/* conformation page does not need provider */}
    </Container>
  );
}

export default App;
