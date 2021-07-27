import Recovery from './Recovery';
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

describe('Recovery', () => {
    // Text display 
    it('should render "Forgot your password?" text', () => {
        const dispatch = jest.fn();
        render(
            <GlobalContext.Provider value={{ dispatch }}>
                <Router><Recovery/></Router>
            </GlobalContext.Provider>
        );
        const text = screen.getByText(/Forgot your password?/);
        expect(text).toBeInTheDocument();
    });

    // Text display 
    it('should render "No worries." text', () => {
        const dispatch = jest.fn();
        render(
            <GlobalContext.Provider value={{ dispatch }}>
                <Router><Recovery/></Router>
            </GlobalContext.Provider>
        );
        const text = screen.getByText(/No worries./);
        expect(text).toBeInTheDocument();
    });

    // Email 
    it('should show an email field with default placeholder text of "Enter your email"', () => {
        const dispatch = jest.fn();
        render(
            <GlobalContext.Provider value={{ dispatch }}>
                <Router><Recovery/></Router>
            </GlobalContext.Provider>
        );
        const inputNode = screen.getByPlaceholderText('Enter your email')
        expect(inputNode).toBeInTheDocument();
    });

    it('should render an email input field', () => {
        const dispatch = jest.fn();
        render(
            <GlobalContext.Provider value={{ dispatch }}>
                <Router><Recovery/></Router>
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
                <Router><Recovery/></Router>
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
                <Router><Recovery/></Router>
            </GlobalContext.Provider>
        );
        const inputEl = screen.getByTestId("email-input");
        userEvent.type(inputEl, "test");
        expect(screen.getByTestId("email-input")).toHaveValue("test");
    });

    // Sign Up button 
    it('should render a "submit" button within a link', () => {
        const dispatch = jest.fn();
        render(
            <GlobalContext.Provider value={{ dispatch }}>
                <Router><Recovery/></Router>
            </GlobalContext.Provider>
        );
        const linkElement = screen.getByText(/Submit/);
        expect(linkElement).toBeInTheDocument();
    });
});