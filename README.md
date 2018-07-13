# Ratings & Reviews Microservice

This goal of this project was to take an existing legacy microservice and improve the system design by scaling for higher traffic and enterprise-sized databases.  The base microservice is a review and rating component of a full eCommerce product page (modeled after Amazon) built using ReactJS, Node, Express, and PostgreSQL with Styled Components to manage stylesheets. To scale this microservice I  ultimately switched databases to the non-relational MongoDB, deployed the component to multiple EC2 instances with a load balancer to offset the requests, and added server-side rendering to improve the user experience.  These additions led to an improved RPS of 100% with an average latency of under 50ms and reduced page load times.

# Table of Contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Related Repositories](#related-repositories)
  - [Installation](#installation)


## Getting Started

### Prerequisites
You will need to have an active account on both [DockerHub](http://dockerhub.com/) and [Amazon Web Services](https://aws.amazon.com/) in order to configure this application.  You will also need `docker cli` and `docker-compose cli` installed

### Related Repositories
These are additional repositories for this project that were created in development.
- Load Balancer:  https://github.com/Ghana-SDC/review-rating-load-balancer
- Proxy:  https://github.com/Ghana-SDC/review-rating-proxy

### Installation
1. Build your node and mongo images
  - Open the `docker-compose.yml` file and edit lines 4 & 14 to replace `YOUR_DOCKERHUB_PROFILE` with your dockerhub profile
  - Run the docker-compose file to build your images
  ```
  docker-compose up
  ```



