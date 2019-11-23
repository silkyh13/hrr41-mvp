import React from "react";
import moment from "moment";



class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.width = props.width || "30%";//default is 350
  }
  state = {
    today: moment(),
    showMonth: false,
    showYear: false,
    savedYear: moment().format("YYYY"),
    savedMonth: moment().format("MMMM")
  }
  componentDidMount = () => {

    this.props.yearMonth(this.state.savedYear, this.state.savedMonth);
  }

  weekdays = moment.weekdays();//["Sunday", "Monday"...]
  abbrevdays = moment.weekdaysShort(); //[Sun, Mon, Tue...]
  months = moment.months();//["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
/* ____________________________________________________*/
  //retrieve current year
  year = () => {
    let year = this.state.today.format("Y");//2019
    return year;
  }
  yearHeader = () => {
    return (
      this.state.showyearHeader ?
      <input
          defaultValue = {this.year()}
          className="editor-year"
          type="number"
          placeholder="year"/>
      :
      <span className="label-year">
          {this.year()}
      </span>
    )
  }

/* ____________________________________________________*/
  //retrieve current month
  month = () => {
    let month = this.state.today.format("MMMM");//"November"
    return month;
  }
  //retrieve total days in current month
  daysInMonth = () => {
    return this.state.today.daysInMonth();
  }
  //current date in number
  currentDate = () => {
    return this.state.today.get("date");
  }
  //current date in string
  currentDay = () => {
    return this.state.today.format("D");// "19"
  }
  //position of first day in month [0,1,2,3,4,5,6]
  //first example, if 1 is on friday, return 5
  firstDayOfMonth = () => {
    let firstDay = moment(this.state.today).startOf('month').format('d');//5 for November 2019
    return firstDay;
  }
  setMonth = (month) => {
    let monthNo = this.months.indexOf(month);
    let today = Object.assign({}, this.state.today);
    today = moment(today).set("month", monthNo);
    this.setState({
        today: today
    });
}
// savedYear: this.state.today.format("Y")
nextMonth = () => {
  let today = Object.assign({}, this.state.today);
  today = moment(today).add(1, "month");
  // console.log(this.state.today.format("MMMM"), 'today')
  this.setState({
      today: today,
      savedMonth: this.state.today.add(1, "month").format("MMMM"),
      savedYear: this.state.today.format("YYYY")
  }, () => this.props.yearMonth(this.state.savedYear, this.state.savedMonth));

}

prevMonth = () => {
  let today = Object.assign({}, this.state.today);
  today = moment(today).subtract(1, "month");
  this.setState({
      today: today,
      savedMonth: this.state.today.subtract(1, "month").format("MMMM"),
      savedYear: this.state.today.format("YYYY")
  }, () => this.props.yearMonth(this.state.savedYear, this.state.savedMonth));

}

  //when I click on a month, it should change the data for that month
  onSelectChange = (e, data) => {
    this.setMonth(data);
    this.props.onChangeMonth && this.props.onChangeMonth();
  }
  SelectList = (props) => {
    let monthNames = props.data.map((data) => {
      return (
        <div key={data}>
          <a href="#month" onClick={(e) => {this.onSelectChange(e, data)}}>
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
  //drop down for months
  onChangeMonth = (e, month) => {
    this.setState({
      showMonth: !this.state.showMonth
    });
  }
  monthHeader = () => {
    return (
      <span className="label-month"
      onClick={(e)=> {this.onChangeMonth(e, this.month())}}>
      {this.month()}
      {this.state.showMonth &&
      <this.SelectList data={this.months} />
      }
  </span>
  );
  }
  render() {
    console.log(this.state.showMonth)
    // console.log(this.month(), this.year())
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
                  {" "}
                  <this.yearHeader />
                </td>
                <td colSpan="2" className="nav-month">
                    <i className="prev fa fa-fw fa-chevron-left"
                        onClick={(e)=> {this.prevMonth()}}>
                    </i>
                    <i className="prev fa fa-fw fa-chevron-right"
                        onClick={(e)=> {this.nextMonth()}}>
                    </i>
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