# node version
FROM node:12.10.0 as builder

# Create directory for react container
RUN mkdir -p /usr/src/app

# Set workdir
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

ARG profile

ENV profile=$profile

ARG port

ENV port=$port_forward

COPY package.json /usr/src/app/package.json

# Install npm-cli-login
RUN npm install -g npm-cli-login

# Login to private repository
RUN npm-cli-login -u eleveniafe -p 3l3v3ni4123 -e frontend.developer@xlplanet.co.id

# Install elevenina Master UI
RUN npm install @elevenia/master-ui

RUN npm install

RUN npm link

#RUN npm install react-scripts -g --silent
RUN npm install react-scripts -g
#RUN npm install react-scripts@latest -g
COPY . /usr/src/app

RUN npm run build:production

# Install serve
#RUN npm install -g serve
#RUN serve -s build


##STAGE 2
FROM nginx:1.15.9-alpine
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder  /usr/src/app/build /usr/share/nginx/html

#EXPOSE ${port}
EXPOSE 8082
CMD ["nginx", "-g", "daemon off;"]