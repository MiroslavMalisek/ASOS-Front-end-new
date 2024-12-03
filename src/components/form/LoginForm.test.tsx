import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import '@testing-library/jest-dom';

// Utility for wrapping components with `BrowserRouter`
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('LoginForm', () => {


  it('submits the form with valid data and displays success message', async () => {
    renderWithRouter(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/heslo/i);
    const submitButton = screen.getByRole('button', { name: /prihlásiť sa/i });

    fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // Check for loading spinner after submit
    expect(screen.getByRole('status')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/prihlásenie bolo úspešné/i)).toBeInTheDocument();
    });
  });
  
});
