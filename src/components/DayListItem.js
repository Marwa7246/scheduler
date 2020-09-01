import React from 'react';
import classnames from 'classnames';
import 'components/DayListItem.scss' 

export default function DayListItem(props) {
  console.log(props)

  const formatSpots = function(spotsNumber) {
    let spot = ' spot';
    if (spotsNumber >1 || spotsNumber ===0 ) spot= spot+'s';
    const availableSpots = (spotsNumber ?  spotsNumber : 'no')+ spot; 
    return availableSpots;

  };


  const dayClass = classnames("day-list__item", {"day-list__item--selected": props.selected }, {"day-list__item--full": !props.spots }  );


  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2>{props.name}</h2>
      <h3>{formatSpots(props.spots)} remaining</h3>
    </li>
  );
}