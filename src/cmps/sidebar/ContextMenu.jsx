import { ReactSVG } from "react-svg";

import Edit from "../../assets/imgs/edit.svg";
import Delete from "../../assets/imgs/delete.svg";
import AddStation from "../../assets/imgs/addStation.svg";

export function ContextMenu({ x, y, onEdit, onRemove, onAdd }) {
    
    const contextMenuStyle = {
        position: 'absolute',
        top: `${y}px`,
        left: `${x}px`,
        zIndex: 1000,
      }

      return (
        <div style={contextMenuStyle} className="context-menu">
            <ul>
                <div className="edit-item">
                    <ReactSVG src={Edit} />
                    <li onClick={onEdit}>Edit details</li>
                </div>
                <div className="delete-item">
                    <ReactSVG src={Delete} />
                    <li onClick={onRemove}>Delete</li>
                </div>
                <div className="create-item">
                    <ReactSVG src={AddStation} />
                    <li onClick={onAdd}>Create playlist</li>
                </div>
            </ul>
        </div>
      );
}