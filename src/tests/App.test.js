import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

test('order phases for happy path', async () => {
  render(<App />);

  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2')

  const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
  userEvent.click(cherriesCheckbox);

  const orderSummaryButton = screen.getByRole('button', { name: /make an order/i });
  userEvent.click(orderSummaryButton);

  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' });
  expect(summaryHeading).toBeInTheDocument();
  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $6.00' });
  expect(scoopsHeading).toBeInTheDocument();
  const toppingsHeading = screen.getByRole('heading', { name: 'Toppings: $1.50' });
  expect(toppingsHeading).toBeInTheDocument();
  // check summary option items
  expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
  expect(screen.getByText('2 Chocolate')).toBeInTheDocument();
  expect(screen.getByText('Cherries')).toBeInTheDocument();

  const tcCheckbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
  userEvent.click(tcCheckbox);
  const confirmOrderButton = screen.getByRole('button', { name: /confirm order/i });
  userEvent.click(confirmOrderButton);

  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  const thankYouHeader = await screen.findByRole('heading', { name: /thank you/i });
  expect(thankYouHeader).toBeInTheDocument();
  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  const noLoading = screen.queryByText('Loading');
  expect(noLoading).not.toBeInTheDocument();

  const newOrderButton = screen.getByRole('button', { name: /new order/i });
  userEvent.click(newOrderButton);

  const scoopsTotal = screen.getByText('Scoops subtotal: $0.00');
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = screen.getByText('Toppings subtotal: $0.00');
  expect(toppingsTotal).toBeInTheDocument();
  const grandTotal = screen.getByText('Grand total: $0.00');
  expect(grandTotal).toBeInTheDocument();

  await screen.findByRole('spinbutton', { name: 'Vanilla' });
  await screen.findByRole('checkbox', { name: 'Cherries' });
});
test('Topping is not here, when scoop is not chosed', async () => {
  render(<App />);

  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');

  const confirmButton = screen.getByRole('button', { name: /make an order/i });
  userEvent.click(confirmButton);

  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $6.00' });
  expect(scoopsHeading).toBeInTheDocument();
  const toppingHeading = screen.queryByRole('heading', { name: /toppings/i });
  expect(toppingHeading).not.toBeInTheDocument();
});
