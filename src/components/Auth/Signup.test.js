import Signup from './Signup';
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

describe('Signup', () => {
    // Text display 
    it('should render "Create your new account" text', () => {
        const dispatch = jest.fn();
        render(
        <GlobalContext.Provider value={{ dispatch }}>
            <Router><Signup/></Router>
        </GlobalContext.Provider>
        );
        const text = screen.getByText(/Create your new account/i);
        expect(text).toBeInTheDocument();
    });

    // Email 
    it('should show an email field with default placeholder text of "Email address"', () => {
        const dispatch = jest.fn();
        render(
        <GlobalContext.Provider value={{ dispatch }}>
            <Router><Signup/></Router>
        </GlobalContext.Provider>
        );
        const inputNode = screen.getByPlaceholderText('Email address')
        expect(inputNode).toBeInTheDocument();
    });

    it('should render an email input field', () => {
        const dispatch = jest.fn();
        render(
        <GlobalContext.Provider value={{ dispatch }}>
            <Router><Signup/></Router>
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
            <Router><Signup/></Router>
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
            <Router><Signup/></Router>
        </GlobalContext.Provider>
        );
        const inputEl = screen.getByTestId("email-input");
        userEvent.type(inputEl, "test");
        expect(screen.getByTestId("email-input")).toHaveValue("test");
        // Will re-add further tests of error messages once we have set up validation of email addresses 
        // expect(screen.queryByTestId("error-msg")).toBeInTheDocument();
        // expect(screen.queryByTestId("error-msg").textContent).toEqual("Please enter a valid email.");
    });

    // Password  
    it('should show a password field with a default placeholder of "Enter a password"', () => {
        const dispatch = jest.fn();
        render(
        <GlobalContext.Provider value={{ dispatch }}>
            <Router><Signup/></Router>
        </GlobalContext.Provider>
        );
        const inputNode = screen.getByPlaceholderText('Enter a password')
        expect(inputNode).toBeInTheDocument();
    });

    it('should render a password input field', () => {
        const dispatch = jest.fn();
        render(
        <GlobalContext.Provider value={{ dispatch }}>
            <Router><Signup/></Router>
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
            <Router><Signup/></Router>
        </GlobalContext.Provider>
        );
        const inputEl = screen.getByTestId("password-input");
        userEvent.type(inputEl, "TestPassword");
        expect(screen.getByTestId("password-input")).toHaveValue("TestPassword");
        expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
        });

    // Password confirmation
    it('should show a password confirmation field with a default placeholder of "Confirm your password"', () => {
        const dispatch = jest.fn();
        render(
        <GlobalContext.Provider value={{ dispatch }}>
            <Router><Signup/></Router>
        </GlobalContext.Provider>
        );
        const inputNode = screen.getByPlaceholderText('Confirm your password')
        expect(inputNode).toBeInTheDocument();
    });

    it('should render a password confirmation input field', () => {
        const dispatch = jest.fn();
        render(
        <GlobalContext.Provider value={{ dispatch }}>
            <Router><Signup/></Router>
        </GlobalContext.Provider>
        );
        const inputEl = screen.getByTestId("password-confirmation-input");
        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toHaveAttribute("type", "password");
    });

    //   KR, 21Jul2021: Value used to test password will need to change if we specify password validation in model later 
    it('should pass a valid password to test the password confirmation input field', () => {
        const dispatch = jest.fn();
        render(
        <GlobalContext.Provider value={{ dispatch }}>
            <Router><Signup/></Router>
        </GlobalContext.Provider>
        );
        const inputEl = screen.getByTestId("password-confirmation-input");
        userEvent.type(inputEl, "TestPassword");
        expect(screen.getByTestId("password-confirmation-input")).toHaveValue("TestPassword");
        expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
    });

    // Sign Up button 
    it('should render "Sign up" button within a link', () => {
        const dispatch = jest.fn();
        render(
        <GlobalContext.Provider value={{ dispatch }}>
            <Router><Signup/></Router>
        </GlobalContext.Provider>
        );
        const linkElement = screen.getByText(/Sign Up/);
        expect(linkElement).toBeInTheDocument();
    });
});