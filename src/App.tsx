import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import {Todo} from './model';
import {DragDropContext, DropResult} from 'react-beautiful-dnd'
/*
let name:string;
let age:number|string;// union operator allows two types
let isStudent:boolean;
let hobbies:string[]; // array of strings
let role:[number,string]; // a tuple contains a fixed amount of value
let printName: (name:string) => void;
// void returns undefined, but "never" doesn't returns anything.*/
/*type Person = {
  name:string;
  age:number;
} 

// if we want to make age property as optional → age?
let person: Person = {
  name:"Piyush",
  age:22,
};

let lotsOfPeople: Person[];*/

/*interface Person {
  name:string;
  age?:number;
}

interface Guy extends Person {
  profession: string;
}

type X = {
  a:string;
  b:number;
};

type Y = X & {//concatena las propiedades a y b de x
  c:string;
  d:number;

// let y: Y={
//   c:"efdas",
//   d:42,
// }
*/

/*type X = {
  a: string;
  b:number;
};

interface Person extends X {
  name: string;
  age?: number;
}*/
// https://blog.nubecolectiva.com/diferencia-entre-interface-y-type-en-typescript/

const App:React.FC =()=>{
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const handleAdd = (e:React.FormEvent) =>{
    e.preventDefault();

    if (todo) {
      setTodos([...todos,{id:Date.now(),todo, isDone:false}]);
      setTodo("");
    }
  };
  //console.log(todo);
  const onDragEnd = (result:DropResult) => {
    const {source, destination} = result;
    //console.log(result);// to check source and destination properties when moving a task.
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
    return;

    let add, active=todos, complete=completedTodos;

    if (source.droppableId==='TodosList') {
      add=active[source.index];
      active.splice(source.index, 1);
    } else {
      add= complete[source.index];
      complete.splice(source.index,1);
    }

    if (destination.droppableId==='TodosList'){
      active.splice(destination.index,0,add);
    } else {
      complete.splice(destination.index,0,add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };
  let date:string = new Date().toLocaleDateString('en-GB');
  //console.log(todos);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
  <div className="App">
    <span className='heading'>{`Taskify ${date}`}</span>
    <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}></InputField>
    <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos}></TodoList>
  </div>
  </DragDropContext>);
};

export default App;
