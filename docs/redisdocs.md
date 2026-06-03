first install Redis :

sudo dnf install redis -y
sudo systemctl start redis
sudo systemctl enable redis

check it works :

redis-cli ping


redis in npm :

npm run redis

why ioredis and not the official redis package?
ioredis is more reliable, better error handling, supports more Redis features. industry standard. that's it.

your postgres question:
no. Redis and postgres are completely separate. Redis has no tables, no rows, no columns.

Redis is just key-value pairs —
key: "x7k2"
value: "https://youtube.com"

that's it. like a dictionary. you give it a key, it gives you the value instantly.


EXPLANATION OF THE CODE:

Minute 1:
Requests 1-10 -> Allowed
Request 11 -> Blocked

Counter deleted

Minute 2:
Requests 1-10 -> Allowed again
Request 11 -> Blocked again

Counter deleted

Minute 3:
Same thing

in-memory. RAM not disk. microseconds not milliseconds.
key-value store. no tables, no rows.
redis.get(key) / redis.set(key, value, "EX", seconds)
redis.incr(key) — increment counter. creates if doesn't exist.
redis.expire(key, seconds) — auto delete after time.
caching = check Redis first, postgres second.
rate limiting = count requests per IP per minute. block at threshold.
case sensitive on Linux. rateLimiter ≠ ratelimiter. never again. 