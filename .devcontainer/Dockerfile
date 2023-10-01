FROM fuzzknob/octodevbase:latest

RUN apt update && apt install nginx -y

RUN export NVM_DIR="$HOME/.nvm" && \
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && \
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" && \
  nvm use default && \
  npm i -g yarn
