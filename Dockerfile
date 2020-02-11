# Start from official base Ubuntu image, on latest LTS version
FROM francisli/ruby:2.5.3

# Copy in the project files and set as working directory
ADD . $APP_HOME
WORKDIR $APP_HOME

# Install gems
RUN bash -l -c "bundle install"

# Build production assets for prod deployment
RUN bash -l -c "RAILS_ENV=production rails assets:precompile"

# Install node modules including dev dependencies for development
RUN bash -l -c "yarn install --prod=false"

# For development, mark the directory as a mount override point
VOLUME $APP_HOME

# Expose default server port
EXPOSE 3000
