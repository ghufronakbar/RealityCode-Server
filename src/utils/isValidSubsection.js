const isValidSubsection = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
        return false;
    }
    return data.every(item => {
        return typeof item.title === 'string' && typeof item.description === 'string';
    });
};

module.exports = isValidSubsection