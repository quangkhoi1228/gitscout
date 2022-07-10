cd /home/shinobiweb/gitscout 
git pull
yarn build
yarn global add serve
nohup  serve -s build -p 8082 & disown 
exit