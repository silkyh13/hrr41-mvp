import React from "react";
import Form from "./Form.jsx";
import Calendar from "./calendar.jsx"
class App extends React.Component {

  render() {
    return (
      <div >
        <Form />
        <Calendar />
      </div>
    );
  }
}

export default App;