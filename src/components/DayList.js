import React from "react";
import DayListItem from "components/DayListItem";

//Component to show the list of the days in the nav bar
export default function DayList(props) {
  const dayList = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return <ul>{dayList}</ul>;
}
