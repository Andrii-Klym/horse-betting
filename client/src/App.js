
import { useState} from 'react';
import { io } from 'socket.io-client';

import './App.css';

const jokey = <img src="https://reygif.com/media/2/jockey-16200.gif" alt="jokey"></img>

function App() {
  const socket = io("http://localhost:3002");
  const [horses, setHorses] = useState([]);

  const start = () => {
    try {
      socket.emit('start');
      socket.on('ticker', function(response) {
        const res = Array.isArray(response) ? response : [response];
        setHorses(res)
      });
    } catch (e){
      socket.emit('disconnect')
    }
      }

  return (
    <div className='App'>
      <div className='container'>
        {horses.map(el => <div className='horse' style={{width: 300 + el.distance}}>{el.name} - {el.distance} {jokey}</div>)}
      </div> 
      <button onClick={start} className="button">Start</button>
    </div>
  )

}

export default App;
