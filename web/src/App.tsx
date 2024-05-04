import BlueContainer from './components/BlueComponent/BlueContainer';
import GreenContainer from './components/GreenComponent/GreenContainer';
import RedComponent from './components/RedComponent/RedComponent';
import { User } from './types/interfaces/types';
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
      name: 'Long John Long',
      avatarURL:
        'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
      email: 'LongJohnLong2026@u.northwestern.edu',
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
    {
      id: 5,
      name: 'Chelsey Tao',
      avatarURL:
        'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
      email: 'ChelseyTao2027@u.northwestern.edu',
      teamColor: 'green',
    },
  ];

  return (
    <div>
      <div className="flex flex-col space-x-4 items-center gap-16">
        <BlueContainer user={usersArray[2]} key={usersArray[2].id} />
      </div>
      <div className="flex flex-col space-x-4 items-center gap-16">
        <RedComponent user={usersArray[1]} key={usersArray[1].id} />
      </div>
      <div className="flex flex-col space-x-4 items-center gap-16">
        <GreenContainer user={usersArray[0]} key={usersArray[0].id} />
        <GreenContainer user={usersArray[3]} key={usersArray[3].id} />
        <GreenContainer user={usersArray[4]} key={usersArray[4].id} />
      </div>
    </div>
  );
}

export default App;
