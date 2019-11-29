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
  convert = (date) => {
    let saveDate = date.slice(0, 10)
    let saveTime = ' ' + date.slice(11, 19);
    let converted = saveDate + saveTime;
    return converted;
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
      <div className="app">

        <main>
          <section className="card">
            <Calendar yearMonth={this.yearMonth}/>
          </section>

          <section>
            <Form componentDidMount={this.componentDidMount} data={this.state.data} currentDate={this.state.currentDate} convert={this.convert}/>
          </section >
        </main>

        <aside className="card">
          <List componentDidMount={this.componentDidMount} data={this.state.data} currentDate={this.state.currentDate} year={this.state.year} month={this.state.month} convert={this.convert}/>

        </aside>
      </div>
    );
  }
}

export default App;