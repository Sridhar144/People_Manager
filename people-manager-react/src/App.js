// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import GlobalStyle from './globalStyles'; // Import the global styles

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PeopleList from './components/PeopleList';
import PersonForm from './components/PersonForm';
import DeleteConfirmation from './components/DeleteConfirmation';

const App = () => {
  return (
    
    <Router>
          <GlobalStyle /> {/* Apply global styles */}

      <div>
        <h1>People Manager</h1>
        <Routes>
          <Route path="/" element={<PeopleList />} />
          <Route path="/add" element={<PersonForm />} />
          <Route path="/edit/:id" element={<PersonForm />} />
          <Route path="/delete/:id" element={<DeleteConfirmation />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
