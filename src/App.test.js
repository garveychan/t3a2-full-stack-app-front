import App from './App';
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from '@testing-library/react';

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

describe('App', () => {
it('should show gym name', () => {
    render(<App/>);
    const text = screen.getByText(/Bouldering Gym/i);
    expect(text).toBeInTheDocument();
})});
