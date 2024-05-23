import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import Decisions from '@/components/Decisions/Decisions';
import MaturityScore from '@/components/MaturityScore/MaturityScore';
import MeetingTimeChart from '@/components/MeetingTimeChart/MeetingTimeChart';
import OrgTeamStats from '@/components/OrgTeamStats/OrgTeamStats';
import OrganizationView from '@/pages/OrganizationView';

vi.mock('@/components/Decisions/Decisions');
vi.mock('@/components/MaturityScore/MaturityScore');
vi.mock('@/components/MeetingTimeChart/MeetingTimeChart');
vi.mock('@/components/OrgTeamStats/OrgTeamStats');

describe('OrganizationView component', () => {
  beforeEach(() => {
    vi.mocked(Decisions).mockImplementation(() => <div>Decisions Chart</div>);
    vi.mocked(MaturityScore).mockImplementation(() => <div>Maturity Score Chart</div>);
    vi.mocked(MeetingTimeChart).mockImplementation(() => <div>Meeting Time Chart</div>);
    vi.mocked(OrgTeamStats).mockImplementation((props) => (
      <div>{props.teamName} Stats</div>
    ));
  });

  test('should render the MeetingTimeChart component', () => {
    render(<OrganizationView />);
    expect(screen.getByText(/Meeting Time Chart/i)).toBeInTheDocument();
  });

  test('should render the MaturityScore component', () => {
    render(<OrganizationView />);
    expect(screen.getByText(/Maturity Score Chart/i)).toBeInTheDocument();
  });

  test('should render the Decisions component', () => {
    render(<OrganizationView />);
    expect(screen.getByText(/Decisions Chart/i)).toBeInTheDocument();
  });

  test('should render the OrgTeamStats components', () => {
    render(<OrganizationView />);
    expect(screen.getByText(/Vehicle software Stats/i)).toBeInTheDocument();
    expect(screen.getByText(/Platform systems Stats/i)).toBeInTheDocument();
  });
});
