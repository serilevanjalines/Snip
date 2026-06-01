npm init - y
npm install express
git rm -r --cached node_modules

postgres :

sudo -u postgres psql — log into PostgreSQL as the postgres admin user
CREATE DATABASE snip; — create a new database called snip
\c snip — connect to that database (like opening a folder)


psql useful commands to write in your notes:

\l — list all databases
\dt — list all tables in current database
\c dbname — switch to a database
\q — quit psql

npm install  pg

npm create vite@latest frontend -- --template react



`FROM node:18` — start with a base image that already has Node 18 installed. like a fresh Linux machine with Node ready.

---

`WORKDIR /app` — inside the container, create a folder called `/app` and cd into it. all next commands run from here.

---

`COPY package*.json ./` — copy ONLY package.json first. the `*` means it matches both `package.json` and `package-lock.json`.

why only this first? Docker caches layers. if package.json didn't change, Docker skips `npm install` next time and uses cache. faster builds.

---

`RUN npm install` — install all dependencies inside the container. creates `node_modules` inside `/app`.

---

`COPY . .` — NOW copy everything else. your `index.js`, `.env`, all your code. we do this AFTER npm install so changing your code doesn't trigger a full reinstall every time.

---

`EXPOSE 8080` — document that this container listens on port 8080. just a label. doesn't actually open anything. docker-compose `ports` does the actual opening.

---

`CMD ["node", "index.js"]` — the command that runs when container starts. array format because Docker needs it split. `node` = the program, `index.js` = the file to run. same as typing `node index.js` in terminal.

---
