#!/bin/bash

# Strict error handling
set -euo pipefail

# Load environment variables
if [ -f .env ]; then
  source .env
fi

# Validate required environment variables
if [ -z "$MONGODB_URI" ]; then
  echo "Error: MONGODB_URI environment variable is not set." >&2
  exit 1
fi

# Set default values for optional variables
LOG_FILE="${LOG_FILE:-/var/log/fitness-tracker.log}"
PID_FILE="${PID_FILE:-/var/run/fitness-tracker.pid}"

# Define utility functions
log_info() {
  echo "$(date +"%Y-%m-%d %H:%M:%S") INFO: $*" >> "$LOG_FILE"
}

log_error() {
  echo "$(date +"%Y-%m-%d %H:%M:%S") ERROR: $*" >&2 >> "$LOG_FILE"
}

cleanup() {
  log_info "Cleaning up..."
  if [ -f "$PID_FILE" ]; then
    kill -9 $(cat "$PID_FILE") 2>/dev/null
    rm "$PID_FILE"
  fi
  # Stop any other services here
}

check_dependencies() {
  log_info "Checking dependencies..."
  command -v npm >/dev/null 2>&1 || { log_error "npm is required."; exit 1; }
  command -v mongod >/dev/null 2>&1 || { log_error "mongod is required."; exit 1; }
  # Check for any other dependencies here
}

# Main execution flow
main() {
  trap cleanup EXIT ERR

  log_info "Starting Fitness Tracker MVP..."

  # Check required dependencies
  check_dependencies

  # Start MongoDB
  start_database

  # Wait for MongoDB to become available
  wait_for_service mongodb 27017

  # Start Next.js development server
  start_frontend

  # Start backend server
  start_backend
  
  # Store PID
  store_pid

  log_info "Fitness Tracker MVP started successfully."
}

# Function definitions
start_database() {
  log_info "Starting MongoDB..."
  mongod --dbpath=/data/db --bind_ip_all &
}

start_backend() {
  log_info "Starting backend server..."
  npm start &
}

start_frontend() {
  log_info "Starting Next.js development server..."
  npm run dev &
}

store_pid() {
  log_info "Storing process IDs..."
  echo $$ > "$PID_FILE"
  # Store PIDs for other services here
}

# Function to wait for service to become available
wait_for_service() {
  local service="$1"
  local port="$2"
  local timeout="${3:-30}" # Timeout in seconds
  local attempt=0
  
  until nc -z localhost "$port" 2>/dev/null; do
    ((attempt++))
    log_info "Waiting for $service on port $port (attempt $attempt)... "
    sleep 1
    if ((attempt > timeout)); then
      log_error "Timeout waiting for $service on port $port."
      exit 1
    fi
  done
}

# Main script execution
main