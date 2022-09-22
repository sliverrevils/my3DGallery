import { useState } from "react";
import AddItem from "../../components/Items/Add";
import List from "../../components/Items/List";



export default function UserMainPage() {

    const [showAdd, setShowAdd] = useState(false);
    const showAddToggle = () => setShowAdd(state => !state);
    return (
        <div>
            <h1>Main Page</h1>
            {showAdd ? <AddItem {...{ showAddToggle }} /> : <button onClick={showAddToggle}>
                <span className="material-icons">control_point</span>
            </button>}
            <List />
        </div>
    )
}