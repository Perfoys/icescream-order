import { render, screen, waitFor } from '../../../test-utils/testing-library-utils';
import { rest } from 'msw';
import OrderEntry from '../OrderEntry';
import { server } from '../../../mocks/server';
import userEvent from '@testing-library/user-event';

test('handles error for scoops and toppings routes', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (request, response, context) => response(context.status(500))),
    rest.get('http://localhost:3030/toppings', (request, response, context) => response(context.status(500)))
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);
  await waitFor( async () => {
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
});
test('Order button is disabled when no scoop is chosen', async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  const orderButton = screen.getByRole('button', { name: /Make an order/i });
  expect(orderButton).toBeDisabled();

  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  expect(orderButton).toBeEnabled();
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '0');
  expect(orderButton).toBeDisabled();
});