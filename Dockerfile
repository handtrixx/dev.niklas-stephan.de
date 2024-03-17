# Use an official Node.js runtime as a base image
FROM node:latest

# Update OS mostly to enjoy latest security updates
RUN apt-get update && apt-get upgrade -y

# Set the working directory inside the container
WORKDIR /usr/src

# Copy the rest of the application code to the working directory
COPY --chown=node:node ./nextapp/. .

# update npm package manager if required
RUN npm install -g npm

# set user to node
USER node

# Expose the port your app runs on
EXPOSE 3000

# Define the startup command
CMD ["sh","/usr/src/utils/startup.sh"]

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3000/ || exit 1