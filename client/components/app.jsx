import React from "react";
import List from "./list.jsx";
import Calendar from "./calendar.jsx"
import Form from "./form.jsx"
import moment from 'moment';
import axios from 'axios';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: '',
      month: '',
      data: [],
      currentDate: ''
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  yearMonth = (year, month) => {
    this.setState({
      year, month
    })
  }
  componentDidMount() {

    let moments  = moment().format()
    let day = moments.slice(0, 19);

    axios.get('/api/schedule')
    .then((results) => {
      const compareDate = function (a,b) {
        return (new Date(a.event_start)) - (new Date(b.event_start));
      }
      const sorted = results.data.sort(compareDate);
      this.setState({data: sorted, currentDate: day})
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <div >
        <div>
        <List componentDidMount={this.componentDidMount} data={this.state.data} currentDate={this.state.currentDate} year={this.state.year} month={this.state.month}/>
        </div>

        <div>
        <Calendar yearMonth={this.yearMonth}/>
        </div>

        <Form componentDidMount={this.componentDidMount} data={this.state.data} currentDate={this.state.currentDate}/>
      </div>
    );
  }
}

export default App;