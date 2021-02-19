FROM ubuntu:20.04
ENV DEBIAN_FRONTEND noninteractive
WORKDIR /app
RUN apt update && \
    apt install -y curl unzip sqlite3 libgtkextra-dev libgconf2-dev libnss3 libasound2 libxtst-dev libxss1 && \
    curl -o nodejs.deb https://deb.nodesource.com/node_14.x/pool/main/n/nodejs/nodejs_14.15.4-deb-1nodesource1_amd64.deb && \
    apt install -y ./nodejs.deb && \
    rm nodejs.deb && \
    rm -rf /var/lib/apt/lists/
RUN npm i -g @vue/cli
CMD [ "bash" ]
