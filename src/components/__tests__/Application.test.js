import React from "react";
import axios from 'axios';
import { render, cleanup, waitForElement, waitForElementToBeRemoved, fireEvent, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, getAllByText, prettyDOM, getByDisplayValue } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe('Application', () => {
  /* test number one */
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  /* test number two */
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
  // 1- Render the Application.
  const { container, debug } = render (<Application />);

  // 2-Wait until the text "Archie Cohen" is displayed.
  await waitForElement(()=> getByText(container, "Archie Cohen"));
  const appointment = getAllByTestId(container, 'appointment')[0];

  // // 3-Click the "Add" button on the first empty appointment.

  fireEvent.click(getByAltText(appointment, /Add/i));

  
  const input = getByPlaceholderText(appointment, /enter student name/i);

  // 4-Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".

  fireEvent.change(input, {target: {value: "Lydia Miller-Jones"}});
  


  // 5-Click the first interviewer in the list.
  fireEvent.click(getByAltText(appointment, /Sylvia Palmer/i));

  // 6-Click the "Save" button on that same appointment.
  fireEvent.click(getByText(appointment, /save/i));


  // 7-Check that the element with the text "Saving" is displayed.
  expect(getByText(appointment, /saving/i)).toBeInTheDocument();

  // 8-Wait until the element with the text "Lydia Miller-Jones" is displayed.
  await waitForElement(() => getByText(appointment, /Lydia Miller-Jones/i));

  //await waitForElementToBeRemoved(() => queryByText(appointment, /saving/i))

  // 9-Check that the DayListItem with the text "Monday" also has the text "no spots remaining".

  const day = getAllByTestId(container, "day");

  const selectedDay = day.find(item=> queryByText(item, "Monday"));
  expect(getByText(selectedDay, /no spots remaining/i)).toBeInTheDocument();

  });

  /* test number three */
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
      // 1- Render the Application.
      const { container, debug } = render (<Application />);
      
      // 2-Wait until the text "Archie Cohen" is displayed.
      await waitForElement(()=> getByText(container, "Archie Cohen"));
      const appointments = getAllByTestId(container, 'appointment');
    
      
      
      //3-Click the "delete" button on the appointment that contains "Archie Cohen".
      const bookedAppoint = appointments.find(item => queryByText(item, "Archie Cohen"));
      fireEvent.click(getByAltText(bookedAppoint, /delete/i));
    
      
      //  const input = getByPlaceholderText(appointment, /enter student name/i);
      
      // 4-Check that the element with the text "Delete the appointment?" is displayed.
      expect(getByText(bookedAppoint, /Delete the appointment?/i)).toBeInTheDocument();
    
    
       // 6-Click the "cancel" button on that same appointment.


      fireEvent.click(getByText(bookedAppoint, /cancel/i));
      expect(getByText(bookedAppoint, /Archie Cohen/i)).toBeInTheDocument();


      //5-Click the "confirm" button on the confirm page after delete again.
      fireEvent.click(getByAltText(bookedAppoint, /delete/i));


      fireEvent.click(getByText(bookedAppoint, /confirm/i));
      
    
      //6-Check that the element with the text "deleting" is displayed.
      expect(getByText(bookedAppoint, /deleting/i)).toBeInTheDocument();
    
      // 7-Wait until the element with the text "deleting" is removed/ or wait until an element with "Add" is in the appointment.
      await waitForElement(() => getByAltText(bookedAppoint, /add/i));
      
      //await waitForElementToBeRemoved(() => queryByText(bookedAppoint, /deleting/i))
        console.log(prettyDOM(bookedAppoint))
    
      // 8-Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
      
      const day = getAllByTestId(container, "day");
      
      const selectedDay = day.find(item=> queryByText(item, "Monday"));
      expect(getByText(selectedDay, /2 spots remaining/i)).toBeInTheDocument();
      
  });

  /* test number four */
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  // 1- Render the Application.
  const { container, debug } = render (<Application />);
  
  // 2-Wait until the text "Archie Cohen" is displayed.
   await waitForElement(()=> getByText(container, "Archie Cohen"));
   const appointments = getAllByTestId(container, 'appointment');

  
  
  //3-Click the "edit" button on the appointment that contains "Archie Cohen".
   const bookedAppoint = appointments.find(item => queryByText(item, "Archie Cohen"));
    fireEvent.click(getByAltText(bookedAppoint, /edit/i));

    //click cancel and expect to get the edit icon again
    fireEvent.click(getByText(bookedAppoint, /cancel/i));
    expect(getByAltText(bookedAppoint, /edit/i)).toBeInTheDocument();

 
  // 4-Check that the element with the placeholder "Archie Cohen" is displayed.
  expect(getByPlaceholderText(bookedAppoint, /Enter Student Name/i)).toBeInTheDocument();

  const input = (getByPlaceholderText(bookedAppoint, /Enter Student Name/i));
  

  //expect(getByDisplayValue(input, "Archie Cohen")).toBeInTheDocument();


  // 5-Click the "save" button after changing the name of the student.
  fireEvent.change(input, {target: {value: 'Chad Takahashi'}});

  fireEvent.click(getByText(bookedAppoint, /save/i));

 
  // 6-Check that the element with the text "Saving" is displayed.
    expect(getByText(bookedAppoint, /Saving/i)).toBeInTheDocument();

  // 7-Wait until the element with the text "saving" is removed/ or wait until an element with "Chad Takahashi" is in the appointment.
  //await waitForElement(() => getByText(bookedAppoint, /Chad Takahashi/i));
  
  await waitForElementToBeRemoved(() => queryByText(bookedAppoint, /saving/i))

  //8-Check that the DayListItem with the text "Monday" also has the text "1 spots remaining".
  
   const day = getAllByTestId(container, "day");
  
  const selectedDay = day.find(item=> queryByText(item, "Monday"));
  expect(getByText(selectedDay, /1 spot remaining/i)).toBeInTheDocument();
      console.log(prettyDOM(bookedAppoint))

  }); 
  
  /* test number five */
  it("shows the save error when failing to save an appointment", async () => {
    
    axios.put.mockRejectedValueOnce();
    
    // 1- Render the Application.
    const { container, debug } = render (<Application />);

    // 2-Wait until the text "Archie Cohen" is displayed.
    await waitForElement(()=> getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, 'appointment')[0];

    //3-Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, /Add/i));    
    const input = getByPlaceholderText(appointment, /enter student name/i);

    // 4-Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(input, {target: {value: "Lydia Miller-Jones"}});

    // 5-Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, /Sylvia Palmer/i));

    // 6-Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, /save/i));

    // 7-Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, /saving/i)).toBeInTheDocument();

    // 8-Check that the element with the text "Could not save appointment" is displayed.    
    await waitForElement(() => getByText(appointment, /Could not save appointment/i));

    //await waitForElementToBeRemoved(() => queryByText(appointment, /saving/i))

    //9-Click the close icon.
    fireEvent.click(getByAltText(appointment, /close/i));

    // 10-Check that Form with the input placeholder is shown again.
    expect(getByPlaceholderText(appointment, /enter student name/i)).toBeInTheDocument();
    console.log(prettyDOM(appointment))
        
  });

    /* test number six */
  it("shows the delete error when failing to delete an appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    // 1- Render the Application.
    const { container, debug } = render (<Application />);
    
    // 2-Wait until the text "Archie Cohen" is displayed.
    await waitForElement(()=> getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, 'appointment');
  
    
    
    //3-Click the "delete" button on the appointment that contains "Archie Cohen".
    const bookedAppoint = appointments.find(item => queryByText(item, "Archie Cohen"));
      fireEvent.click(getByAltText(bookedAppoint, /delete/i));
  
    
    //  const input = getByPlaceholderText(appointment, /enter student name/i);
    
    // 4-Check that the element with the text "Delete the appointment?" is displayed.
    expect(getByText(bookedAppoint, /Delete the appointment?/i)).toBeInTheDocument();

  
    //5-Click the "confirm" button on the confirm page.
    
    fireEvent.click(getByText(bookedAppoint, /confirm/i));

  
    //6-Check that the element with the text "deleting" is displayed.
    expect(getByText(bookedAppoint, /deleting/i)).toBeInTheDocument();

    // 7-Wait until the element with the text "deleting" is removed/ or wait until an element with "Add" is in the appointment.
    //await waitForElement(() => getByAltText(bookedAppoint, /add/i));
    
    await waitForElementToBeRemoved(() => queryByText(bookedAppoint, /deleting/i));
    expect(getByText(bookedAppoint, /Could not delete appointment/i)).toBeInTheDocument();

     //9-Click the close icon.
     fireEvent.click(getByAltText(bookedAppoint, /close/i));

    // 8-Check that the bookedappointment has the "Archie Cohen" element and "Monday" still has "1 spot remaining".

    expect(getByText(bookedAppoint, /Archie Cohen/i)).toBeInTheDocument();
    console.log(prettyDOM(bookedAppoint));

    const day = getAllByTestId(container, "day");
    const selectedDay = day.find(item=> queryByText(item, "Monday"));
    expect(getByText(selectedDay, /1 spot remaining/i)).toBeInTheDocument();
    
});



 
})



