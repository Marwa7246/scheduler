import React from 'react';
import DayListItem from 'components/DayListItem'

export default function DayList(props) {
 console.log(props);
 const dayList = props.days.map(day => {
   return (
     <DayListItem
            name={day.name}
            spots={day.spots}
            setDay={props.setDay}
            selected= {day.name===props.day}
      />
   )

 })
 
  return (
    <ul>
      {dayList}
    </ul>
  );
}