 
  export function getAppointmentsForDay(state, day) {
  const selectedDay= state.days.find(ele => ele.name === day );
  console.log('selectedDay', selectedDay)
  return (selectedDay) ? selectedDay.appointments.map(appointId => state.appointments[appointId]) : [];
}


 export function getInterview(state, schedule) {
  // console.log('from selector file:', schedule)
  //  if (!schedule) return null
  // const newSchedule = {...schedule, interviewer: interviewers[schedule.interviewer] }
  // console.log('selector:', newSchedule)
  //  return newSchedule

  return (!schedule) ?  null: {...schedule, interviewer: state.interviewers[schedule.interviewer] }

 
}
export function getIterviewersForDay(state, day) {
  const selectedDay= state.days.find(ele => ele.name === day );
  return (selectedDay) ? selectedDay.interviewers.map(intervId => state.interviewers[intervId]) : [];
}

//console.log(getInterview(state, schedule))
// console.log(getAppointmentsForDay(state, 'Monday'))

