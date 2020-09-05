import { renderHook, act } from "@testing-library/react-hooks";

import useVisualMode from "hooks/useVisualMode";

const FIRST = "FIRST";
const SECOND = "SECOND";
const THIRD = "THIRD";
const FOURTH = "FOURTH"


// test("useVisualMode should initialize with default value", () => {
//   const { result } = renderHook(() => useVisualMode(FIRST));
//   expect(result.current.mode).toBe(FIRST);
// });

// test("useVisualMode should transition to another mode", () => {
//   const { result } = renderHook(() => useVisualMode(FIRST));

//   act(() => result.current.transition(SECOND));
//   expect(result.current.mode).toBe(SECOND);
// });

// test("useVisualMode should return to previous mode", () => {
//   const { result } = renderHook(() => useVisualMode(FIRST));
//   //console.log('AFTER INITIAL:', result.current)


//   act(() => result.current.transition(SECOND));
//   //console.log('AFTER 1st PUSH:', result.current)
//   expect(result.current.mode).toBe(SECOND);

//   act(() => result.current.transition(THIRD));
//   //console.log('AFTER 2st PUSH:',result.current)
//   expect(result.current.mode).toBe(THIRD);

//   act(() => result.current.back());
//   //console.log('AFTER 1st POP:',result.current)
//   expect(result.current.mode).toBe(SECOND);

//   act(() => result.current.back());
//   //console.log('AFTER 2st POP:',result.current)
//   expect(result.current.mode).toBe(FIRST);


// });

// test("useVisualMode should not return to previous mode if already at initial", () => {
//   const { result } = renderHook(() => useVisualMode(FIRST));

//   act(() => result.current.back());
//   expect(result.current.mode).toBe(FIRST);
// });

test("useVisualMode should replace the current mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));
 console.log('AFTER INIT:',result.current)


  act(() => result.current.transition(SECOND));
  console.log('AFTER 1st push:',history)

  expect(result.current.mode).toBe(SECOND);

  act(() => result.current.transition(THIRD));
  console.log('AFTER 2st push:',result.current)

  expect(result.current.mode).toBe(THIRD);

  // Passing "true" to transition(THIRD, true) says "Transition to THIRD by REPLACING SECOND"
  act(() => result.current.transition(FOURTH, true));
  console.log('AFTER replace:',result.current)

  expect(result.current.mode).toBe(FOURTH);

  act(() => result.current.back());
  console.log('AFTER pop:',result.current)

  expect(result.current.mode).toBe(SECOND);
});