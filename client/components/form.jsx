import React from 'react';
import styles from './styles.css';
import axios from 'axios';
import moment from 'moment';

let convert = (date) => {
  let saveDate = date.slice(0, 10)
  let saveTime = ' ' + date.slice(11, 19);
  let converted = saveDate + saveTime;
  return converted;
}

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDate: '',
      startDate: '',
      endDate: '',
      event: '',
      data:[],
      clickedEvent: {}
    }
    this.handlestartDate = this.handlestartDate.bind(this);
    this.handleendDate = this.handleendDate.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  onClick(event) {
    let element = event.target;

    let start = convert(element.getAttribute('start_date'));
    let end = convert(element.getAttribute('end_date'));

    this.setState({
      clickedEvent: {
        start: start,
        end: end,
        event: element.getAttribute('event')
      }
    })

  }
  handlestartDate(event) {
    this.setState({startDate: event.target.value});
  }
  handleendDate(event) {
    this.setState({endDate: event.target.value});
  }
  handleEvent(event) {
    this.setState({event: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    let start = convert(this.state.startDate);
    let end = convert(this.state.endDate);
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
      this.setState({data: results.data, currentDate: day}, () => console.log('your mom', this.state.currentDate) )
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render () {
    let start_date = this.state.clickedEvent.start;
    let end_date = this.state.clickedEvent.end;
    let event = this.state.clickedEvent.event;
    return (
      <div>
        <div>
          start:{start_date} end:{end_date} event:{event}
        </div>

        <form onSubmit={this.handleSubmit}>

          <label>
            Start:
            <input type="datetime-local" value={this.state.startDate || this.state.currentDate} min={this.state.currentDate}  onChange={this.handlestartDate}></input>
          </label>

          <label>
            End:
            <input type="datetime-local" value={this.state.endDate || this.state.currentDate} min={this.state.currentDate} onChange={this.handleendDate}></input>
          </label>

          <label>
            Event:
            <input type="text" placeholder="event" value={this.state.event || ''} onChange={this.handleEvent}/>
          </label>
          <input type="submit" value="Submit" />

        </form>

        <ol>
          {this.state.data.map((event, index) => <li key= {index} onClick={this.onClick} start_date={event.event_start} end_date={event.event_end} event={event.event_description}>
            {event.event_description}
          </li>)}
        </ol>
      </div>
    )
  }

}
export default Form;