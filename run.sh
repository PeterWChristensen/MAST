#!/bin/bash

cd client
rm -rf build
npm run build
cd ../server/app/views
cp -r ../../../client/build/* .
npm start
