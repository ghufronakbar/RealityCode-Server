const isValidIds = (data) => {
    if (!Array.isArray(data)) {
        return false;
    }

    for (let item of data) {
        if (typeof item !== 'object' || item === null) {
            return false;
        }

        const keys = Object.keys(item);

        if (keys.length !== 1 || keys[0] !== 'id') {
            return false;
        }

        if (typeof item.id !== 'number') {
            return false;
        }
    }

    return true;
}

module.exports = isValidIds;
