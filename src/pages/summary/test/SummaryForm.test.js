import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForm from '../SummaryForm.jsx';

test('Check that order button is disabled by default', () => {
  render(<SummaryForm />);
  const orderButton = screen.getByRole('button', { name: /confirm order/i });
  const checkbox = screen.getByRole('checkbox', { name: /i agree to terms and conditions/i });
  expect(checkbox).not.toBeChecked();
  expect(orderButton).toBeDisabled();
  fireEvent.click(checkbox);
  expect(orderButton).toBeEnabled();
  fireEvent.click(checkbox);
  expect(orderButton).toBeDisabled();
});