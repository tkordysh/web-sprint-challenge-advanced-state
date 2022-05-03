import * as types from './action-types'
import axios from 'axios'


// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return {
    type: types.MOVE_CLOCKWISE
  }
 }

export function moveCounterClockwise() { 
  return {
    type: types.MOVE_COUNTERCLOCKWISE
  }
}

export function selectAnswer() { }

export function setMessage(value) {
  return {
    type: types.SET_INFO_MESSAGE,
    payload: value
  }
 }

export function setQuiz() { }

export function inputChange({ id, value }) {
    return {
      type: types.INPUT_CHANGE,
      payload: { id, value }
    }
 }

export function resetForm() {
    return {
      type: types.RESET_FORM
    }
 }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz(question_text, true_answer_text, false_answer_text) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new', { "question_text": `${question_text}`, "true_answer_text": `${true_answer_text}`, "false_answer_text": `${false_answer_text}` })
      .then(res => {
        console.log("res data aka newly created q", res.data)
        //setting the success message would be something like 'congrats, res.data.question is a great q'
        const newlyCreatedQuestion = res.data
        dispatch({ type: types.SET_QUIZ_INTO_STATE, payload: newlyCreatedQuestion })
      })
      .catch(err => {
        debugger
      })
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
