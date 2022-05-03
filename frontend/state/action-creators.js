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

export function setQuiz(quiz) { 
  return {
    type: types.SET_QUIZ_INTO_STATE,
    payload: quiz
  }
}

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
    dispatch(setQuiz(null))
    axios.get('http://localhost:9000/api/quiz/next')
      .then(res => {
        dispatch(setQuiz(res.data))
      })
      .catch(err => console.log(err))
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
        dispatch(resetForm())
        dispatch(setMessage(`Congrats: "${question_text}" is a great question!`))
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
