import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DetailedTeamView from './components/DetailedTeamView/DetailedTeamView';
import Sidebar from './components/Sidebar/Sidebar';
import IndividualView from './pages/IndividualView';
import OrganizationView from './pages/OrganizationView';
import TeamView from './pages/TeamView';

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 p-4 ml-48">
          <Routes>
            <Route path="/" element={<OrganizationView />} />
            <Route path="/OrganizationView" element={<OrganizationView />} />
            <Route path="/TeamView" element={<TeamView />} />
            <Route path="/DetailedTeamView/:teamID" element={<DetailedTeamView />} />

            <Route path="/IndividualView" element={<IndividualView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
