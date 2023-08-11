import logo from './logo.svg';
import './App.css';
import {useState, React} from 'react';
import ChildProfile from './components/childProfile';

//const Person = ({ person, deleteEntry }) => <p>{person.name} {person.number} <DeleteButton deleteEntry={() => deleteEntry(person.id)}/> </p>

// const Title = ({ title }) => <h1>{title}</h1>

// const GoalsButton = ({ text }) => <button>{text}</button> // where does this go?

// const Goal = ({ goal }) => <p>{ goal }</p>
// const GoalsList = ({ goals }) => null // review displaying a list

// const GoalReminder = ({ goals }) => {
//   const title = Title( 'goals' )
//   if (!goals ) {
//     return // title
//       //set goals button 
//       { title }
//       { GoalsButton('Set Goals') }
//   } else {
//     return 
//       // title
//       // list of goals
//       // button to change goals 
//       { title }
//       { GoalsList() }
//       { GoalsButton('Change Goals') }
//   }
// }

// const FoodEntry = () => {
//   const title = Title('quick entry')
//   return 
//     // title
//     // food introduced - reception - both open forms in modals or a new page
// }

function App() {
  return (
    <div className="App">
      <ChildProfile/>
    </div>
  );
}

export default App;
