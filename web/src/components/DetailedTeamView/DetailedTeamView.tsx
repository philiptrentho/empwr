import { Teammate } from '@/types/interfaces/types';

import Card from '../Card/Card';
import ProgressBar from '../ProgressBar/ProgressBar';
import TeammateList from '../TeammateList/TeammateList';

export default function DetailedTeamView() {
  const teammates: Teammate[] = [
    {
      userId: 1,
      name: 'Ethan Pineda',
      role: 'Software Engineer',
      avatarURL: '',
      contributions: ['Contribution 1', 'Contribution 2', 'Contribution 3'],
    },
    {
      userId: 2,
      name: 'Brianna Gallardo',
      role: 'Product Manager',
      avatarURL: '',
      contributions: ['Contribution 1', 'Contribution 2', 'Contribution 3'],
    },
    {
      userId: 3,
      name: 'Miya Liu',
      role: 'Software Engineer',
      avatarURL: '',
      contributions: ['Contribution 1', 'Contribution 2', 'Contribution 3'],
    },
    {
      userId: 4,
      name: 'Chelsey Tao',
      role: 'Software Engineer',
      avatarURL: '',
      contributions: ['Contribution 1', 'Contribution 2', 'Contribution 3'],
    },
    {
      userId: 5,
      name: 'Martin Kong',
      role: 'Software Engineer',
      avatarURL: '',
      contributions: ['Contribution 1', 'Contribution 2', 'Contribution 3'],
    },
  ];

  return (
    <div>
      <div className="p-5 space-y-4">
        <div>
          <h1 className="text-lg font-semibold">Your Results</h1>
          <h2 className="text-xl font-bold">Quantitatively Managed</h2>
          <p className="text-gray-600">
            Teams rely on metrics and advanced tools for decision-making, automating
            testing, and fostering continuous delivery practices...
          </p>
          <ProgressBar level={4} maxLevel={5} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card title="Invited Participants" value={1} />
          <Card title="Contributors" value={1} />
          <Card title="Emerging Themes" value={24} />
          <Card title="Recommendations" value={4} />
        </div>
      </div>
      <div className="max-w-full overflow-x-auto p-4">
        <TeammateList teammates={teammates} />
      </div>
    </div>
  );
}
