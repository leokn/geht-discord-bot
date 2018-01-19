###############################################################################
# $ID: Dockerfile, 13 Jan 2018 21:01, Leonid 'n3o' Knyazev $
###############################################################################
FROM node:latest

MAINTAINER Leonid Knyazev <leonid@knyazev.me>

# Copy the package.json file alone in a single instruction into a temporary folder
ADD package.json /tmp/package.json

# Install all the dependencies with npm install
RUN cd /tmp && npm install --silent --progress=false

# Create project directory and copy installed dependencies to this directory
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app

# Working directory for application
WORKDIR /opt/app

# Copy our app to the working directory
ADD . /opt/app

# Build our app
RUN npm run build

# Creates a mount point
VOLUME [ "/opt/app" ]

# Start app
CMD ["npm", "start"]
