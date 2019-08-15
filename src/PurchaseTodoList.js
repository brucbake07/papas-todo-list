import React from 'react'; //import react library
import {toDoList} from './ListData'; //import todo list data
import {SingleItem} from './TaskListWrap'; //import taskListWrap

//creating an purchase todolist class
export class PurchaseTodoList extends React.Component {

  render(){

    const ListItem = toDoList.map((item) =>{ //loop through todo list, purchase items
      
      if(item.group === 'Purchases'){ //if group is purchases

        //return single item component
        return (
          <SingleItem key={item.id} id={item.id} group={item.group} task={item.task} dependencyIds={item.dependencyIds} completedAt={item.completedAt}/>         
        );
      } else {
        return true;
      }

    });
    
    return ListItem;

  }
}