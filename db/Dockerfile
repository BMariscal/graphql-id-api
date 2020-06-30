FROM mysql

ADD create.sql /docker-entrypoint-initdb.d
HEALTHCHECK --interval=5s --timeout=10s CMD curl --fail http://localhost:3306 || exit 1