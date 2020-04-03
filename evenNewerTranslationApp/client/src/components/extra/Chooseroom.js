import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import axios from "axios";
import { Link } from "react-router-dom";

var userarray = []  
const Chooseroom =({location}) => {


    const [name, setName] = useState('');
    const [room, setRoom] = useState('');;
    const [users, setUsers] = useState([]);

const ENDPOINT = 'localhost:5000'
 console.log(users)
  
    useState(() => {
    axios.get('http://localhost:5000/testapi/user')
    .then(function (response) {
      setUsers(response.data)
      console.log(users)
    })
    .catch(function (error) {
      console.log(error);
    });
}, [users])
  console.log(userarray)
    useEffect(() => {
        const {name} = queryString.parse(location.search);
        setName(name);
    }, [ENDPOINT, location.search]);

  console.log(users);

      return (
        <div>
            <h1>Welcome{name}</h1>
            <h2>Select Room</h2>
        </div>
      )
  }

  
  export default Chooseroom