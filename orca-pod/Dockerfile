FROM python:3.10-slim

ENV PROJECT_DIR=etl

RUN mkdir /$PROJECT_DIR

WORKDIR /$PROJECT_DIR

# Install Rust using rustup
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

# Add Rust binaries to the PATH
ENV PATH="/root/.cargo/bin:${PATH}"

ENV GIT_DESCRIPTION=etl

# Copy the requirements file into the container at /app
COPY requirements.txt //$PROJECT_DIR/

# Install any needed dependencies specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . /$PROJECT_DIR/

# Expose the port that the app will run on
EXPOSE 8080

# Define the command to run your app
CMD ["python", "/etl/app.py"]