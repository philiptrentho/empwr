import { Link } from 'react-router-dom';
export default function Sidebar() {
  const sidebarLinks: string[] = [
    'OrganizationView',
    'TeamView',
    'DetailedTeamView',
    'IndividualView',
  ];

  return (
    <aside className="w-48 h-full bg-brand-700 text-white flex flex-col font-sans">
      <div className="p-4 border-b-2 border-white border-opacity-5">
        <img
          src="../../../resources/Logo.svg"
          alt="empwr.ai"
          className="w-auto h-auto pt-4 px-2"
        />
      </div>
      <nav className="flex-1">
        <ul className="font-semibold">
          {sidebarLinks.map((link, index) => (
            <li key={index} className="p-4 border-b border-white border-opacity-5">
              <Link to={`/${link}`}>{link}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
