function isValidImageArray(arr) {    
    if (!Array.isArray(arr)) {
        return false;
    }
    
    return arr.every(item =>
        typeof item === 'object' &&
        item !== null &&
        item.hasOwnProperty('url') &&
        typeof item.url === 'string'
    );
}

module.exports = isValidImageArray