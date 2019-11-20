import React from "react";
import Form from "./Form.jsx";
import Calendar from "./Calendar.jsx"
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: '',
      month: ''
    }
  }
  yearMonth = (year, month) => {
    this.setState({
      year, month
    })
  }
  render() {
    return (
      <div >
        <div>
        <Form year={this.state.year} month={this.state.month}/>
        </div>
        <div>
        <Calendar yearMonth={this.yearMonth}/>

        </div>

      </div>
    );
  }
}

export default App;