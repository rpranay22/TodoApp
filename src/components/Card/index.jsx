import { MdDelete } from "react-icons/md";
const Card = (props) => {
    const { ele, del } = props
    const { title, text, id } = ele
    const trig = () => {
        del(id);
    }
    const getVal = (e) => {
        console.log(e.target.value);
    }
    return <div className="card" style={{ width: "18rem" }}>

        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{text}</p>
            <select name="" id="" onChange={getVal}>
                <option value="pending">pending</option>
                <option value="completed">completed</option>
            </select>
        </div>
        <div><MdDelete onClick={trig} /></div>
    </div>
}
export default Card