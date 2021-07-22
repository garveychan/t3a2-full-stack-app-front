import Recovery from './Recovery';
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

describe('Recovery', () => {
    // Text display 
    it('should render "Forgot your password?" text', () => {
        render(<Router><Recovery/></Router>);
        const text = screen.getByText(/Forgot your password?/);
        expect(text).toBeInTheDocument();
    });

    // Text display 
    it('should render "No worries." text', () => {
        render(<Router><Recovery/></Router>);
        const text = screen.getByText(/No worries./);
        expect(text).toBeInTheDocument();
    });

    // Email 
    it('should show an email field with default placeholder text of "Enter your email"', () => {
        render(<Router><Recovery/></Router>);
        const inputNode = screen.getByPlaceholderText('Enter your email')
        expect(inputNode).toBeInTheDocument();
    });

    it('should render an email input field', () => {
        render(<Router><Recovery/></Router>);
        const inputEl = screen.getByTestId("email-input");
        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toHaveAttribute("type", "email");
    });

    it('should not return an error if passed a valid email to test email input field', () => {
        render(<Router><Recovery/></Router>);
        const inputEl = screen.getByTestId("email-input");
        userEvent.type(inputEl, "test@mail.com");
        expect(screen.getByTestId("email-input")).toHaveValue("test@mail.com");
        expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
    });

    it('should return an error message if passed an invalid email to test input value', () => {
        render(<Router><Recovery/></Router>);
        const inputEl = screen.getByTestId("email-input");
        userEvent.type(inputEl, "test");
        expect(screen.getByTestId("email-input")).toHaveValue("test");
        // Will re-add further tests of error messages once we have set up validation of email addresses 
        // expect(screen.queryByTestId("error-msg")).toBeInTheDocument();
        // expect(screen.queryByTestId("error-msg").textContent).toEqual("Please enter a valid email.");
    });

    // Sign Up button 
    it('should render a "submit" button within a link', () => {
        render(<Router><Recovery/></Router>);
        const linkElement = screen.getByText(/Submit/);
        expect(linkElement).toBeInTheDocument();
    });
});