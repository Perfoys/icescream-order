import { render, screen, waitFor } from '../../../test-utils/testing-library-utils';
import { rest } from 'msw';
import { server } from '../../../mocks/server';
import OrderConfirmation from '../OrderConfirmation';

test('error response from server for submitting order', async () => {
  server.resetHandlers(
    rest.post('http://localhost:3030/order', (request, response, context) => 
    response(context.status(500))
    )
  );
  render(<OrderConfirmation setOrderPhase={jest.fn()} />);

  const alert = await screen.findByRole('alert');
  await waitFor(() => expect(alert).toHaveTextContent('An unexpected error occurred. Please try again later'));
});
