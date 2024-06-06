import { ReactSVG } from "react-svg"
import { uploadService } from "../services/upload.service"
import { useState, useRef } from "react"
import Close from '../assets/imgs/close.svg'

export function EditStation({ show, onClose, station, onSave, onUploaded = null }) {

    const [title, setTitle] = useState(station.name)
    const [imgUrl, setImgUrl] = useState(station.imgUrl)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const fileInputRef = useRef(null)

    async function handleImageUpload(event) {
        const files = event.target.files
        if (files && files.length > 0) {
            const file = files[0]
            setIsLoading(true)
            setError(null)
            try {
                const uploadResponse = await uploadService.uploadImg(file)
                setImgUrl(uploadResponse.secure_url)
                // if (onUploaded) {
                //     onUploaded(uploadResponse.secure_url)
                // }
            } catch (error) {
                console.error('Error uploading image:', error)
                setError('Error uploading image')
            } finally {
                setIsLoading(false)
            }
        } else {
            console.error('No file selected')
            setError('No file selected')
        }
    }

    const handleSave = () => {
        const updatedStation = {
            ...station,
            name: title,
            imgUrl: imgUrl
        }
        onSave(updatedStation)
        onClose()
    }
    if (!show) return null
    return (
        <section className="station-edit-modal">
            <div className="station-edit">
                <div className="title-edit-modal">
                    <h1>Edit details</h1>
                    <button className="close-button" onClick={onClose}> <ReactSVG src={Close} /> </button>
                </div>
                <div className="body-edit-modal">
                    <div className="image-station">
                        <button className="image-container" onClick={() => fileInputRef.current.click()}>
                            {imgUrl ? <img src={imgUrl} alt="Station" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : null}
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleImageUpload}
                                accept="image/*"
                                disabled={isLoading}
                            />
                        </button>
                        {/* {isLoading && <p>Loading...</p>} */}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </div>
                    <div className="title-station">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Name"
                            required
                        />
                    </div>
                    <div className="description-area">
                        <textarea placeholder="Add an optional description"></textarea>
                    </div>
                    <div className="save-button">
                        <button onClick={handleSave}>Save</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
