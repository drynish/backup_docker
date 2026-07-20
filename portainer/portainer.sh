docker stop portainer
docker rm portainer
docker create -p 8000:8000 -p 9000:9000 \
   --name=portainer \
   --restart=always \
   --network=caddy \
   -v /var/run/docker.sock:/var/run/docker.sock \
   -v portainer_data:/data \
   --label caddy="portainer.drynish.synology.me" \
   --label caddy.reverse_proxy="{{upstreams 9000}}" portainer/portainer-ce:lts
docker start portainer
