import { render, screen, fireEvent } from '@testing-library/react';
import { test } from 'vitest';
import assert from 'assert';
import TeamView, { sortByFollowers, sortByName, sortByLastUpdated } from '../pages/TeamView';
import { Team } from '../types/interfaces/types';

test('renders TeamView component correctly', async () => {
    render(<TeamView />);
    const teamViewElement = screen.getByText(/Your Results/i);
    assert.ok(teamViewElement);
});

test('filtering should render', async () => {
    render(<TeamView />);

    const dropdown = await screen.findByText(/Sort By/i);
    assert.ok(dropdown);
});

test('renders search box and dropdown components on load', async () => {
    render(<TeamView />);

    const searchBox = screen.getByPlaceholderText(/Search Teams.../i);
    const dropdown = screen.getByText(/Sort By/i);

    assert.ok(searchBox);
    assert.ok(dropdown);
});

test('search bar should work generally', async () => {
    render(<TeamView />);

    const searchBox = screen.getByPlaceholderText(/Search Teams.../i) as HTMLInputElement;
    fireEvent.change(searchBox, { target: { value: 'test' } });

    assert.strictEqual(searchBox.value, 'test');
});

test('filtering should work generally', async () => {
    render(<TeamView />);

    const dropdown = screen.getByText(/Sort By/i);
    fireEvent.click(dropdown);

    const option1 = screen.getByText(/Last Updated/i);
    const option2 = screen.getByText(/Lexicographic Order/i);
    const option3 = screen.getByText(/Most Followed/i);

    assert.ok(option1);
    assert.ok(option2);
    assert.ok(option3);
});

test('follow/unfollow button components should load correctly', async () => {
    render(<TeamView />);

    const followButton = screen.getByText(/Following/i);
    const unfollowButton = screen.getByText(/Explore/i);

    assert.ok(followButton);
    assert.ok(unfollowButton);
});

describe('TeamView', () => {
    it('should sort teams by name in lexicographic order', () => {
        const teams: Team[] = [
            {
                follow: true,
                followers: ['user1', 'user2'],
                LastUpdated: '2022-01-01T12:00:00Z',
                name: 'Team A',
                MeetingTopics: [{ Topic: 'Topic 1', Occurrence: 5 }],
                Permissions: 'Read',
                insights: 10,
                maturity: 7,
                activeIssues: 2
            },
            {
                follow: false,
                followers: ['user3', 'user4', 'user5'],
                LastUpdated: '2022-02-01T12:00:00Z',
                name: 'Team B',
                MeetingTopics: [{ Topic: 'Topic 2', Occurrence: 3 }],
                Permissions: 'Write',
                insights: 8,
                maturity: 6,
                activeIssues: 1
            },
            {
                follow: true,
                followers: ['user6'],
                LastUpdated: '2022-03-01T12:00:00Z',
                name: 'Team C',
                MeetingTopics: [{ Topic: 'Topic 3', Occurrence: 7 }],
                Permissions: 'Edit',
                insights: 6,
                maturity: 5,
                activeIssues: 0
            },
        ];

        const sortedTeams = sortByName(teams);

        expect(sortedTeams[0].name).toBe('Team A');
        expect(sortedTeams[1].name).toBe('Team B');
        expect(sortedTeams[2].name).toBe('Team C');
    });
});

describe('TeamView', () => {
    it('should sort teams by last updated date', () => {
        const formatDate = (date: Date): string => {
            return date.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            });
        };
        const teams: Team[] = [
            {
                follow: true,
                followers: ['user1', 'user2'],
                LastUpdated: '2022-01-01T12:00:00Z',
                name: 'Team A',
                MeetingTopics: [{ Topic: 'Topic 1', Occurrence: 5 }],
                Permissions: 'Read',
                insights: 10,
                maturity: 7,
                activeIssues: 2
            },
            {
                follow: false,
                followers: ['user3', 'user4', 'user5'],
                LastUpdated: '2022-02-01T12:00:00Z',
                name: 'Team B',
                MeetingTopics: [{ Topic: 'Topic 2', Occurrence: 3 }],
                Permissions: 'Write',
                insights: 8,
                maturity: 6,
                activeIssues: 1
            },
            {
                follow: true,
                followers: ['user6'],
                LastUpdated: '2022-03-01T12:00:00Z',
                name: 'Team C',
                MeetingTopics: [{ Topic: 'Topic 3', Occurrence: 7 }],
                Permissions: 'Edit',
                insights: 6,
                maturity: 5,
                activeIssues: 0
            },
        ];

        const sortedTeams = sortByLastUpdated(teams);

        expect(sortedTeams[0].name).toBe('Team C');
        expect(sortedTeams[1].name).toBe('Team B');
        expect(sortedTeams[2].name).toBe('Team A');
    });

    it('should sort teams by most followed', () => {
        const teams: Team[] = [
            {
                follow: true,
                followers: ['user1', 'user2'],
                LastUpdated: '2022-01-01T12:00:00Z',
                name: 'Team A',
                MeetingTopics: [{ Topic: 'Topic 1', Occurrence: 5 }],
                Permissions: 'Read',
                insights: 10,
                maturity: 7,
                activeIssues: 2
            },
            {
                follow: false,
                followers: ['user3', 'user4', 'user5'],
                LastUpdated: '2022-02-01T12:00:00Z',
                name: 'Team B',
                MeetingTopics: [{ Topic: 'Topic 2', Occurrence: 3 }],
                Permissions: 'Write',
                insights: 8,
                maturity: 6,
                activeIssues: 1
            },
            {
                follow: true,
                followers: ['user6'],
                LastUpdated: '2022-03-01T12:00:00Z',
                name: 'Team C',
                MeetingTopics: [{ Topic: 'Topic 3', Occurrence: 7 }],
                Permissions: 'Edit',
                insights: 6,
                maturity: 5,
                activeIssues: 0
            },
        ];
        const sortedTeams = sortByFollowers(teams);
        expect(sortedTeams[0].name).toBe('Team B');
        expect(sortedTeams[1].name).toBe('Team A');
        expect(sortedTeams[2].name).toBe('Team C');
    });
});