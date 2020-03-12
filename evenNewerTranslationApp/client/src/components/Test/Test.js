import React from 'react';
import axios from 'axios';


export default class PersonList extends React.Component {
  state = {
    persons: []
  }


  render() {
    return (
      <div>

      <ul>
        { this.state.persons.map(person => <li key = {person.id}>{person.name}</li>)}
      </ul>
      </div>
    )
  }
}