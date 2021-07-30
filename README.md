<h1 align="center">
  <a href="https://github.com/csorlandi/nodejs-concepts">
    <img alt="Logo GoBarber" src="./assets/logo.svg" width="400px" />
  </a>
</h1>

<p align="center">
  <a href="#technologies">Technologies Used</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#run">How to run the API</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#contribute">How to contribute</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#license">License</a>
</p>

<p align="center">
 <img src="https://img.shields.io/static/v1?label=PRs&message=welcome&color=FF9000&labelColor=000000" alt="PRs welcome!" />

  <img alt="License" src="https://img.shields.io/badge/Made%20by-Ruth%20Maria-FF9000">

  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=FF9000&labelColor=000000">
</p>

<br>

## :books: About

It's an API that makes appointments for a barber shop.

Services:

-   Create user
-   Read user
-   Create session user
-   Create appointment
-   Read appointements
-   Read static files
-   Change avatar

<a id="technologies"></a><br>

## ⚒️ Technologies Used

-   Node.js
-   TypeScript
-   Express
-   Docker
-   Postgres
-   JWT
-   TypeORM
-   Bcryptjs
-   Multer
-   Jest

<a id="run"></a><br>

## 🚀 How to run the API

<br>

### :small_orange_diamond: Requirements

-   [NodeJS in its LTS version](https://nodejs.org/en/download/)
-   [Visual Studio Code](https://code.visualstudio.com/download)
-   [Dbeaver](https://dbeaver.io/download/)
-   [Docker](https://www.docker.com/get-started)
-   [Docker installation guide](https://www.notion.so/Instalando-Docker-6290d9994b0b4555a153576a1d97bee2)
-   [yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable)

<br>

### :small_orange_diamond: Commands

-   Clone this repository

```
git clone https://github.com/RuthMaria/GoBarber-backend.git
```

-   Install the postgres image on your docker container using port 5432 or another port

```
docker run --name gostack_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

-   Start postgres image

```
docker start gostack_postgres
```

-   Open the Dbeaver and create a new connection with Postgres. Change the port to 5432 and in the password, you type "docker", as you have defined above when create a postgres image on docker.

-   After that, create a new database in yout postgres connection inside Dbeaver. Write "gostack_gobarber" in the database name.

-   Install dependencies

```
yarn
```

-   Create the migrations

```
yarn typeorm migration:run
```

-   Run the API

```
yarn dev:server
```

-   Run the tests

```
yarn test
```

<br>

## 🎯 How to contribute

-   Fork this repository,
-   Create a branch with your feature: `git checkout -b my-feature`
-   Commit your changes: `git commit -m 'feat: My new feature'`
-   Push your branch: `git push origin my-feature`

<a id="license"></a><br>

## :memo: License

This project is under the MIT license. See the file [LICENSE](LICENSE) for more details.

---

<h4 align="center">
    Developed with ❤️ by <a href="https://www.linkedin.com/in/ruth-maria-9b256071/" target="_blank">Ruth Maria</a>
</h4>
