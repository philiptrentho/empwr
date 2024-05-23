import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import { DocumentReference } from 'firebase/firestore';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { fetchUserDetails, fetchUserTasks } from '@/components/Firebase/individualData';
import IndividualDashboard from '@/components/IndividualDashboard/IndividualDashboard';

const getBarColor = (score: number) => {
  if (score >= 8) return 'bg-green-400';
  if (score >= 6) return 'bg-yellow-400';
  return 'bg-red-400';
};

vi.mock('@/components/Firebase/individualData');

describe('IndividualDashboard component', () => {
  const mockUser = {
    userId: 1,
    name: 'John Doe',
    avatarURL: null,
    job: 'Software Engineer',
    teams: [] as DocumentReference[],
    metrics: [
      {
        title: 'Technical Excellence',
        description: 'Assessing code quality, system design, and tech choices.',
        summary: 'Excellent',
        score: 8.5,
      },
    ],
  };

  const mockTasks = [
    {
      title: 'Refactor Login Module',
      description: 'Refactor the login module to use the new authentication service.',
      dueDate: '2024-05-23',
      priority: 'High',
      status: 'In Progress',
      team: {} as DocumentReference,
      assignedTo: [] as DocumentReference[],
    },
  ];

  beforeEach(() => {
    vi.mocked(fetchUserDetails).mockResolvedValue(mockUser);
    vi.mocked(fetchUserTasks).mockResolvedValue(mockTasks);
    render(<IndividualDashboard />);
  });

  test('should render the component', () => {
    const header = screen.getByText(/Hi, NAME/i);
    expect(header).toBeInTheDocument();
  });

  test('should render Metrics List section', async () => {
    await waitFor(() => {
      const metricsHeader = screen.getByText(/Metrics List/i);
      expect(metricsHeader).toBeInTheDocument();

      const metricElement = screen.getByText(mockUser.metrics[0].title);
      expect(metricElement).toBeInTheDocument();
    });
  });

  test('should render correct progress bar width for each metric', async () => {
    await waitFor(() => {
      mockUser.metrics.forEach((metric) => {
        const progressBar = screen
          .getByText(metric.title)
          .parentElement?.querySelector('.bg-gray-300 > div');
        expect(progressBar).toHaveStyle(`width: ${metric.score * 10}%`);
      });
    });
  });

  test('should render correct progress bar color for each metric', async () => {
    await waitFor(() => {
      mockUser.metrics.forEach((metric) => {
        const progressBar = screen
          .getByText(metric.title)
          .parentElement?.querySelector('.bg-gray-300 > div');
        const expectedColor = getBarColor(metric.score);
        expect(progressBar).toHaveClass(expectedColor);
      });
    });
  });

  test('should render Upcoming Meetings section', () => {
    const meetingsHeader = screen.getByText(/Upcoming Meetings/i);
    expect(meetingsHeader).toBeInTheDocument();

    const meetingTitles = ['Sprint Planning', 'Team Sync', 'Project Review'];

    meetingTitles.forEach((title) => {
      const meetingElement = screen.getByText(title);
      expect(meetingElement).toBeInTheDocument();
    });
  });

  test('should render Current Tasks section', async () => {
    await waitFor(() => {
      const tasksHeader = screen.getByText(/Current Tasks/i);
      expect(tasksHeader).toBeInTheDocument();

      const taskElement = screen.getByText(mockTasks[0].title);
      expect(taskElement).toBeInTheDocument();
    });
  });
});
