import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

//Otsikkoteksti
const HeaderText = () => <h1>Day of Anecdotes!</h1>;
//Näppäinkomponentti
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
//Random anekdootti
const Anecdote = ({ anecdote }) => <p>{anecdote}</p>;

//eniten ääniä saanut anekdootti, key arvolla i koska ei muuta saatavilla
const MostVoted = ({ winners, votes}) => {
  if (winners){
    return (
      <div>
        {winners.map((winner, i) => { 
          return <p key= {i}>{winner} <em style={{color: "green", fontWeight: "bold"}}>Has {votes} votes</em></p>
        })}
      </div>
    );
  }
  return <p>No votes yet... start voting!</p>
};

const App = props => {
  const randomizeNumber = () => Math.floor(Math.random() * props.anecdotes.length);

  const [selected, setSelected] = useState(randomizeNumber());
  const [points, setPoints] = useState([]);

  //arvotaan random ja asetetaan state
  const randomizeAnecdote = () => {
    setSelected(randomizeNumber());
  };

  //äänestyspainikkeen toiminnallisuus
  const voteAnecdote = () => {
    const newPoints = [...points];
    //korotetaan taulun indexin "seleted" arvoa yhdellä tai jos ei ole ennestään alustetaan 1:ksi
    if (newPoints[selected] !== undefined) {
      newPoints[selected]++;
    } else {
      newPoints[selected] = 1;
    }
    setPoints(newPoints);
  };

  //koska taulussa löytyy myös muita kuin numeroarvoja (taulua ei ole alustettu sisätlämään nollia), Math.max() ei toimi iman tarkempaa tutkimista
  const mostVotes = votes => {
    return votes.reduce((acc, cur) => {
      const max = Math.max(acc, cur);
      return isNaN(max) ? acc : max;
    }, null);
  };

  //toiminnallisuus voittajan selvittämiseen
  const findWinner = () => {
    const maxVote = mostVotes(points);
    //voittajia voi olla useampi kuin yksi ns. tasapeli
    const winners = [];
    //jos annettu ääniä
    if (maxVote) {
      for (let i = 0; i < props.anecdotes.length; i++) {
        const anecdote = points[i];
        if (anecdote === maxVote) {
          winners.push(i);
        }
      }
    }
    //jos tasapeli
    if (winners.length > 1) {
      const stealmate = [];
      for (let i = 0; i < winners.length; i++) {
        const winner = winners[i];
        stealmate.push(props.anecdotes[winner]);
      }
      return stealmate;
    }
    //jos ei tasapeli
    return [props.anecdotes[winners[0]]];
  };

  //etsitään voittaja ja määrä, jolla voitettiin
  const winningAnecdotes = !!points.length ? findWinner() : null;
  const winningVotes = !!points.length ? mostVotes(points) : null;

  return (
    <div>
      <HeaderText />
      <Anecdote anecdote={props.anecdotes[selected]} />
      <Button onClick={voteAnecdote} text="Vote this!" />
      <Button onClick={randomizeAnecdote} text="Random anecdote" />
      <h1>Most voted anecdote(s):</h1>
      <MostVoted winners={winningAnecdotes} votes = {winningVotes} />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
