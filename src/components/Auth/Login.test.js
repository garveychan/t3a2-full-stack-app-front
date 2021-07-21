import Login from './Login';
import { render, screen } from '@testing-library/react';
import { StaticRouter as Router } from 'react-router-dom'; 

describe('Login', () => {
    it('should show "Member Login"', () => {
        render(<Router><Login/></Router>);
        const text = screen.getByText(/member login/i);
        expect(text).toBeInTheDocument();
    });

    // it('should show the product list', () => {
    //     const products = [
    //         { id: 1, name: 'product-1', price: 6.66 },
    //         { id: 2, name: 'product-2', price: 7.77 },
    //     ];
    //     render(<Router><ProductList products={products}/></Router>);
    //     const table = screen.getByRole('table');
    //     expect(table).toHaveTextContent(/product-1/);
    //     expect(table).toHaveTextContent(/product-2/);
    //     // screen.debug();
    // })
});