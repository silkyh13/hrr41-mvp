import React from "react";
import { subMonths, addMonths, compareAsc, format } from 'date-fns'

import styles from './styles.css';
class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),//Sat Nov 16 2019 21:03:38 GMT-0500
    selectedDate: new Date()
  };
  // return the left, Month, and right button at the top of the calendar
  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1)
    });
  };
  renderHeader() {
    const dateFormat = 'MMMM';
    return (
      <div className="header row flex-middle">

        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            go_left
          </div>
        </div>

        <div className="col col-center">
          <span>
            {format(this.state.currentMonth, dateFormat)}
          </span>
        </div>

        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">
            go_right
          </div>
        </div>

      </div>
    )
  }


  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}

      </div>
    );
  }
}



export default Calendar;