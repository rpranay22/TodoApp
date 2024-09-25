import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Card from "../Card";
import "./index.css";
const TodoList = () => {
    const addTodo = (e) => {
        e.preventDefault();
        let obj = {
            title, text, id: uuidv4(), stat: "pending"
        }
        setTodo(ps => [...ps, obj])
        setText('')
        setTitle('');
    }
    const del = (id) => {
        setTodo(ps => ps.filter(ele => ele.id !== id))
    }

    const changeStatus = (id, val) => {
        let mod = []
        todos.forEach(ele => {
            if (ele.id === id) {
                mod.push({ ...ele, stat: val })
            }
            else {
                mod.push(ele)
            }
        })
        setTodo(mod);
    }

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [state, setState] = useState('');
    const [todos, setTodo] = useState([]);
    return <div>

        <div> <h1>Your Todos</h1>
            <form onSubmit={addTodo} id="sub">
                <div className="ipz">
                    <label htmlFor="title">USERNAME</label>
                    <input
                        id="title"
                        type="text"
                        required
                        className="ent"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="ipz">
                    <label htmlFor="content">USERNAME</label>
                    <textarea cols="10" rows="10" onChange={(e) => setText(e.target.value)}
                        id="content"
                        type="text"
                        value={text}
                        required
                        className="ent"
                        placeholder="Enter Activity"></textarea>
                </div>
                <button className="primary" type="submit">Add</button>
            </form>
        </div>
        <div className="items">
            {
                todos.map(ele =>
                    <Card key={ele.id} ele={ele} del={del} changeStatus={changeStatus} />
                )
            }
        </div>
    </div>

}
export default TodoList