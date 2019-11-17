import React from "react";

import Calendar from "./Calendar.jsx";
import Form from "./Form.jsx";

class App extends React.Component {

  render() {
    return (
      <div className="App">

        <div className="form">
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