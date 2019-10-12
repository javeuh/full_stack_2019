import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Statistic = ({ text, data }) => <tr><td>{text}</td><td>{data}</td></tr>

const Statistics = ({ calculations, good, bad, neutral }) => {
  if (calculations.total > 0) {
    return (
      <table>
        <tbody>
          <Statistic text="good" data={good} />
          <Statistic text="neutral" data={neutral} />
          <Statistic text="bad" data={bad} />
          <Statistic text="all" data={calculations.total} />
          <Statistic text="average" data={calculations.average} />
          <Statistic
            text="positive"
            data={calculations.positivePercentage + " %"}
          />
        </tbody>
      </table>
    )
  }
  return <p>No feedback yet!</p>;
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Heading = () => <h1>Give some Feedback!</h1>
const SummaryText = () => <h1>Feedback summary:</h1>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleButtonClick = val => () => {
    switch (val) {
      case 1:
        setGood(good + 1)
        break;
      case 0:
        setNeutral(neutral + 1)
        break;
      default:
        setBad(bad + 1)
        break;
    }
  }

  const countAllFeedback = () => {
    const total = good + neutral + bad
    const average = ((good * 1 + bad * -1) / total).toFixed(2)
    const positivePercentage = ((good / total) * 100).toFixed(2)
    return {
      total: total,
      average: average,
      positivePercentage: positivePercentage
    }
  }

  const calculations = countAllFeedback()

  return (
    <div>
      <Heading />
      <Button onClick={handleButtonClick(1)} text="good" />
      <Button onClick={handleButtonClick(0)} text="neutral" />
      <Button onClick={handleButtonClick(-1)} text="bad" />
      <SummaryText />
      <Statistics calculations={calculations} good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
