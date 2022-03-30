import Button from 'react-bootstrap/Button';
import Options from './Options';
import { useOrderDetails } from '../../contexts/OrderDetails';

const OrderEntry = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();
  const handleClick = () => {
    setOrderPhase('summary');
  };
  const orderDisabled = orderDetails.totals.scoops === '$0.00';

  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <h2>Grand total: {orderDetails.totals['grandTotal']}</h2>
      <Button disabled={orderDisabled} variant='primary' onClick={handleClick}>Make an order</Button>
    </div>
  )
};

export default OrderEntry;
