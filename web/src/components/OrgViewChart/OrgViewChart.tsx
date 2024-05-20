import { OrgViewChartProps } from '@/types/interfaces/types';

export default function OrgViewChart({ heading, chart }: OrgViewChartProps) {
  return (
    <div className="w-full max-w-md bg-white rounded-lg border">
      <div className="px-6 py-4 border-b">
        <h2 className="font-medium">{heading}</h2>
      </div>
      <div className="p-6">{chart}</div>
    </div>
  );
}
