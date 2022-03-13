import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import SummaryForm from '../SummaryForm.jsx';

test('Check that order button is disabled by default', () => {
  render(<SummaryForm />);
  const orderButton = screen.getByRole('button', { name: /confirm order/i });
  const checkbox = screen.getByRole('checkbox', { name: /i agree to terms and conditions/i });
  expect(checkbox).not.toBeChecked();
  expect(orderButton).toBeDisabled();
  userEvent.click(checkbox);
  expect(orderButton).toBeEnabled();
  userEvent.click(checkbox);
  expect(orderButton).toBeDisabled();
});

test('popover responds to mousehover', async () => {
  render(<SummaryForm />);
  const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
  expect(nullPopover).not.toBeInTheDocument();

  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  userEvent.unhover(termsAndConditions);

  await waitForElementToBeRemoved(() => queryByText(/no ice cream will actually be delivered/i));
});