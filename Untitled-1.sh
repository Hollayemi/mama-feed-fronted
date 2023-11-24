#!/bin/bash -l
echo "post-receive: triggered."

# Define variables
REPO_DIR=~/apps/mama-feeds  # The directory where your app's source code is located
DEST_DIR=~/apps/mama-feeds/dest/  # The destination directory for your application

# Ensure the destination directory exists or create it
mkdir -p $DEST_DIR

# Change to the source code directory
cd $DEST_DIR

echo "post-receive: git check out..."
# Change to the source code directory
cd $REPO_DIR

# Fetch the latest changes from the remote repository (e.g., origin)
git fetch origin

# Check out the latest changes (branch and commit) to the destination directory
git --work-tree=$DEST_DIR --git-dir=$REPO_DIR/.git checkout master -f

echo "post-receive: npm install..."

# Perform any additional tasks, like building, insgit --work-tree=$DEST_DIR --git-dir=$REPO_DIR/.git checkout -f

# Perform any additional tasks, like building, installing dependencies, etc.
# For example, if it's a Node.js project, you might run:
# cd $DEST_DIR
npm install
npm run build

forever restart mama-feeds
# Optionally, restart the application or services as needed
# For example, if it's a web application, you might restart a web server or a process manager like PM2

echo "post-receive: Deployment completed."