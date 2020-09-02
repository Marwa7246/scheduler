import React, { useState }  from "react";

//import DayListItem from "components/DayListItem"
import DayList from "components/DayList"
import Appointment from "components/appointment";


import "components/Application.scss";


 const days = [
    {
      id: 1,
      name: "Monday",
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 5,
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 0,
    },
  ];

  const appointments = [
    {
      id: 1,
      time: "12pm",
    },
    {
      id: 2,
      time: "1pm",
      interview: {
        student: "Lydia Miller-Jones",
        interviewer: {
          id: 1,
          name: "Sylvia Palmer",
          avatar: "https://i.imgur.com/LpaY82x.png",
        }
      }
    },
    {
      id: 3,
      time: "2pm",
      interview: {
        student: "Emily",
        interviewer: { 
          id: 2, 
          name: "Tori Malcolm", 
          avatar: "https://i.imgur.com/Nmx0Qxo.png" 
        }
      }
    },
    {
      id: 4,
      time: "3pm",
      interview: {
        student: "Maria",
        interviewer: { 
          id: 3, 
          name: "Mildred Nazir", 
          avatar: "https://i.imgur.com/T2WwVfS.png"
        }
      }
    },
    {
      id: 5,
      time: "4pm",
      interview: {
        student: "Nohad",
        interviewer: { 
          id: 4, 
          name: "Cohana Roy", 
          avatar: "https://i.imgur.com/twYrpay.jpg"
        }
      }
    }
  ];

export default function Application(props) {
 

  const [day, setDay] = useState("Monday");
  console.log("dayState:", day);

  const parsedAppointments = appointments.map(oneAppointment => {
     console.log(oneAppointment);
     return (<Appointment key={oneAppointment.id} {...oneAppointment} />)
    })
      

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
          days={days}
          day={day}
          setDay={day => setDay(day)}
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
        {parsedAppointments}
        <Appointment id="last" time="5pm" />
      </section>
    </main>
  );
}


