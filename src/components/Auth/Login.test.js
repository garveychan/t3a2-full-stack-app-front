import Login from './Login';
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

describe('Login', () => {
    it('should show "Member Login" text', () => {
        render(<Router><Login/></Router>);
        const text = screen.getByText(/member login/i);
        expect(text).toBeInTheDocument();
    });

    it('should show an email field with default placeholder text of "Email address"', () => {
        render(<Router><Login/></Router>);
        const text = screen.getByText(/email address/i);
        expect(text).toBeInTheDocument();
    });

    it('should render an email input field', () => {
        render(<Router><Login/></Router>);
        const inputEl = screen.getByTestId("email-input");
        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toHaveAttribute("type", "email");
      });

    it('should pass a valid email to test email input field', () => {
        render(<Router><Login/></Router>);
        const inputEl = screen.getByTestId("email-input");
        userEvent.type(inputEl, "test@mail.com");
        expect(screen.getByTestId("email-input")).toHaveValue("test@mail.com");
        expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
        });

    it('should show a password field with a default placeholder of "Password"', () => {
        render(<Router><Login/></Router>);
        const text = screen.getByText(/Password/);
        expect(text).toBeInTheDocument();
    });

    it('should render an password input field', () => {
        render(<Router><Login/></Router>);
        const inputEl = screen.getByTestId("password-input");
        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toHaveAttribute("type", "password");
      });

    //   KR, 21Jul2021: Test of password value will need to change if we specify password validation in model later 
    it('should pass a valid password to test the password input field', () => {
        render(<Router><Login/></Router>);
        const inputEl = screen.getByTestId("password-input");
        userEvent.type(inputEl, "TestPassword");
        expect(screen.getByTestId("password-input")).toHaveValue("TestPassword");
        expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
        });

    it('should show "Sign in" button', () => {
        render(<Router><Login/></Router>);
        const text = screen.getByText(/sign in/i);
        expect(text).toBeInTheDocument();
    });

    it('should render "Forgot Password" link', () => {
        render(<Router><Login/></Router>);
        const linkElement = screen.getByText(/Forgot your password?/i);
        expect(linkElement).toBeInTheDocument();
    });

});