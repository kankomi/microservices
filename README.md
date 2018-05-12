# microservices

A simple microservices project with loadbalancing(nginx) and senecajs


# Deployment

Step 1. Build the new service:

`docker-compose build api-service`

Step 2. Look for the instance:

`docker ps`

Step 3. Kill one instance of the api-service:

`docker kill 0152eed`

Step 4. Spin up a new version of the api-service:

`docker-compose scale api-service=2`

Repeat Step 2-4 for the other instance as well.
