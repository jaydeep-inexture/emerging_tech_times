FROM node:22.7.0-bullseye

WORKDIR /app

# Install Supervisor
RUN apt-get update && \
    apt-get install -y supervisor && \
    apt-get clean


# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Create the Supervisor configuration directory
RUN mkdir -p /etc/supervisor/conf.d

# Copy the Supervisor configuration file
COPY supervisor.conf /etc/supervisor/conf.d/supervisor.conf

# Expose the port the app runs on
EXPOSE 5173
EXPOSE 5000

RUN chmod +x /app/entrypoint.sh

# Run the application
RUN /app/entrypoint.sh

# Start Supervisor
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisor.conf"]