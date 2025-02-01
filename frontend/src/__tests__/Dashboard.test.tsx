import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';

describe('Dashboard', () => {
  it('renders welcome message', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    expect(screen.getByText(/Welcome, @user/i)).toBeInTheDocument();
  });

  it('renders stats cards', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    expect(screen.getByText(/Total Posts/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Retweets/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Likes/i)).toBeInTheDocument();
    expect(screen.getByText(/SEMA Balance/i)).toBeInTheDocument();
  });

  it('renders distribution modal button', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    expect(screen.getByText(/Distribute/i)).toBeInTheDocument();
  });
});