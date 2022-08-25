import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import {Todo} from '../model'
import SingleTodo from './SingleTodo';
import "./styles.css";

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}
const TodoList:React.FC<Props> = ({todos, setTodos, completedTodos, setCompletedTodos}) => {
    return (
        <div className='container'>
            <Droppable droppableId='TodosList'>
                {(provided,snapshot)=>(
                    <div className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
                         ref={provided.innerRef}
                         {...provided.droppableProps}
                    >
                        <span className='todos__heading'>Active Tasks</span>
            {/*Mapeo el array de todos. */}
                        {todos.map((todo,index)=>(
                            <SingleTodo 
                                index={index}
                                todo={todo}
                                key={todo.id}
                                todos={todos}
                                setTodos={setTodos}></SingleTodo>
                            ))}
                        {provided.placeholder}
                        {/* sirve para que la caja celeste no se achique al mover una nota*/}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId='TodosRemove'>
                {(provided,snapshot)=>(
                    <div className={`todos remove ${snapshot.isDraggingOver? "dragcomplete":""}`}
                         ref={provided.innerRef}
                         {...provided.droppableProps}>
                        <span className='todos__heading'>Completed Tasks</span>
                        {completedTodos.map((todo,index)=>(
                            <SingleTodo 
                                index={index}
                                todo={todo}
                                key={todo.id}
                                todos={completedTodos}
                                setTodos={setCompletedTodos}></SingleTodo>
            ))}
            {provided.placeholder}
            </div>

                    )
                }
            
            </Droppable>
            
        </div>
    )
}

export default TodoList;