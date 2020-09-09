import React from "react";
import PropTypes from "prop-types";

import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

//Component to show the list of the interviewers with their details while creating/editing appointment
export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;

  const parsedInterviewers = interviewers.map((oneInterviewer) => (
    <InterviewerListItem
      key={oneInterviewer.id}
      {...oneInterviewer}
      selected={oneInterviewer.id === value}
      setInterviewer={(event) => onChange(oneInterviewer.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};
