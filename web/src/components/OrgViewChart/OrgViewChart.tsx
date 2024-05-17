export default function OrgViewChart(heading: string, chart: any) {
  return (
    <div className="w-full max-w-md bg-white rounded-lg border-2">
      <div className="px-6 py-4 border-b-2">
        <h2 className="font-medium">{heading}</h2>
      </div>
      <div className="p-6">{chart}</div>
    </div>
  );
}
