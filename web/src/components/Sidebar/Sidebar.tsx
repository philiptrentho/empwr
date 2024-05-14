import { Link } from 'react-router-dom';

export default function Sidebar() {
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
          <li className="mb-2">
            <Link
              to="/OrganizationView"
              className="block p-4 bg-white bg-opacity-0 hover:bg-opacity-5 py-3"
            >
              Organization
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/TeamView"
              className="block p-4 bg-white bg-opacity-0 hover:bg-opacity-5 py-3"
            >
              Team
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/IndividualView"
              className="block p-4 bg-white bg-opacity-0 hover:bg-opacity-5 py-3"
            >
              Individual
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
