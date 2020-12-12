# Cargo Service
Group project for iTechArt's internship.
The application simplifies the processes associated with the transportation of freight and cargo. 
The system’s core features are creating invoices, waybills, acts, reports and charts about profits and losses. Using the app, users can access a wide range of interactive services, including trucks management, routes tracking, cargo management, documents flow management, users management, email service, notifications, complex reports.<br/>
Start date: 17 August 2020<br/>
Date of defence: 16 October 2020<br/>

**Contributors:** [Vladislav M.](https://github.com/Revollutiion), [Marianna P.](https://github.com/Rigvende), [Eugene B.](https://github.com/BeG-by)

## Getting Started
#### Backend
1) Install development platform [IntelliJ IDEA](https://www.jetbrains.com/idea/download/#section=windows)
2) Install database [PostgreSQL](https://www.postgresql.org/download/)
3) Download search engine [Elasticsearch](https://www.elastic.co/downloads/elasticsearch)
4) Clone the repository and open it in IntelliJ IDEA.
5) Create databases `cargo_db` and `cargo_db_test` in PostgreSQL
6) Run Elasticsearch (`/elasticsearch/bin/elasticsearch.bat`)
7) _(optional)_ Set `aws.access_key_id` and `aws.secret_access_key` in `application.properties` to be able to save avatars. You can also set other settings in the file `application.properties`.
8) Run the application.

#### Frontend
1) Install runtime environment [Node.js](https://nodejs.org/en/download/)
2) _(optional)_ Set GOOGLE_MAP_API_KEY in the file `src/keys.json` to be able to use google map
3) Run the following commands:
    ```
    cd frontend
    npm install
    npm start
    ```

#### Docker
1) Install [Docker](https://docs.docker.com/get-docker/)
2) Run the following commands:
   ```
   cd root directory
   docker-compose up
   ```

_Note:_<br>
On first launch in docker you need to create server (connection: `db:5432`) and databases `cargo_db` and `cargo_db_test`. After that rerun backend container or shut down all containers and run command `docker-compose up`

## Additional information

#### Ports
* Backend server - localhost:8080
* Frontend client - localhost:3000
* PostgreSQL - localhost:5432 (Docker - localhost:5433)
* pgAdmin - localhost:80 (Docker - localhost:8090)
* Elasticsearch - localhost:9200
* Redis - localhost:6379

#### Application credentials

Type| Login | Password | 
:---: | :---: | :---: |
PostgreSQL | postgres| root |
Docker pgAdmin  | admin@gmail.com | root |
ROLE_SYSADMIN |sysdmin@gmail.com | root |
ROLE_ADMIN | admin@gmail.com | root |
ROLE_DISPATCHER | dispatcher@gmail.com | root |
ROLE_MANAGER | manager@gmail.com | root |
ROLE_DRIVER | driver@gmail.com | root |
ROLE_COMPANY_OWNER | owner@gmail.com | root |

## Technology Stack 
* **Frontend:** React.js, Redux.js, Material-UI, Highcharts, XLSX, Big Calendar
* **Backend:** Java 11, Spring Boot, Spring Data JPA, Spring Security, Elasticsearch, Redis (message broker), AWS-S3, Liquibase, FreeMarker Template
* **Testing tools:** JUnit, Mockito, Selenium
* **Database:** PostgreSQL
* **Build tools:** Maven, Docker
* **Management:** Jira
* **Other protocols, API and technologies:** REST API, Websockets, Google map API, OAuth2, JWT

## Screenshots
* Login page:

![image](/../screenshots/images/login.png "Login")

* Users table:

![image](/../screenshots/images/users.png "Users table")

* Personal cabinet:

![image](/../screenshots/images/cabinet.png "Account")