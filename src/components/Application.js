import React, { useState, useEffect }  from "react";
import axios from 'axios'

import DayList from "components/DayList"
import Appointment from "components/appointment";
import { getAppointmentsForDay, getInterview, getIterviewersForDay } from "helpers/selectors";
import useApplicationData from '../hooks/useApplicationData'



import "components/Application.scss";

 export default function Application(props) {

  const {state, setDay, bookInterview, cancelInterview} = useApplicationData();

  const interviewers = getIterviewersForDay(state, state.day);

  const appointments = getAppointmentsForDay(state, state.day);
  // console.log('getAppointmentsForDay', appointments)
  // const appWithInterview = appointments.filter(elem => elem.interview);
  // console.log('spots', appointments.length-appWithInterview.length)

  const schedule = appointments.map(oneAppointment => {
    const interviewFound = getInterview(state, oneAppointment.interview);
    
    return (<Appointment 
      key={oneAppointment.id}
      {...oneAppointment} 
      interview= {interviewFound}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />)

  });

 
  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">

        <DayList
          days={state.days}
          day={state.day}
          setDay = {setDay}
        />

      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {schedule}
        <Appointment key="last" id="last" time="5pm" />
      </section>
    </main>
  );
}


