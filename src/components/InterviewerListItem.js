/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import classnames from "classnames";
import "components/InterviewerListItem.scss";

//Component to show the details of the interviewer (name and image)
export default function InterviewerListItem(props) {
  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
