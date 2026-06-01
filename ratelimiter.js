const redis = require("./redis");

async function rateLimiter(req, res, next) {
    const ip = req.ip;
    const key = `rate:${ip}`;
    const requests = await redis.incr(key);
    
    if (requests === 1) {
        await redis.expire(key, 60);
    }
    
    if (requests > 10) {
        return res.status(429).json({ 
            error: "Too many requests. Try again in a minute." 
        });
    }
    
    next();
}

module.exports = rateLimiter;