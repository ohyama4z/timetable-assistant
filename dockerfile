FROM node:14.16.0-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y git zsh unzip curl \
  && git clone --depth=1 https://github.com/ohyama4z/dotfiles.git ~/dotfiles \
  && cd ~/dotfiles \
  && git submodule update --init --recursive --recommend-shallow --depth=1 \
  && chmod +x install.sh \
  && ./install.sh \
  && curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
  && unzip awscliv2.zip \
  && ./aws/install \