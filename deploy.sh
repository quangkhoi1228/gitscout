cd /home/shinobiweb/gitscout 
git pull
yarn build
yarn global add serve
serve -s build -p 8082 & 