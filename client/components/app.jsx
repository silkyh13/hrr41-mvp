import React from "react";
import Form from "./Form.jsx";
import Calendar from "./Calendar.jsx"
class App extends React.Component {

  render() {
    return (
      <div >
        <div>
        <Form />
        </div>
        <div>
        <Calendar />
        </div>

      </div>
    );
  }
}

export default App;