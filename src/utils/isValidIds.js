const isValidIds = (data) => {
    if (!Array.isArray(data)) {
        return false;
    }
    for (let item of data) {
        if (typeof item !== 'object' || !item.hasOwnProperty('id') || typeof item.id !== 'number') {
            return false;
        }
    }
    return true;
}

module.exports = isValidIds;
