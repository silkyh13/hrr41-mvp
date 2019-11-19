import React from "react";
import moment from "moment";



class Calendar extends React.Component {

  constructor(props) {
    super(props);
    this.width = props.width || "350px";//default is 350
  }

  state = {
    currDay: moment(),
    today: moment(),
    showMonth: false
  }
  weekdays = moment.weekdays();//["Sunday", "Monday"...]
  abbrevdays = moment.weekdaysShort(); //[Sun, Mon, Tue...]
  months = moment.months();//["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  //retrieve current year
  year = () => {
    return this.state.currDay.format("Y");//2019
  }
  //retrieve current month
  month = () => {
    return this.state.currDay.format("MMMM");//"November"
  }
  //retrieve total days in current month
  daysInMonth = () => {
    return this.state.currDay.daysInMonth();
  }
  //current date in number
  currentDate = () => {
    return this.state.currDay.get("date");
  }
  //current date in string
  currentDay = () => {
    return this.state.currDay.format("D");// "19"
  }
  //position of first day in month [0,1,2,3,4,5,6]
  //first example, if 1 is on friday, return 5

  firstDayOfMonth = () => {

    let firstDay = moment(moment()).startOf('month').format('d');//5 for November 2019
    return firstDay;
  }
  SelectList = (props) => {
    let monthNames = props.data.map((data) => {
      return (
        <div key={data}>
          <a>
            {data}
          </a>
        </div>
      )
    });
    return (
      <div className="monthNames">
        {monthNames}
      </div>
    )
  }

  onChangeMonth = (e, month) => {
    this.setState({
      showMonth: !this.state.showMonth
    });
  }
  monthHeader = () => {
    return (
      <span className="label-month" onClick={(e) => {this.onChangeMonth(e, this.month())}}>

          {this.month()}
          {this.state.showMonth &&
            <this.SelectList data={this.months} />
          }
      </span>
  );
  }

  render() {
    // console.log( moment(moment()).startOf('month').format('d'))
      let weekdays = this.abbrevdays.map((day) => {
          return (
              <td key={day} className="week-day">{day}</td>
          )
      });
      //leave some space before the first day of the month
      let blanks = [];
      //calendar has days from previous month shown
      for (let i = 0; i < this.firstDayOfMonth(); i++) {
        blanks.push(<td key={i*10} className="previousDays">
          {""}
        </td>);
      }

      let daysInMonth = [];
      for (let d = 1; d <= this.daysInMonth(); d++) {

        let eachDay = (d == this.currentDay() ? "current-day": "day");
        daysInMonth.push(
            <td key={d} className={eachDay} >
                <span >{d}</span>
            </td>
        );
      }

      var displayDays = [...blanks, ...daysInMonth];
      let rows = [];
      let cells = [];
      displayDays.forEach((row, i) => {
        if ((i % 7) !== 0) {
            cells.push(row);
        } else {
            let insertRow = cells.slice();
            // console.log('insertRow', insertRow)[3, 4, 5, 6, 7, 8, 9]
            rows.push(insertRow);
            cells = [];// clear the days saved
            cells.push(row);
        }
        if (i === displayDays.length - 1) {
            let insertRow = cells.slice();
            rows.push(insertRow);
        }
      });

      let eachDay = rows.map((d, i) => {
        return (
            <tr key={i*10}>
                {d}
            </tr>
        );
      })
      return (
          <div className="calendar-container">
            <table className="calendar">
              <thead>
                <tr className="calendar-header">
                <td colSpan ="5">
                  <this.monthHeader />
                </td>
                </tr>
              </thead>

              <tbody>
                <tr>
                  {weekdays}
                </tr>
                  {eachDay}
              </tbody>
            </table>

          </div>

      );
  }
}

export default Calendar;