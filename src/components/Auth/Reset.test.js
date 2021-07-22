import Reset from './Reset';
import { render, screen } from '@testing-library/react';
import { StaticRouter as Router } from 'react-router-dom'; 
import { unmountComponentAtNode } from "react-dom";
import userEvent from '@testing-library/user-event';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Reset', () => {
    // Text display 
    it('should render "Reset your password" text', () => {
        render(<Router><Reset/></Router>);
        const text = screen.getByText(/Reset your password/);
        expect(text).toBeInTheDocument();
    });

    // Password - Initial 
    it('should render "New password" text', () => {
        render(<Router><Reset/></Router>);
        const text = screen.getByText(/New password/);
        expect(text).toBeInTheDocument();
    });

    it('should show a password field with default placeholder text of "New password"', () => {
        render(<Router><Reset/></Router>);
        const inputNode = screen.getByPlaceholderText('New password')
        expect(inputNode).toBeInTheDocument();
    });

    it('should render a password input field', () => {
        render(<Router><Reset/></Router>);
        const inputEl = screen.getByTestId("password-input");
        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toHaveAttribute("type", "password");
    });

    it('should pass a valid password to test the password input field', () => {
        render(<Router><Reset/></Router>);
        const inputEl = screen.getByTestId("password-input");
        userEvent.type(inputEl, "TestPassword");
        expect(screen.getByTestId("password-input")).toHaveValue("TestPassword");
        expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
    });

    // Password - Confirmation 
    it('should render "Confirm password" text', () => {
        render(<Router><Reset/></Router>);
        const text = screen.getByText(/Confirm password/);
        expect(text).toBeInTheDocument();
    });

    it('should show a password confirmation field with default placeholder text of "Confirm password"', () => {
        render(<Router><Reset/></Router>);
        const inputNode = screen.getByPlaceholderText('Confirm password')
        expect(inputNode).toBeInTheDocument();
    });

    it('should render a password confirmation input field', () => {
        render(<Router><Reset/></Router>);
        const inputEl = screen.getByTestId("password-confirmation-input");
        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toHaveAttribute("type", "password");
    });

    it('should pass a valid password to test the password input field', () => {
        render(<Router><Reset/></Router>);
        const inputEl = screen.getByTestId("password-confirmation-input");
        userEvent.type(inputEl, "TestPassword");
        expect(screen.getByTestId("password-confirmation-input")).toHaveValue("TestPassword");
        expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
    });
 
    // Sign Up button 
    it('should render a "submit" button within a link', () => {
        render(<Router><Reset/></Router>);
        const linkElement = screen.getByText(/Submit/);
        expect(linkElement).toBeInTheDocument();
    });
});