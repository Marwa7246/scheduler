
 export function getAppointmentsForDay(state, day) {
  const selectedDay= state.days.filter(ele => ele.name === day );
  return (selectedDay.length) ? selectedDay[0].appointments.map(ele => state.appointments[ele]) : [];
}


//console.log(getAppointmentsForDay(state, "Monday"))