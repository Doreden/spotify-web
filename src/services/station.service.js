import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'stations'

export const stationService = {
    query,
    createStations
}

async function query() {
    let emails = await storageService.query(STORAGE_KEY)
    return emails
}





// Two regular Albums, one Single and one user generated Playlist (differs by CreatedBy)
function createStations(){
    let stations = utilService.loadFromStorage(STORAGE_KEY)
    if(!stations){
        stations = [
            {
                _id: "0BFzNaeaNv4mahOzwZFGHK",
                name: "Royal Blood",
                albumCoverUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b0/Royal_Blood_-_Royal_Blood_%28Artwork%29.jpg',
                type: 'album',
                createdBy: null,
                addedAt: 162521762362,
                Artist: 'Royal Blood',
                songs: [
                    {
                        id: "s1003",
                        title: "Out Of The Black",
                        url: "youtube/song.mp4",
                        tags: ["Rock"]
                    },
                    {
                        id: "s1004",
                        title: "Little Monster",
                        url: "youtube/song.mp4",
                        tags: ["Bass", "Rock"],
                    },
                    {
                        id: "s1005",
                        title: "Come On Over",
                        url: "youtube/song.mp4",
                        tags: ["Bass", "Rock"],
                    }
                ]   
            },
            {
                _id: "03mX4WEpvZPkHmEsd2ZoV8",
                name: "Spring Girl",
                albumCoverUrl: 'https://upload.wikimedia.org/wikipedia/en/1/17/AreyouexpUK.jpg',
                type: 'single',
                createdBy: null,
                addedAt: 162521763928,
                Artist: 'Adam Ten',
                songs: [
                    {
                        id: "s1007",
                        title: "Spring Girl",
                        url: "youtube/song.mp4",
                        tags: ["Electronic", "House"]
                    }
                ]   
            },
            {
                _id: "03mX3928vZPkHmEsd2ZoV8",
                name: "Or's Finest",
                albumCoverUrl: 'https://upload.wikimedia.org/wikipedia/en/1/17/AreyouexpUK.jpg',
                type: 'playlist',
                createdBy: {
                    _id: 'ak491k',
                    username: 'Or Doga',
                    imgUrl: 'http://some-photo/"'
                },
                addedAt: 162521763962,
                Artist: 'Adam Ten',
                songs: [
                    {
                        id: "s1007",
                        title: "Spring Girl",
                        url: "youtube/song.mp4",
                        tags: ["Electronic", "House"]
                    }
                ]   
            },
        ]
        utilService.saveToStorage(STORAGE_KEY,stations)
    }
}

