import React from "react";
import styles from './styles.css';
import Calendar from "./Calendar.jsx";
import Form from "./Form.jsx";

class App extends React.Component {

  render() {
    return (

      <div className={styles.App}>
        <div >
          <Form />
        </div>

        <main>
          <Calendar />
        </main>

      </div>
    );
  }
}

export default App;