FROM node:latest
WORKDIR /var/www
EXPOSE 3000 
ENTRYPOINT ["yarn", "start"]

# docker build -f nodejs.dockerfile -t clubhubdocker/nodejs
# docker run -d -p 8080:8080 --name clubhub_node clubhub_node 
