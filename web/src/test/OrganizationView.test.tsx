import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { fetchOrgMeetings, getTeamInfo } from '@/components/Firebase/organizationData';
import OrganizationView from '@/pages/OrganizationView';

// Mock the child components
vi.mock('@/components/Decisions/Decisions', () => ({
  __esModule: true,
  default: () => <div>Decisions Chart</div>,
}));

vi.mock('@/components/MaturityScore/MaturityScore', () => ({
  __esModule: true,
  default: () => <div>Maturity Score Chart</div>,
}));

vi.mock('@/components/MeetingTimeChart/MeetingTimeChart', () => ({
  __esModule: true,
  default: () => <div>Meeting Time Chart</div>,
}));

vi.mock('@/components/OrgTeamStats/OrgTeamStats', () => ({
  __esModule: true,
  // @ts-expect-error not dealing with this right now lol
  default: (props) => <div>{props.teamName} Stats</div>,
}));

// Mock the data fetching functions
vi.mock('@/components/Firebase/organizationData', () => ({
  getTeamInfo: vi.fn(),
  fetchOrgMeetings: vi.fn(),
}));

describe('OrganizationView component', () => {
  const mockTeams = [
    {
      teamName: 'Vehicle software',
      meetingTime: 120,
      meetingPercentage: 75,
      decisions: ['Decision 1', 'Decision 2'],
      severity: 0.5,
    },
    {
      teamName: 'Platform systems',
      meetingTime: 150,
      meetingPercentage: 80,
      decisions: ['Decision 3', 'Decision 4'],
      severity: 0.3,
    },
  ];

  const mockMeetings = [
    {
      topic: 'Topic 1',
      timeOnTopic: 30,
      numDecisions: 5,
      attendee: ['user1', 'user2'],
      end: new Date(),
      eventId: 'event1',
      ownerId: 1,
      start: new Date(),
      title: 'Meeting 1',
    },
    {
      topic: 'Topic 2',
      timeOnTopic: 45,
      numDecisions: 8,
      attendee: ['user3', 'user4'],
      end: new Date(),
      eventId: 'event2',
      ownerId: 2,
      start: new Date(),
      title: 'Meeting 2',
    },
  ];

  beforeEach(() => {
    vi.mocked(getTeamInfo).mockResolvedValue(mockTeams);
    vi.mocked(fetchOrgMeetings).mockResolvedValue(mockMeetings);
  });

  test('should render the MeetingTimeChart component', async () => {
    render(<OrganizationView />);
    expect(await screen.findByText(/Meeting Time Chart/i)).toBeInTheDocument();
  });

  test('should render the MaturityScore component', async () => {
    render(<OrganizationView />);
    expect(await screen.findByText(/Maturity Score Chart/i)).toBeInTheDocument();
  });

  test('should render the Decisions component', async () => {
    render(<OrganizationView />);
    expect(await screen.findByText(/Decisions Chart/i)).toBeInTheDocument();
  });

  test('should render the OrgTeamStats components', async () => {
    render(<OrganizationView />);
    await waitFor(() => {
      expect(screen.getByText(/Vehicle software Stats/i)).toBeInTheDocument();
      expect(screen.getByText(/Platform systems Stats/i)).toBeInTheDocument();
    });
  });
});
