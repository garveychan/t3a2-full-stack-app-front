import Login from './Login';
import { render, screen } from '@testing-library/react';
import { StaticRouter as Router } from 'react-router-dom'; 
import { unmountComponentAtNode } from "react-dom";
import userEvent from '@testing-library/user-event';
import { GlobalContext } from "../../utils/globalContext";

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
    // Text display 
    it('should show "Member Login" text', () => {
        const dispatch = jest.fn();
        render(
        <GlobalContext.Provider value={{ dispatch }}>
            <Router><Login/></Router>
        </GlobalContext.Provider>
        );
        const text = screen.getByText(/member login/i);
        expect(text).toBeInTheDocument();
    });

    // Email 
    it('should show an email field with default placeholder text of "Email address"', () => {
        const dispatch = jest.fn();
        render(
        <GlobalContext.Provider value={{ dispatch }}>
            <Router><Login/></Router>
        </GlobalContext.Provider>
        );
        const inputNode = screen.getByPlaceholderText('Email address')
        expect(inputNode).toBeInTheDocument();
    });

    it('should render an email input field', () => {
        const dispatch = jest.fn();
        render(
        <GlobalContext.Provider value={{ dispatch }}>
            <Router><Login/></Router>
        </GlobalContext.Provider>
        );
        const inputEl = screen.getByTestId("email-input");
        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toHaveAttribute("type", "email");
    });

    it('should not return an error if passed a valid email to test email input field', () => {
        const dispatch = jest.fn();
        render(
        <GlobalContext.Provider value={{ dispatch }}>
            <Router><Login/></Router>
        </GlobalContext.Provider>
        );
        const inputEl = screen.getByTestId("email-input");
        userEvent.type(inputEl, "test@mail.com");
        expect(screen.getByTestId("email-input")).toHaveValue("test@mail.com");
        expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
    });

    it('should return an error message if passed an invalid email to test input value', () => {
        const dispatch = jest.fn();
        render(
        <GlobalContext.Provider value={{ dispatch }}>
            <Router><Login/></Router>
        </GlobalContext.Provider>
        );
        const inputEl = screen.getByTestId("email-input");
        userEvent.type(inputEl, "test");
        expect(screen.getByTestId("email-input")).toHaveValue("test");
    });

    // Password 
    it('should show a password field with a default placeholder of "Password"', () => {
        const dispatch = jest.fn();
        render(
        <GlobalContext.Provider value={{ dispatch }}>
            <Router><Login/></Router>
        </GlobalContext.Provider>
        );
        const inputNode = screen.getByPlaceholderText('Password')
        expect(inputNode).toBeInTheDocument();
    });

    it('should render a password input field', () => {
        const dispatch = jest.fn();
        render(
        <GlobalContext.Provider value={{ dispatch }}>
            <Router><Login/></Router>
        </GlobalContext.Provider>
        );
        const inputEl = screen.getByTestId("password-input");
        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toHaveAttribute("type", "password");
    });

    //   KR, 21Jul2021: Value used to test password will need to change if we specify password validation in model later 
    it('should pass a valid password to test the password input field', () => {
        const dispatch = jest.fn();
        render(
        <GlobalContext.Provider value={{ dispatch }}>
            <Router><Login/></Router>
        </GlobalContext.Provider>
        );
        const inputEl = screen.getByTestId("password-input");
        userEvent.type(inputEl, "TestPassword");
        expect(screen.getByTestId("password-input")).toHaveValue("TestPassword");
        expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
    });

        // Sign in button
    it('should show "Sign in" button', () => {
        const dispatch = jest.fn();
        render(
        <GlobalContext.Provider value={{ dispatch }}>
            <Router><Login/></Router>
        </GlobalContext.Provider>
        );
        const text = screen.getByText(/sign in/i);
        expect(text).toBeInTheDocument();
    });

    // Forgot password link 
    it('should render "Forgot Password" link', () => {
        const dispatch = jest.fn();
        render(
        <GlobalContext.Provider value={{ dispatch }}>
            <Router><Login/></Router>
        </GlobalContext.Provider>
        );
        const linkElement = screen.getByText(/Forgot your password?/i);
        expect(linkElement).toBeInTheDocument();
    });
});