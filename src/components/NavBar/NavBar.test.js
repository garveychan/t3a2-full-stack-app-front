import NavBar from './NavBar';
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

describe('NavBar', () => {
    // Icon image display
    it('should show the icon image', () => {
        render(<Router><NavBar/></Router>);
        const icon = screen.getByAltText(/1UP Logo/i);
        expect(icon).toBeInTheDocument();
    });

    // Icon image link to landing page
    it('icon image should link to landing page', () => {
        render(<Router><NavBar/></Router>);
        const linkElement = screen.getByText(/1UP Bouldering Gym/);
        expect(linkElement).toBeInTheDocument();
    });

    // Visible for all users irrespective of log in status 
    it('should show the check-in link', () => {
        render(<Router><NavBar/></Router>);
        const linkElement = screen.getByText(/check in/i);
        expect(linkElement).toBeInTheDocument();
    });

    // If user is NOT logged in
    it('should show the login link if the user is not logged in', () => {
        render(<Router><NavBar/></Router>);
        const loggedIn = {value: false};
        const linkElement = screen.getByText(/log in/i);
        expect(linkElement).toBeInTheDocument();
    });

    it('should show the sign up link if the user is not logged in', () => {
        render(<Router><NavBar/></Router>);
        const loggedIn = {value: false};
        const linkElement = screen.getByText(/sign up/i);
        expect(linkElement).toBeInTheDocument();
    });

    // If user IS logged in
    it('should show the logout link if the user is logged in', () => {
        render(<Router><NavBar/></Router>);
        const loggedIn = {value: true};
        const linkElement = screen.getByText(/log out/i);
        expect(linkElement).toBeInTheDocument();
    });

});