import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import MaturityScore from '@/components/MaturityScore/MaturityScore';

vi.mock('react-chartjs-2', () => ({
  Bar: vi.fn().mockImplementation(() => <div>Bar Chart</div>),
}));

describe.only('MaturityScore component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render sentiment per team bar chart', () => {
    render(<MaturityScore />);
    expect(screen.getByText(/Sentiment per Team/i)).toBeInTheDocument();
  });
});
