import FrameContainer from './components/FrameContainer/FrameContainer';
import { User } from './types/interfaces/types';
import BlueContainer from './components/BlueComponent/BlueContainer';
function App() {
  const usersArray: User[] = [
    {
      id: 1,
      name: 'Ethan Pineda',
      avatarURL:
        'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
      email: 'EthanPineda2025@u.northwestern.edu',
      teamColor: 'green',
    },
    {
      id: 2,
      name: 'Isa Gonzalez',
      avatarURL:
        'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
      email: 'IsaGonzalez2025@u.northwestern.edu',
      teamColor: 'red',
    },
    {
      id: 3,
      name: 'Sam Ridet',
      avatarURL:
        'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
      email: 'SamuelRidet2025@u.northwestern.edu',
      teamColor: 'blue',
    },
    {
      id: 4,
      name: 'Miya Liu',
      avatarURL:
        'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
      email: 'MiyaLiu2026@u.northwestern.edu',
      teamColor: 'green',
    },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold text-center p-16">
        CS 394 - Tribe B - Client Project
      </h1>
      <div className="flex flex-col space-x-4 items-center gap-16">
        {usersArray.map((user) => (
          <FrameContainer user={user} key={user.id} />
        ))}
      </div>
      <div className="flex flex-col space-x-4 items-center gap-16">
        <BlueContainer user={usersArray[2]} key = {usersArray[2].id}/>
      </div>
    </div>
  );
} 

export default App;
