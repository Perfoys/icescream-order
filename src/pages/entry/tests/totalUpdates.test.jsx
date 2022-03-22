import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType='scoops' />);
  const scoopsSubtotal = screen.getByText('Scoops subtotal: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');
  // get vanilla input and update it to 1
  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');
  // get chocolate input and update it to 2
  const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update topping subtotal when toppings change', async () => {
  render(<Options optionType='toppings' />);
  const toppingsSubtotal = screen.getByText('Toppings subtotal: $', { exact: false });
  expect(toppingsSubtotal).toHaveTextContent('0.00');
  // get cherries checkbox and make it checked
  const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
  userEvent.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('1.50');
  // get hot fudge checkbox and make it checked
  const hotFudgeCheckbox = await screen.findByRole('checkbox', { name: 'Hot fudge' });
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('3.00');
  // unchecked cherries checkbox to update topping total
  userEvent.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent('1.50');
});

describe('grand total', () => {
  test('grand total starts at $0.00', () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /grand total:/i });
    expect(grandTotal).toHaveTextContent('0.00');
  });
  test('grand total updates properly if scoop is added first', async () => {
    render(<OrderEntry />);
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '2');
    const grandTotal = screen.getByRole('heading', { name: /grand total:/i });
    expect(grandTotal).toHaveTextContent('4.00');

    const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent('5.50');
  });
  test('grand total updates properly if topping is added first', async () => {
    render(<OrderEntry />);
    const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
    userEvent.click(cherriesCheckbox);
    const grandTotal = screen.getByRole('heading', { name: /grand total:/i });
    expect(grandTotal).toHaveTextContent('1.50');

    const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '1');
    expect(grandTotal).toHaveTextContent('3.50');
  });
  test('grand total updates properly if item is removed', async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole('heading', { name: /grand total:/i });
    const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '1');
    expect(grandTotal).toHaveTextContent('2.00');
    userEvent.type(chocolateInput, '0');
    expect(grandTotal).toHaveTextContent('0.00');
  });
});