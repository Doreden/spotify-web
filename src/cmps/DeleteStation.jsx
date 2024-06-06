

export function DeleteStation(station) {


  return (
    <div className="delete-station-modal">
        <div className="title-edit-modal">
            <h1>Delete from Your Library?</h1>
        </div>
        <div className="body-delete-modal">
            <h2>This will delete {station.name} from Your Library.</h2>
        </div>
        <div className="delete-button">
            <button>Delete</button>
        </div>
        <div className="cancel-delete-button">
            <button>Cancel</button>
        </div>
    </div>
  )
}
