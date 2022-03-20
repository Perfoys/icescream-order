import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import OrderEntry from '../OrderEntry';
import { server } from '../../../mocks/server';

test('handles error for scoops and toppings routes', async () => {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (request, response, context) => response(context.status(500))),
    rest.get('http://localhost:3030/toppings', (request, response, context) => response(context.status(500)))
  );

  render(<OrderEntry />);
  await waitFor( async () => {
    const alerts = await screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  });
});