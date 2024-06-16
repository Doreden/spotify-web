import { useEffect, useState } from "react"
import { utilService } from "../../../services/util.service"
import { extractColors } from 'extract-colors'

export function StationDetailsHeader({ station, bgColor, setBgColor, darkerColor, setDarkerColor, setMainSectionColor, is }) {

    useEffect(() => {
        getColorFromImg()
    }, [station])

    async function getColorFromImg() {
        const options = {
            crossOrigin: 'Anonymous'
        }
        const colors = await extractColors(station.imgUrl, options)

        if (!colors) return
        const convertToRGBA = `rgba(${colors[0].red},${colors[0].blue},${colors[0].green},`
        console.log(convertToRGBA)
        setDarkerColor((prevState) => darkenColor(colors[0], 20))
        setMainSectionColor((prevState) => darkenColor(colors[0], 50))
        setBgColor(() => convertToRGBA)
    }

    function darkenColor(color, amout) {
        return `rgba(${colorReducer(color.red, amout)},${colorReducer(color.blue, amout)},${colorReducer(color.green, amout)},`
    }

    function colorReducer(RGB, amount) {
        if ((RGB - amount) < 0) {
            return 0
        } else {
            return RGB - amount
        }
    }

    // 
    return (
        <div className="station-details-header" style={{ background: `linear-gradient(${bgColor}1) 40%, ${darkerColor}1) 100%)` }}>
            <div className="content">
                <div className="img-box details-img-box">
                    {is === 'liked-songs' ?
                        <img src={'imgs/likedsongs.png'}></img>
                        :
                        <img src={station.imgUrl}></img>
                    }
                </div>
                <div className="station-info">
                    <h1 className="station-name">{station.name}</h1>
                    <div className="additional-info-line">
                        <span className="created-by">{station.createdBy.username}</span>
                        <span className="devider">•</span>
                        {is !== 'liked-songs' &&
                            <span className="number-of-likes">{station.likedByUsers.length} Likes</span>
                        }
                        <span className="devider">•</span>
                        <span className="number-of-songs">{station.songs.length} Song{station.songs.length !== 1 ? 's' : ''}</span>
                        <span className="devider">•</span>
                        <span className="station-length">{utilService.formatStationLength(station.songs)}</span>
                    </div>
                </div>
            </div>
        </div>

    )
}

