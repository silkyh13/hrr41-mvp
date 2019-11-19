import React from 'react';
import axios from 'axios';
import moment from 'moment';
import ListEvents from './listEvents.jsx'
import Modal from './modal.jsx'

const styles = {
  list: {
    position: "absolute",
    paddingLeft: "70px",
    maxWidth: "600px",
  }
}

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
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  handleUpdate(id) {
    let start = convert(this.state.startDate);
    let end = convert(this.state.endDate);
    axios.put('/api/schedule/' + id, {
      event_start: start,
      event_end: end
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });

  }

  handleDelete(id) {

    axios.delete('/api/schedule/' + id)
    .then(response => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
    this.componentDidMount();
  }

  toggleModal = (event) => {
    let defined = event.target.getAttribute('id');
    if (defined) {
      this.setState((state) => ({ show: !state.show }));
    }

  }
  onClick = (event) => {
    let element = event.target;
    let start = convert(element.getAttribute('start_date'));
    let end = convert(element.getAttribute('end_date'));

    this.setState({
      clickedEvent: {
        start: start,
        end: end,
        clickedE: element.getAttribute('event'),
        id: element.getAttribute('id')
      },
      show: true
    })
  }

  handlestartDate = (event) => {
    console.log(event.target.value)
    this.setState({startDate: event.target.value});
  }

  handleendDate = (event) =>{
    console.log(event.target.value)
    this.setState({endDate: event.target.value});
  }

  handleEvent = (event) => {
    this.setState({event: event.target.value});
  }

  handleDelete(id) {
    axios.delete('/api/schedule/' + id)
    .then(response => {
      this.setState((state) => ({ show: !state.show }))
      console.log(response);
    });
    this.componentDidMount();
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

  render () {
    const {show, startDate, currentDate, endDate, event } = this.state;
    const {start, end, clickedE, id} = this.state.clickedEvent;
    return (
      <div>
        <Modal toggle={this.toggleModal} show={show} id={id} start={start} end={end} event={clickedE}  deleteEvent={this.handleDelete} startDate={startDate} currentDate={currentDate} endDate={endDate} onSubmit={this.handleUpdate} handlestartDate={this.handlestartDate} handleendDate={this.handleendDate} handleEvent={this.handleEvent}/>

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

        <ol style={styles.list}>
          {this.state.data.map((event, index) => <ListEvents key={index} onClick={this.onClick} event={event}
          />)}
        </ol>

      </div>
    )
  }

}
export default Form;