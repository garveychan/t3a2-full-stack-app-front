import App from './App';
import Login from './components/Auth/Login';
import { render, screen } from '@testing-library/react';
import { StaticRouter as Router } from 'react-router-dom'; 

describe('App', () => {
it('should show Login option', () => {
    render(<Router><Login/></Router>);
    const text = screen.getByText(/login/i);
    expect(text).toBeInTheDocument();
})});