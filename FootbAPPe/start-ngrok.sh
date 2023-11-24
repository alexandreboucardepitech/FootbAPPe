#!/bin/bash

ngrok http 5002 > /dev/null &

sleep 1

NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | jq -r '.tunnels[0].public_url')

echo "NGROK_URL=$NGROK_URL"
echo "NGROK_URL=$NGROK_URL" > .env

expo start --tunnel --clear