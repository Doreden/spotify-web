

export function DeleteStation({ show, station, onClose, onDelete }) {

    function handleDelete() {
        onDelete(station._id)
        onClose()
    }

    if (!show) return null
    return (
        <div className="delete-station-modal">
            <div className="delete-station">
                <div className="title-edit-modal">
                    <h1>Delete from Your Library?</h1>
                </div>
                <div className="body-delete-modal">
                    <h5>This will delete <span>{station.name}</span> from <span>Your Library.</span></h5>
                </div>
                <div className="modal-delete-button">
                    <div className="cancel-delete-button">
                        <button onClick={onClose}>Cancel</button>
                    </div>
                    <div className="delete-button">
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
