import React from 'react'; //import react library
import './App.css'; //import app css styles
import {TaskListWrap} from './TaskListWrap'; //import taskListWrap

//Standard App class
class App extends React.Component {

  render() {
    //return totaltasklistwrap markup
    return (

      <div className="App">
            
        <TaskListWrap />

      </div>
    );
  }
}

export default App;