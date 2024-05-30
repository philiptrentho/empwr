import { TeammateListProps } from '@/types/interfaces/types';

import TeammateCard from '../TeammateCard/TeammateCard';

export default function TeammateList({ teammates }: TeammateListProps) {
  return (
    <div className="max-w-full">
      <div className="flex flex-wrap auto-cols-max gap-8">
        {teammates.map((teammate) => (
          <TeammateCard {...teammate} key={teammate.user.userId} />
        ))}
      </div>
    </div>
  );
}
