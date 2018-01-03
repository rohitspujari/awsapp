#!/bin/bash

$(aws ecr get-login --no-include-email --region us-east-1)
docker build -t rpujari/upload_video .
docker tag rpujari/upload_video:latest 465541050084.dkr.ecr.us-east-1.amazonaws.com/rpujari/upload_video:latest
docker system prune -f 
docker push 465541050084.dkr.ecr.us-east-1.amazonaws.com/rpujari/upload_video:latest
