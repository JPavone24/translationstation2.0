import React, { useState } from 'react';
import { Link } from "react-router-dom";


import './Join.css';

export default function SignIn() {
  const [username, setUserName] = useState('');
  const [room, setRoom] = useState('');
  const [email, setEmail] = useState('');


  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input placeholder="username" className="joinInput" type="text" onChange={(event) => setUserName(event.target.value)} />
        </div>
        {/* <div>
          <input placeholder="Email" className="joinInput mt-20" type="email" onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div> */}

        <Link onClick={e => (!username) ? e.preventDefault() : null} to={`/chooseroom?name=${username}`}>
          <button className={'button mt-20'} type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  );
}