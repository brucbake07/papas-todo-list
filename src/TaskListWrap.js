import React from 'react'; //import react library
import {toDoList} from './ListData'; //import todo list data
import {PurchaseTodoList} from './PurchaseTodoList'; //import purchaseTodolist
import {AirplaneTodoList} from './AirplaneTodoList'; //import airplaneTodoList

var completedPurchasesCounter = 0; //declare counter to keep count of number of completed purchase items
var completedAirplaneCounter = 0; //declare counter to keep count of number of completed airplane items

//creating an wrap class for todolist
export class TaskListWrap extends React.Component {

  //on click of purchase wrap, show list
  constructor(props) {

    super(props);
    this.state = {
      hidePurchaseList: true,
      hideAirplaneList: true,
      hidePurchaseDetails: false,
      hideAirplaneDetails: false,
      hideGroupsButton: true,
      purchaseListCompletedCount: 0,
      airplaneListCompletedCount: 0,
      headingText: 'Things To Do'
    } 

    this.showPurchaseList = this.showPurchaseList.bind(this); //bind showPurchaseList function
    this.showAirplaneList = this.showAirplaneList.bind(this); //bind showAirplaneList function
    this.showFullList = this.showFullList.bind(this); //bind showFullList function

  }

  //function to show the Purchases list
  showPurchaseList(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState(prevState => ({
      hidePurchaseList: !prevState,
      hidePurchaseDetails: prevState,
      hideAirplaneDetails: prevState,
      hideGroupsButton: !prevState
    }));

    this.updateHeading('purchase'); //set heading
  }

  //function to show the Build Airplane list
  showAirplaneList(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState(prevState => ({
      hideAirplaneList: !prevState,
      hidePurchaseDetails: prevState,
      hideAirplaneDetails: prevState,
      hideGroupsButton: !prevState
    }));

    this.updateHeading('airplane'); //set heading
  }

  //function to update the heading text based on the view
  updateHeading(heading){
    var headingText = '';

    if(heading === 'purchase'){
      headingText = 'Purchases'; //set heading text
      
    } else if(heading === 'airplane'){
      headingText = 'Build Airplane'; //set heading text
      
    } else {

    }

    this.setState(prevState => ({
      headingText: headingText
    }));
  }

  //function to show main view, with both list details
  showFullList(e) {
    e.preventDefault();
    e.stopPropagation();

    //setting the state
    this.setState(prevState => ({
      hidePurchaseList: true,
      hideAirplaneList: true,
      hidePurchaseDetails: false,
      hideAirplaneDetails: false,
      hideGroupsButton: true,
      purchaseListCompletedCount: completedPurchasesCounter,
      airplaneListCompletedCount: completedAirplaneCounter,
      headingText: 'Things To Do'
    }));

  }

  render() {
    var totalPurchaseCounter = 0; //initializing the total purchase counter
    var totalAirplaneCounter = 0; //initializing the total airplane counter
    
    toDoList.map((item) =>{

      if(item.group === 'Purchases'){
        totalPurchaseCounter++; //increment purchase counter
        
      } else {
        totalAirplaneCounter++; //increment airplane counter
      }
      return true;
    });

    //return html markup for the main list view
    return (
      <div className="col-md-7 listwrap">
        <div className="container listHeadingWrap">
          <h4 className="listHeader">{this.state.headingText}</h4>
          <p onClick={this.showFullList} className="allGroupsBtn" hidden={this.state.hideGroupsButton}>All Groups</p>
        </div>
        <div>
          <div className="purchaseListWrap ">   
            <div className="container segment" onClick={this.showPurchaseList} hidden={this.state.hidePurchaseDetails}>
              <span className="fa fa-caret-right"></span>     
              <label className="segmentLabelItem">Purchases</label>
              <p className="segmentLabelItem segmentPitem">&nbsp;&nbsp;&nbsp;{this.state.purchaseListCompletedCount} of {totalPurchaseCounter} tasks complete</p>
            </div>
            <div className="purchaseList" hidden= {this.state.hidePurchaseList}>
              <PurchaseTodoList completedCount={this.state.completedPurchasesCounter} />
            </div>
          </div>

          <div className="airplaneListWrap ">
            <div className="container segment airplaneSegment" onClick={this.showAirplaneList} hidden={this.state.hideAirplaneDetails}> 
              <span className="fa fa-caret-right"></span>   
              <label className="segmentLabelItem">Build Airplane</label>
              <p className="segmentLabelItem segmentPitem ">&nbsp;&nbsp;&nbsp;{this.state.airplaneListCompletedCount} of {totalAirplaneCounter} tasks complete</p>
              
            </div>
            
            <div className="airplaneList" hidden= {this.state.hideAirplaneList}>
              <AirplaneTodoList completedCount={this.state.purchaseListCompletedCount} />
            </div>
          </div>
        </div>
      </div>      
    );
  }
}

//creating a single todo item class
export class SingleItem extends React.Component {

  constructor(props) {
    super(props);

    //set initial state for todo items
    this.state = {
      'disabled': false,
      'completedAt' : '',
      'completed' : false,
      'itemId': this.props.id
    }

    //set initial state for todo items with no dependency ids
    if(this.props.id !== 1 && this.props.id !== 8){
      this.state = {
        'disabled': true ,
        'completedAt' : '',
        'completed' : false,
        'itemId': this.props.id

      }
    }

    this.toggleComplete = this.toggleComplete.bind(this); //binding toggleComplete function
    this.removeDisable = this.removeDisable.bind(this); //binding removeDisable function
  }


  //function to toggle the state of complete/checked for the list items
  toggleComplete(e){
    //e.preventDefault();
    //e.stopPropagation();

    //on checkbox isChecked(change), update completedAt with timestamp, else, remove timesamp(set to null)
    if(this.props.group === 'Purchases') {

      if (this.state.completed === false){ //if the item is not complete

        completedPurchasesCounter++; //increment purchase counter
        
        //set the state
        this.setState({
          completedAt: new Date(),
          completed: true,
          completedPurchases: completedPurchasesCounter
        });

      } else { // if the item is complete

        if(completedPurchasesCounter !== 0){ //if the counter is not 0(preventing negatives)
          completedPurchasesCounter--; //decrement purchase counter 
        }

        //set the state
        this.setState(prevState => ({
          completedAt: '',
          completed: false,
          completedPurchases: completedPurchasesCounter
        }));

      }

    } else {
      if (this.state.completedAt === ''){ //if the item is not complete

        completedAirplaneCounter++; //increment airplane counter

        //set standard state
        this.setState({
          completedAt: new Date(),
          completed: true
        });

        //set state based on previous states
        this.setState(prevState => ({
          completedAt: prevState,
          completed: prevState,
          completedPurchases: completedAirplaneCounter
        }));

      } else { //if the item is complete

        if(completedAirplaneCounter !== 0){ //if the counter is not 0(preventing negatives)
          completedAirplaneCounter--; //decrement airplane counter
        }

        //set state based on previous states
        this.setState(prevState => ({
          completedAt: '',
          completed: false,
          completedPurchases: completedAirplaneCounter
        }));

      }

    }

    this.removeDisable(); //remove disable attribute from items

  }

  removeDisable(e){

    //looping through all todo list items
    toDoList.map((todoItem) =>{

      var ids = todoItem.dependencyIds; //declaring dependency ID list
      var id = todoItem.id; //declaring item ID

      //looping through item's dependency id list
      ids.map((item) => {
        let currentItemString = "itemID" + id;
        var currentItem = document.getElementById(currentItemString); //declaring the current item being changed

        let idString = "itemID" + item;
        var depenencyItem = document.getElementById(idString); //declaring the dependency items based on the item being changed

        if(depenencyItem !== null){ //if there is a dependency item
          if(!depenencyItem.checked === true){ //if dependency item is not checked

            let spanIdString = "spanID" + id;
            var lockSpan = document.getElementById(spanIdString); //getting the element's span with lock
            lockSpan.classList.add('disabledLock');
            lockSpan.classList.add('fa');
            lockSpan.classList.add('fa-lock');

            let labelIdString = "labelID" + id;
            var labelSpan = document.getElementById(labelIdString); //getting the element's label 
            labelSpan.classList.add('disabledLock');
            labelSpan.classList.remove('doneTextStyle');
            
            currentItem.checked = false; //setting the current item to Not checked

            if((this.props.id !== 1) && (this.props.id !== 8)){

              currentItem.setAttribute('disabled', true); //set item to disabled

              if(this.state.completed === true){ //if the item is completed
                if(this.props.group === 'Purchases'){
                  //to prevent negative numbers
                  if(completedPurchasesCounter !== 0){
                    completedPurchasesCounter = completedPurchasesCounter--; //decrement counter
                  }

                  //set state
                  this.setState(prevState => ({
                    disabled: true,
                    completed: true,
                    
                  }));
                } else {
                  //to prevent negative numbers
                  if(completedAirplaneCounter !== 0){
                    completedAirplaneCounter = completedAirplaneCounter--; //decrement counter
                  }

                  //set state
                  this.setState(prevState => ({
                    disabled: true,
                    completed: false,
                    
                  }));

                }
              }

            } else if(this.state.itemId === 1 || this.state.itemId === 8){
              this.setState(prevState => ({
                disabled: false,
                completed: prevState.completed,
              }));

            }

          } else {
            currentItem.removeAttribute('disabled'); //remove disabled attribute

            let spanIdString = "spanID" + id;
            let lockSpan = document.getElementById(spanIdString); //getting the element's span with lock
            lockSpan.classList.remove('disabledLock');
            lockSpan.classList.remove('fa-lock');

            let labelIdString = "labelID" + id;
            let labelSpan = document.getElementById(labelIdString); //getting the element's label
            labelSpan.classList.remove('disabledLock');

            //set state
            this.setState(prevState => ({
              disabled: false,
            }));

          }
        } else {
          console.log('no dependency item');
        }
        return true;
      
      });
      return true;
    });

    //if the item with this dependency id# is NOT disabled (state is NOT disabled)
    //then this item is not disabled (state is not disabled)

  }

  render() {

    if(this.state.completedAt){ //if item has completedAt state
      if(this.state.completedAt !== ''){
        //let checkComplete = true; //add checkmark
        var completedTaskClass = 'doneTextStyle'; //add class for done text
        var disabledLock = ''; //add class for lock
        
      } else {
        //var checkComplete = false; //add checkmark
        completedTaskClass = ''; //add class for done text
        disabledLock = 'fa fa-lock'; //add class for lock
      }
    } else {
      //var checkComplete = false; //add checkmark
      completedTaskClass = ''; //add class for done text
      
      if(this.state.completed === false && this.state.disabled === false){
        disabledLock = ''; //add class for lock
      } else {
        disabledLock = 'fa fa-lock'; //add class for lock
      }
    }

    if(this.state.itemId === 1){
      disabledLock = ''; //add class for lock
    }

    if(this.state.itemId === 8){
      disabledLock = ''; //add class for lock
    }

    //return html markup for list item
    return (
      <div key={this.props.id} className={"segment " + (this.props.group)}>
        <label className={"labelContainer disabledItem " + completedTaskClass } id={"labelID" + this.props.id}>{this.props.task}
          <input type="checkbox" checked={this.state.checkComplete} keyprop={this.props.id} id={"itemID" + this.props.id} value={this.props.id} onChange={this.toggleComplete} disabled={this.state.disabled}/>
          
          <span id={"spanID" + this.props.id} className={"checkmark checkmark-outline disabledCheckbox disabledLock " + disabledLock} aria-hidden="true"/>
        </label>
      </div>
    );
  }
}