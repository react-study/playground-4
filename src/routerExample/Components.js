import React from 'react';

export const Home = () => <h2>HOME</h2>;

export const About = () => <h2>About</h2>;


export const Name = () => <h3>리액트 스터디</h3>;

const portfolios =[
  { id: 0, text: 'portfolio #0'},
  { id: 1, text: 'portfolio #1'},
  { id: 2, text: 'portfolio #2'}
];

export const Portfolio = ({ match }) => {
  const filteredList = (match.params && match.params.id !== undefined)
      ? portfolios.filter(v => v.id == match.params.id)
      : portfolios;
      console.log(match.params.id)
    return(
      <div>
        <h2>PORTFOLIOS</h2>
        <ul>{filteredList.map(v => <li key={v.id}>{v.text}</li>)}</ul>
      </div>
    );
};
