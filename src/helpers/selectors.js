 
  export function getAppointmentsForDay(state, day) {
  const selectedDay= state.days.filter(ele => ele.name === day );
  return (selectedDay.length) ? selectedDay[0].appointments.map(ele => state.appointments[ele]) : [];
}


 export function getInterview(state, schedule) {
  // console.log('from selector file:', schedule)
  //  if (!schedule) return null
  // const newSchedule = {...schedule, interviewer: interviewers[schedule.interviewer] }
  // console.log('selector:', newSchedule)
  //  return newSchedule

  return (!schedule) ?  null: {...schedule, interviewer: state.interviewers[schedule.interviewer] }

 
}


//console.log(getInterview(state, schedule))
// console.log(getAppointmentsForDay(state, 'Monday'))

