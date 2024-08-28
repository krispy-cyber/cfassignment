#!/bin/bash

BUCKET_NAME="flag-images"
DIRECTORY_PATH="./flag-images"

# Loop over all files in the directory
for FILE in $DIRECTORY_PATH/*; do
    # Extract the file name from the path
    FILE_NAME=$(basename $FILE)

    # Upload the file to the R2 bucket
   npx wrangler r2 object put $BUCKET_NAME/$FILE_NAME --file=$FILE

    echo "Uploaded $FILE_NAME to $BUCKET_NAME"
done
