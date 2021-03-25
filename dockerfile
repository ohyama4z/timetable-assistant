FROM python:3.9.2-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y git zsh unzip curl

RUN git clone --depth=1 https://github.com/ohyama4z/dotfiles.git ~/dotfiles \
  && cd ~/dotfiles \
  && git submodule update --init --recursive --recommend-shallow --depth=1 \
  && chmod +x install.sh \
  && ./install.sh

# RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
#   && unzip awscliv2.zip \
#   && ./aws/install

RUN pip install -U awscli aws-sam-cli \