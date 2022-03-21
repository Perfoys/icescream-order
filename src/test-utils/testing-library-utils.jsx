import { render } from '@testing-library/react';
import { OrderDetailsProvider } from '../contexts/OrderDetails';

const renderWithContext = (ui, options) => render(ui, { wrapper: OrderDetailsProvider, ...options });

// re-export everything from testing-library
export * from '@testing-library/react';

// override render
export { renderWithContext as render };