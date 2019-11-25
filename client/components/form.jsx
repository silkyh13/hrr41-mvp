import React from 'react';
import axios from 'axios';
import moment from 'moment';

class Form extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      startDate: '',
      endDate: '',
      event: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let convertDate = (date) => {
      return this.props.convert(date)
    }
    let start = convertDate(this.state.startDate);
    let end = convertDate(this.state.endDate);
    let current = convertDate(this.props.currentDate)
    let defined = (date) => {
      if (date.length > 18) {
        return date
      }
      return current
    }
    axios.post('/api/schedule', {
      event_start: defined(start),
      event_end: defined(end),
      event_description: this.state.event
    })
    .then((response) => {
      console.log('response.data', response.data);
      this.props.componentDidMount();
    })
    .catch((error) => {
      console.log(error);
    })
  }


  handlestartDate = (event) => {
    // console.log(event.target.value)
    this.setState({startDate: event.target.value});
  }

  handleendDate = (event) =>{
    // console.log(event.target.value)
    this.setState({endDate: event.target.value});
  }

  handleEvent = (event) => {
    this.setState({event: event.target.value});
  }

  render () {

    const {startDate, endDate, event } = this.state;
    return (
    <div>
      <form onSubmit={this.handleSubmit}>

      <label className="label">
        Start:
        <input type="datetime-local" value={startDate || this.props.currentDate} min={this.props.currentDate}  onChange={this.handlestartDate} className="inputLabel"></input>
      </label>

      <label className="labelEnd">
        End:
        <input type="datetime-local" value={endDate || this.props.currentDate} min={this.props.currentDate} onChange={this.handleendDate} className="inputLabel"></input>
      </label>

      <label className="label">
        Event:
        <input type="text" placeholder="event" value={event || ''} onChange={this.handleEvent} className="inputLabel"/>
      </label>


      <label>
        <input className="submit" type="submit" value="Submit" />
      </label>

      </form>
    </div>
    )
  }
}




export default Form;
