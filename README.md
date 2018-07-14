# Ratings & Reviews Microservice

This goal of this project was to take an existing legacy microservice and improve the system design by scaling for higher traffic and enterprise-sized databases.  The base microservice is a review and rating component of a full eCommerce product page (modeled after Amazon) built using ReactJS, Node, Express, and PostgreSQL with Styled Components to manage stylesheets. To scale this microservice I  ultimately switched databases to the non-relational MongoDB, deployed the component to multiple EC2 instances with a load balancer to offset the requests, and added server-side rendering to improve the user experience.  These additions led to an improved RPS of 100% with an average latency of under 50ms and reduced page load times.

# Table of Contents
- [Preface](#preface)
  - [Related Repositories](#related-repositories)
- [Database Performance and Testing](#database-performance-and-testing)
  - [Data Loading](#data-loading)
  - [Query Performance](#query-performance)
    - [Postgres](#postgres)
    - [MongoDB](#mongodb)
  - [Optimization](#optimization)
  - [Conclusions](#conclusions)
- [Baseline Stress Testing](#baseline-stress-testing)
- [Deployment](#deployment)
  -[System Architecture](#system-architecture)
- [Deployed Stress Testing](#deployed-stress-testing)

## Preface
The purpose of this project was to take an existing application and scale it in size.  As such the main takeaways from this readme are the stages of this project that ulimately led to the final decisions made with accompanying statistics.  Instructions on installation and configuration are TBD

### Related Repositories
These are additional repositories for this project that were created in development.
- Load Balancer:  https://github.com/Ghana-SDC/review-rating-load-balancer
- Proxy:  https://github.com/Ghana-SDC/review-rating-proxy

## Database Performance and Testing
Before scaling the application, I performed benchmarked and analyzed query performance of SQL and NoSQL databases to decide on one to use for the final application.  The existing project was built using PostgreSQL and I configured a separate branch to run off of MongoDB.  This schema was fairly straightforward: it consisted of a Products table with a one-to-many relationship with a Reviews table.  With MongoDB I implemented the same schema of collections with an additional Counter collection to act as a sequencer

### Data Loading
To test a large scale application I need to work with large scale data.  I randomly generated 20 Million records (10M for both reviews and products) that I would then import into both databases.  Calcuating the times for each I recorded the following:

| Data | Postgres | MongoDB |
|------|----------|-------|
|Products|1:03.614|2:21.002|
|Reviews|21:00.722|3:38.652|
|**Total**|**22:04.336**|**5:59.654**|

### Query Performance
For measuring query performance I benchmarked standard CRUD requests by running a mixture of queries and determining the minimum and maxium query times to see how varied requests were and what the fastest times possible were for both DBs

#### Postgres
##### Products

| Query Type | Min (ms) | Max (ms) |
|------------|----------|----------|
|Select All|11960.052|16006.367|
|Select by ID|.276|4.306|
|Insert |1.302|6.011| 
|Update by ID|1.373|6.094|
|Delete by ID|1.413|11.594|

##### Reviews

| Query Type | Min (ms) | Max (ms) |
|------------|----------|----------|
|Select All|29688.654|29824|
|Select by ID|.268|2.084|
|Insert |1.835|45.514| 
|Update by ID|1.766|6.532|
|Delete by ID|1.498|2.515|

#### MongoDB
##### Products

| Query Type | Min (ms) | Max (ms) |
|------------|----------|----------|
|Select All|2090|9458|
|Select by ID|0|0|
|Insert |1|10| 
|Update by ID|0|1|
|Delete by ID|0|1|

##### Reviews

| Query Type | Min (ms) | Max (ms) |
|------------|----------|----------|
|Select All|5336|26598|
|Select by ID|0|1|
|Insert |0|16| 
|Update by ID|1|7|
|Delete by ID|2|2|

### Optimization
As part of benchmarking I needed to optimize lookups based off of foreign keys ("product_id" in this case). This was done by indexing the field in the table/collection to reduce the time greatly.  I ran a variety of queries to get the minimum and maxium before and after indexing to determine how greatly either database benefitied from the optimization.

#### Query Reviews by Product ID

|DB|Min Before (ms)|Max Before (ms)|Min After (ms)|Max After (ms)|
|--|----------|----------|---------|---------|
|Postgres|2382|2395|.314|6.467|
|MongoDB|26802|29305|4|4|

### Conclusions
Overall MongoDB proved to be the quicker of the two databases tested.  While Postgres was the quickest to import a single unrelated collection of data, times spiked as soon as related data was imported.  Importing a single collection is slower with Mongo but does not need to check for relations with other collections, and as a result experienced the quickest times overall, just over 16 minutes faster.  Some requests MongoDB completely outperformed Postgres, and for other requests where query times were similar I noticed that MongoDB was more consistent with its results.  Lastly, MongoDB benefited the most from indexing and vastly improved the query time as opposed to Postgres.  With these results I determined MongoDB to be the database of choice moving forward


## Baseline Stress Testing
TBD

## Delpoyment
TBD

### System Architecture
TBD

## Deployed Stress Testing
TBD
