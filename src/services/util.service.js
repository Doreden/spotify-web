
export const utilService = {
    saveToStorage,
    loadFromStorage,
    generateId
}

function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}

function generateId(length){
    const keys = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('')
    let newId = ''
    for(let i = 0 ; i < length ; i++){
        newId += keys[Math.floor(Math.random()*keys.length)]
    }
    return newId
}