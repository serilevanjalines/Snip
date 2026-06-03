why many awaits?
every line that talks to something outside your code needs await —

*pool.query(...) — talking to postgres. takes time. await.
*bcrypt.compare(...) — hashing is slow on purpose (security). takes time. await.
*jwt.sign(...) — this one is actually synchronous. no await needed here. but it doesn't break anything if you add it.
*
(auth.js)

curl flags explained:

-X POST — specify the HTTP method. default is GET.
-L — follow redirects. without it, curl just shows the 302 response. with it, it follows to the final destination.
-H — add a header. like Content-Type or Authorization.
-d — send data in the body.