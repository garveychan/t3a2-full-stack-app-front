import Reset from './Reset';
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

describe('Reset', () => {
    // Text display 
    xit('should render "Reset your password" text', () => {
        const dispatch = jest.fn();
        render(
        <GlobalContext.Provider value={{ dispatch }}>
            <Router><Reset/></Router>
        </GlobalContext.Provider>
        );
        const text = screen.getByText(/Reset your password/);
        expect(text).toBeInTheDocument();
    });

    // Password - Initial 
    xit('should render "New password" text', () => {
        const dispatch = jest.fn();
        render(
            <GlobalContext.Provider value={{ dispatch }}>
                <Router><Reset/></Router>
            </GlobalContext.Provider>
            );
        const text = screen.getByText(/New password/);
        expect(text).toBeInTheDocument();
    });

    xit('should show a password field with default placeholder text of "New password"', () => {
        const dispatch = jest.fn();
        render(
            <GlobalContext.Provider value={{ dispatch }}>
                <Router><Reset/></Router>
            </GlobalContext.Provider>
            );
        const inputNode = screen.getByPlaceholderText('New password')
        expect(inputNode).toBeInTheDocument();
    });

    xit('should render a password input field', () => {
        const dispatch = jest.fn();
        render(
            <GlobalContext.Provider value={{ dispatch }}>
                <Router><Reset/></Router>
            </GlobalContext.Provider>
            );
        const inputEl = screen.getByTestId("password-input");
        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toHaveAttribute("type", "password");
    });

    xit('should pass a valid password to test the password input field', () => {
        const dispatch = jest.fn();
        render(
            <GlobalContext.Provider value={{ dispatch }}>
                <Router><Reset/></Router>
            </GlobalContext.Provider>
            );
        const inputEl = screen.getByTestId("password-input");
        userEvent.type(inputEl, "TestPassword");
        expect(screen.getByTestId("password-input")).toHaveValue("TestPassword");
        expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
    });

    // Password - Confirmation 
    xit('should render "Confirm password" text', () => {
        const dispatch = jest.fn();
        render(
            <GlobalContext.Provider value={{ dispatch }}>
                <Router><Reset/></Router>
            </GlobalContext.Provider>
            );
        const text = screen.getByText(/Confirm password/);
        expect(text).toBeInTheDocument();
    });

    xit('should show a password confirmation field with default placeholder text of "Confirm password"', () => {
        const dispatch = jest.fn();
        render(
            <GlobalContext.Provider value={{ dispatch }}>
                <Router><Reset/></Router>
            </GlobalContext.Provider>
            );
        const inputNode = screen.getByPlaceholderText('Confirm password')
        expect(inputNode).toBeInTheDocument();
    });

    xit('should render a password confirmation input field', () => {
        const dispatch = jest.fn();
        render(
            <GlobalContext.Provider value={{ dispatch }}>
                <Router><Reset/></Router>
            </GlobalContext.Provider>
            );
        const inputEl = screen.getByTestId("password-confirmation-input");
        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toHaveAttribute("type", "password");
    });

    xit('should pass a valid password to test the password input field', () => {
        const dispatch = jest.fn();
        render(
            <GlobalContext.Provider value={{ dispatch }}>
                <Router><Reset/></Router>
            </GlobalContext.Provider>
            );
        const inputEl = screen.getByTestId("password-confirmation-input");
        userEvent.type(inputEl, "TestPassword");
        expect(screen.getByTestId("password-confirmation-input")).toHaveValue("TestPassword");
        expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
    });
 
    // Sign Up button 
    xit('should render a "submit" button within a link', () => {
        const dispatch = jest.fn();
        render(
            <GlobalContext.Provider value={{ dispatch }}>
                <Router><Reset/></Router>
            </GlobalContext.Provider>
            );
        const linkElement = screen.getByText(/Submit/);
        expect(linkElement).toBeInTheDocument();
    });
});