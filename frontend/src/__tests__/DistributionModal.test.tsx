import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DistributionModal } from '../components/DistributionModal';

describe('DistributionModal', () => {
  const mockOnClose = vi.fn();
  const mockTweetContent = 'Test tweet content';

  it('renders when open', () => {
    render(
      <DistributionModal 
        isOpen={true} 
        onClose={mockOnClose} 
        tweetContent={mockTweetContent} 
      />
    );
    expect(screen.getByText(/Distribute SEMA Tokens/i)).toBeInTheDocument();
    expect(screen.getByText(mockTweetContent)).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <DistributionModal 
        isOpen={false} 
        onClose={mockOnClose} 
        tweetContent={mockTweetContent} 
      />
    );
    expect(screen.queryByText(/Distribute SEMA Tokens/i)).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <DistributionModal 
        isOpen={true} 
        onClose={mockOnClose} 
        tweetContent={mockTweetContent} 
      />
    );
    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('allows token amount input', () => {
    render(
      <DistributionModal 
        isOpen={true} 
        onClose={mockOnClose} 
        tweetContent={mockTweetContent} 
      />
    );
    const input = screen.getByLabelText(/Amount of SEMA tokens/i);
    fireEvent.change(input, { target: { value: '100' } });
    expect(input).toHaveValue(100);
  });

  it('handles distribution confirmation', () => {
    render(
      <DistributionModal 
        isOpen={true} 
        onClose={mockOnClose} 
        tweetContent={mockTweetContent} 
      />
    );
    fireEvent.click(screen.getByText('Confirm Distribution'));
    expect(mockOnClose).toHaveBeenCalled();
  });
});