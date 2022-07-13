import QuestionView from "./question";

const questionMock = 'Very nice question yes so much good question'

const answersMock = [
        {
            answerText: "Answer A",
            isCorrectAnswer: false
        },
        {
            answerText: "Answer B",
            isCorrectAnswer: false
        },
        {
            answerText: "Answer C",
            isCorrectAnswer: true
        },
        {
            answerText: "Answer D",
            isCorrectAnswer: false
        }
    ]

export default function Index() {
  return (
    <div>
      <QuestionView question={questionMock} answers={answersMock}/>
    </div>
  );
}
