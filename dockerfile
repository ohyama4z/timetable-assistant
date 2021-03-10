FROM node:14.16.0-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y git zsh sudo \
  && git clone --depth=1 https://github.com/ohyama4z/dotfiles.git ~/dotfiles \
  && cd ~/dotfiles \
  && git submodule update --init --recursive --recommend-shallow --depth=1 \
  && chmod +x install.sh \
  && ./install.sh