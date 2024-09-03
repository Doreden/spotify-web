
export const utilService = {
    formatDate,
    saveToStorage,
    loadFromStorage,
    generateId,
    formatSongLength,
    formatStationLength,
    formatVideoTitle,
    convertYoutubeDurationToSeconds,
    getRandomInt
}

function formatDate(timestamp) {
    const date = new Date(timestamp)

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    return `${months[month]} ${day}, ${year}`
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }


function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value)
}

function loadFromStorage(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue
    return JSON.parse(value)
}

function generateId(length){
    const keys = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('')
    let newId = ''
    for(let i = 0 ; i < length ; i++){
        newId += keys[Math.floor(Math.random()*keys.length)]
    }
    return newId
}

function convertYoutubeDurationToSeconds(durationString){
    const pattern = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/
    const match = durationString.match(pattern);

    if (match) {
        const hours = match[1] ? parseInt(match[1], 10) : 0
        const minutes = match[2] ? parseInt(match[2], 10) : 0
        const seconds = match[3] ? parseInt(match[3], 10) : 0
        const totalSeconds = hours * 3600 + minutes * 60 + seconds
        return totalSeconds
    } else {
        return 0
    }
}

function formatStationLength(songs){
    let totalLength = 0;
    for(let i = 0 ; i < songs.length ; i++){
        totalLength += songs[i].lengthInSeconds
    }
    if(totalLength > 3599){
        return (
            `${Math.floor(totalLength/3600)} hr ${Math.floor(totalLength%3600/60)} min`
        )
    }else{
        return(
            `${Math.floor(totalLength/60)} min ${Math.floor(totalLength%60)} sec`
        )
    }
}

function formatSongLength(songLengthInSeconds) {
    const hours = Math.floor(songLengthInSeconds / 3600);
    const minutes = Math.floor((songLengthInSeconds % 3600) / 60);
    const seconds = songLengthInSeconds % 60;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

function formatVideoTitle(title){
    const regex = /^(.*?)\s*-\s*(.*?)(?:\s*\((.*?)\))?$/; 
    title = title.replace(/\(([^)]+)\)/g, '');
    title = title.replace(/\[([^\]]+)\]/g, '');
    title = title.replace('&#39;', '\'');
    title = title.replace('&amp;', '&');
    const matches = title.match(regex)
      
    if (!matches){
        return {title}
    }else{
        return( {
            artist: matches[1].trim(),
            title: matches[2].trim()
        })
    }
}

function generateRandomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let newId = ''
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        newId += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return newId
}

