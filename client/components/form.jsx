import React from 'react';
import styles from './styles.css';
import axios from 'axios';
import moment from 'moment';
import ListEvents from './listEvents.jsx'
import Modal from './modal.jsx'

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
      clickedEvent: {},
      show: false
    }
    this.handlestartDate = this.handlestartDate.bind(this);
    this.handleendDate = this.handleendDate.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  toggleModal() {
    this.setState((state) => ({ show: !state.show }));
  }
  onClick(event) {
    let element = event.target;
    let start = convert(element.getAttribute('start_date'));
    let end = convert(element.getAttribute('end_date'));

    this.setState({
      clickedEvent: {
        start: start,
        end: end,
        clickedE: element.getAttribute('event')
      },
      show: true
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
      this.setState({data: results.data, currentDate: day})
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render () {
    const {show, startDate, currentDate, endDate, event } = this.state;
    const {start, end, clickedE} = this.state.clickedEvent;

    return (
      <div>
        <Modal toggle={this.toggleModal} show={show} start={start} end={end} event={clickedE} />

        <form onSubmit={this.handleSubmit}>
          <label>
            Start:
            <input type="datetime-local" value={startDate || currentDate} min={currentDate}  onChange={this.handlestartDate}></input>
          </label>
          <label>
            End:
            <input type="datetime-local" value={endDate || currentDate} min={currentDate} onChange={this.handleendDate}></input>
          </label>
          <label>
            Event:
            <input type="text" placeholder="event" value={event || ''} onChange={this.handleEvent}/>
          </label>
          <input type="submit" value="Submit" />
        </form>

        <ol>
          {this.state.data.map((event, index) => <ListEvents key={index} onClick={this.onClick} event={event}
          />)}
        </ol>

      </div>
    )
  }

}
export default Form;