FROM node:lts-slim

COPY --from=docker /usr/local/bin/docker /usr/local/bin/docker

WORKDIR /tmp

RUN set -x \
  && apt-get update \
  && apt-get install -y git zsh curl unzip wget \
  && git clone --depth=1 https://github.com/ohyama4z/dotfiles.git ~/dotfiles \
  && cd ~/dotfiles \
  && git submodule update --init --recursive --recommend-shallow --depth=1 \
  && chmod +x install.sh \
  && ./install.sh \
  # && curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
  # && unzip awscliv2.zip \
  # && ./aws/install \
  # && cd ~ \
  # && wget "https://github.com/aws/aws-sam-cli/releases/latest/download/aws-sam-cli-linux-x86_64.zip" \
  # && unzip aws-sam-cli-linux-x86_64.zip -d sam-installation \
  # && ./sam-installation/install

  WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci
