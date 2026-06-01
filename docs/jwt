Json Web Token

what a JWT looks like:

```
eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.abc123
```

three parts separated by dots —

* header — algorithm used
* payload — the data. like `{ userId: 1 }`
* signature — proof it wasn't tampered with
server signs it with a secret key. if anyone changes the payload, signature breaks. that's the security.
what we're adding to Snip:

* `POST /auth/register` — create account
* `POST /auth/login` — get token back
* `POST /urls` — only works if you send a valid token
* URLs belong to the user who created them


npm install jsonwebtoken bcrypt

jsonwebtoken — creates and verifies JWT tokens
* bcrypt — hashes passwords. never store plain text passwords.

