import React, { useRef } from 'react';
import './styles.css';

interface Props {
    todo:string;
    setTodo:React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e:React.FormEvent)=> void;
}

//const InputField = ({todo, setTodo}:Props) => {
const InputField: React.FC<Props> = ({todo, setTodo, handleAdd})=>{
    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <form className='input' 
              onSubmit={(e)=>{handleAdd(e);
                              inputRef.current?.blur()
                              }}>
                        {/*Blur quita el palito para escribir. */}
                        {/*Blur shifts (removes) the focus from this input box */}
                    {/*question mark because it's not sure if it's going to be
                    optional, or if it's going to have be having any value inside
                    of it. 4039*/}{/*Abajo se setea el todo con el nuevo valor */}
            <input
                ref={inputRef}
                type='input'
                value={todo}
                onChange={(e)=>setTodo(e.target.value)}
                placeholder='Enter a task' 
                className='input__box'>
            </input>

            <button className='input__submit' type='submit'>Go</button>
        </form>
    )
};

export default InputField;