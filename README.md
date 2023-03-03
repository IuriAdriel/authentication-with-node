# Project instructions

Steps to run this project:

1. Run `yarn install` command
2. Rename `.env.example` to `.env`
3. Setup database settings inside `.env` file
4. Setup `SALT_KEY` and `SECRET_KEY` inside `.env` file
5. Run `yarn dev` command

`Notes:`

`SALT_KEY` is used to increment extra key on password.

`SECRET_KEY` is used to encrypt/decrypt jwt token.
