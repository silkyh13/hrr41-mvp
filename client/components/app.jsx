import React from "react";

import styles from './styles.css';
import Calendar from "./Calendar.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">

        <div className="Main">
          <Calendar />
        </div>
      </div>
    );
  }
}

export default App;