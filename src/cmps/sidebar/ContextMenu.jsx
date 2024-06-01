import { ReactSVG } from "react-svg"

import Edit from "../../assets/imgs/edit.svg"
import Delete from "../../assets/imgs/delete.svg"
import AddStation from "../../assets/imgs/addStation.svg"

export function ContextMenu({ x, y, onEdit, onRemove, onAdd }) {

    const contextMenuStyle = {
        position: 'absolute',
        top: `${y}px`,
        left: `${x}px`,
        zIndex: 1000,
    }

    return (
        <div className="context-menu" style={contextMenuStyle} >
            <ul>
                <li onClick={onEdit} className="menu-item edit-item">
                    <div className="menu-svg">
                        <ReactSVG src={Edit} />
                    </div>
                    <div className="menu-item-txt">Edit details</div>
                </li>
                <li onClick={onRemove} className="menu-item delete-item">
                    <div className="menu-svg">
                        <ReactSVG src={Delete} />
                    </div>
                    <div className="menu-item-txt">Delete</div>
                </li>
                <li onClick={onAdd} className="menu-item create-item">
                    <div className="menu-svg">
                        <ReactSVG src={AddStation} />
                    </div>
                    <div className="menu-item-txt">Create playlist</div>
                </li>
            </ul>
        </div>
    )
}