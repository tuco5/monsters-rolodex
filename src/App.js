import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

import './App.css';

const App = () => {
  const [searchField, setSerachField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filterMonsters, setFilterMonsters] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilterMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField)
    );

    setFilterMonsters(newFilterMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSerachField(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox placeholder="search monsters" handleChange={onSearchChange} />
      <CardList monsters={filterMonsters} />
    </div>
  );
};

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: '',
//     };
//   }

//   componentDidMount() {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then((response) => response.json())
//       .then((users) => this.setState({ monsters: users }));
//   }

//   onSearchChange = (event) => {
//     this.setState(() => ({ searchField: event.target.value.toLowerCase() }));
//   };

//   render() {
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filterMonsters = monsters.filter((monster) =>
//       monster.name.toLowerCase().includes(searchField.toLowerCase())
//     );

//     return (
//       <div className="App">
//         <h1>Monsters Rolodex</h1>
//         <SearchBox
//           placeholder="search monsters"
//           handleChange={onSearchChange}
//         />
//         <CardList monsters={filterMonsters} />
//       </div>
//     );
//   }
//};

export default App;
