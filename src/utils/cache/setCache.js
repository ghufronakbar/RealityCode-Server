const cache = require('./index');

const setCache = (duration) => (req, res, next) => {
    const key = req.originalUrl;

    const cachedResponse = cache.get(key);
    if (cachedResponse) {
        console.log("⚡  Using cache: ", key);
        const jsonCache = JSON.parse(cachedResponse);
        return res.send(jsonCache);
    } else {
        console.log("👨‍🔬  Setting cache: ", key);
        res.originalSend = res.send;
        res.send = (body) => {
            if (res.statusCode >= 200 && res.statusCode < 400) {
                console.log("⚒️  Caching response for: ", key);
                cache.set(key, body, duration);
            } else {
                console.log("😵  Not caching response due to error status: ", res.statusCode);
            }
            res.originalSend(body);
        };
        next();
    }
};

module.exports = setCache;
