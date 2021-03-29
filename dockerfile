FROM node:lts-slim

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./

# 必要なパッケージ
RUN apt-get update \
  && apt-get install -y git zsh curl unzip wget

# zshの導入
RUN git clone --depth=1 https://github.com/ohyama4z/dotfiles.git ~/dotfiles \
  && cd ~/dotfiles \
  && git submodule update --init --recursive --recommend-shallow --depth=1 \
  && chmod +x install.sh \
  && ./install.sh

# AWS CLIとAWS SAM CLIの導入
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
  && unzip awscliv2.zip \
  && ./aws/install \
  && cd ~ \
  && wget "https://github.com/aws/aws-sam-cli/releases/latest/download/aws-sam-cli-linux-x86_64.zip" \
  && unzip aws-sam-cli-linux-x86_64.zip -d sam-installation \
  && ./sam-installation/install

RUN npm ci