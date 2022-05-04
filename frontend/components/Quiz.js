import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchQuiz, postAnswer, selectAnswer } from "../state/action-creators";

export function Quiz(props) {

  const { quiz, selected_answer } = props

  useEffect(() => {
    if (!props.quiz) {
      props.fetchQuiz();
    }
  }, []);

  const isDisabled = !selected_answer

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz ? (
          <>
            <h2>{quiz.question}</h2>
            
            <div id="quizAnswers">
              {quiz.answers.map(answer => {
                const isSelected = selected_answer === answer.answer_id
                return  <div key={answer.answer_id} className={isSelected ? 'answer selected' : 'answer'}>
                {answer.text}
                <button onClick={() => props.selectAnswer(answer.answer_id)}>{isSelected ? 'SELECTED' : 'Select'}</button>
              </div>
              })}
             

              {/* <div className="answer">
                An elephant
                <button>Select</button>
              </div> */}
            </div>

            <button id="submitAnswerBtn" disabled={isDisabled} onClick={() => props.postAnswer()}>Submit answer</button>
          </>
        ) : (
          "Loading next quiz..."
        )
      }
    </div>
  );
}

const mapStateToProps = (s) => {
  return {
    quiz: s.quiz,
    selected_answer: s.selectedAnswer
  };
};

export default connect(mapStateToProps, { fetchQuiz, postAnswer, selectAnswer })(Quiz);
