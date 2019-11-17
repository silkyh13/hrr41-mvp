import React from 'react';
import styles from './styles.css';
import axios from 'axios';
import moment from 'moment';
class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDay: '',
      dateStart: '',
      dateEnd: '',
      event: '',
      data:[]
    }
    this.handleDateStart = this.handleDateStart.bind(this);
    this.handleDateEnd = this.handleDateEnd.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  handleDateStart(event) {
    this.setState({dateStart: event.target.value});
  }
  handleDateEnd(event) {
    this.setState({dateEnd: event.target.value});
  }
  handleEvent(event) {
    this.setState({event: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let convert = (date) => {
      let saveDate = date.slice(0, 10)
      let saveTime = ' ' + date.slice(11, 19);
      let converted = saveDate + saveTime;
      return converted;
    }
    let start = convert(this.state.dateStart);
    let end = convert(this.state.dateEnd);
    axios.post('/api/schedule', {
      event_start: start,
      event_end: end,
      event_description: this.state.event
    })
    .then((response) => {
      console.log('response.data', response.data);
    })
    .catch((error) => {
      console.log(error);
    })
    this.componentDidMount();

  }

  componentDidMount() {
    let moments  = moment().format()
    let day = moments.slice(0, 19);

    axios.get('/api/schedule')
    .then((results) => {
      this.setState({data: results.data, currentDay: day}, () => console.log('your mom', this.state.currentDay) )
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render () {
    return (
      <div>

        <form onSubmit={this.handleSubmit}>

          <label>
            Start:
            <input type="datetime-local" value={this.state.dateStart || this.state.currentDay} min={this.state.currentDay}  onChange={this.handleDateStart}></input>
          </label>

          <label>
            End:
            <input type="datetime-local" value={this.state.dateEnd || this.state.currentDay} min={this.state.currentDay} onChange={this.handleDateEnd}></input>
          </label>

          <label>
            Event:
            <input type="text" placeholder="event" value={this.state.event || ''} onChange={this.handleEvent}/>
          </label>
          <input type="submit" value="Submit" />

        </form>

        <ol>
          {this.state.data.map((event, index) => <li key= {index}>
            {event.event_description}
          </li>)}
        </ol>
      </div>
    )
  }

}
export default Form;