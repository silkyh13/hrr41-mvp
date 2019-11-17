import React from 'react';
import styles from './styles.css';
import axios from 'axios';
class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMonth: new Date(),
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
    //output
    // {"event_start": "2019-12-13 08:00:00",
    // "event_end": "2019-12-28 10:00:00",
    // "event_description": "BTS World Tour “LOVE YOURSELF” in Nagoya – Japan (Nagoya Dome)"
    // }
    let convert = (date) => {
      let saveDate = date.slice(0, 10)
      let saveTime = ' ' + date.slice(11, 16) + ':00';
      let converted = saveDate + saveTime;
      return converted;
    }
    let start = convert(this.state.dateStart);
    let end = convert(this.state.dateEnd);

  }

  componentDidMount() {
    axios.get('/api/schedule')
    .then((results) => {

      this.setState({data: results.data })
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
            <input type="datetime-local" value={this.state.dateStart || "2019-12-12T19:30"}
            min="2019-12-12T00:00"  onChange={this.handleDateStart}></input>
          </label>

          <label>
            End:
            <input type="datetime-local" value={this.state.dateEnd || "2019-12-19T19:30"} min="2019-12-13T00:00" onChange={this.handleDateEnd}></input>
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