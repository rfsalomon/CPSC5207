To generate a docker image for the client app:

>  docker build -t cpsc5207/client .

and then

> docker run --name Client -p 3033:3033 --add-host host.docker.internal:host-gateway -d cpsc5207/client

