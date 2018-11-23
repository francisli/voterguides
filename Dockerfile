# Start from official base Ubuntu image, on latest LTS version
FROM tikitaki/public:ruby2.5.3

# Copy in the project files and set as working directory
ADD . $APP_HOME
WORKDIR $APP_HOME

# Install gems
RUN bash -l -c "bundle install --without production"

# Install node modules
RUN bash -l -c "yarn install"

# For development, mark the directory as a mount override point
VOLUME $APP_HOME

# Expose default server port
EXPOSE 3000
