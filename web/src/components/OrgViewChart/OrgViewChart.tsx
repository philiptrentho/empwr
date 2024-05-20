import { OrgViewChartProps } from '@/types/interfaces/types';

export default function OrgViewChart({ heading, chart }: OrgViewChartProps) {
  return (
    <div className="w-full flex-1 max-w-lg bg-white rounded-lg border">
      <div className="px-6 py-4 border-b">
        <h2 className="font-medium">{heading}</h2>
      </div>
      <div className="p-6 flex justify-center items-center">{chart}</div>
    </div>
  );
}
