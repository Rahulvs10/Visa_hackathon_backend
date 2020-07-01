# Visa Hackathon Backend
Api for Visa Hackathon project.

## Project setup
Clone the repo and cd into the directory
```shell script
$ git clone https://github.com/Rahulvs10/Visa_hackathon_backend
$ cd Visa_hackathon_backend
```

1) Create `config/config.json` using `config/config.json.example` as reference.
2) Add `cert.pem`, `DigCertGlobalRootCA.cer`, `privateKey.pem` files to the certificates' directory.
3) Create `config/credentials.json` using `config/credentials.json.example` as reference.

Download the node dependencies
```shell script
$ npm install
```

Migrate the database
```shell script
$ npm run migrate
```
Run the project in development environment
```shell script
$ npm run start
```
