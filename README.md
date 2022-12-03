# BikeCoop App

Responsive webapp for member, volunteer, and scheduled shifts coop-style organization 

### Dev
Install: 
```
pnpm install
```
Build: 
```
pnpm run build 
```
### Run locally
```
docker-compose up -d // start postgres and supertokens api

createdb bike_coop_manager_development // initialize db

pnpm run dev // starts web and api 
```
