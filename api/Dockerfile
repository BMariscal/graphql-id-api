FROM node:12-alpine

RUN echo "#!/bin/sh \n\
    echo "fs.inotify.max_user_watches before update" \n\
    cat /etc/sysctl.conf\n\
    echo "______________________________________________updating inotify ____________________________________" \n\
    echo fs.inotify.max_user_watches=524288 | tee -a /etc/sysctl.conf && sysctl -p \n\
    echo "updated value is" \n\
    cat /etc/sysctl.conf | grep fs.inotify \n\
    "
WORKDIR '/app'
COPY package.json package-lock.json ./
RUN npm install
COPY . /app
HEALTHCHECK --interval=5s --timeout=10s CMD curl --fail http://localhost:3306 || exit 1
CMD ["npm", "run", "start"]