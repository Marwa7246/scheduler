/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import classnames from 'classnames';
import 'components/InterviewerListItem.scss' 

export default function InterviewerListItem(props) {
  console.log(props)

    const interviewerClass = classnames("interviewers__item", {"interviewers__item--selected": props.selected });


  return (
    <li className={interviewerClass} onClick={()=> props.setInterviewer(props.name)}>
      <img className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.name}

    </li>
    
    
  );
}