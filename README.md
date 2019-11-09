# Botnet
###Monitoring status website

#####Technical stack:
1. Nodejs
2. TypeScript
3. PostgreSql
4. Redis
5. Nginx

#####Features:
1. Check status website from host
2. Check status website from multiple hosts
3. Check status website from hosts of the others ADSL providers
3. Detect expired domain or hacked domain
4. Detect trojans "coinhive" (which is poison script support illegal coin miner)
5. Trace action of account, send to user email
#####How to build ?

1. Install Nginx and PostgreSQL
2. Install Nodejs
3. Install Redis
4. Clone source code: `git clone https://github.com/Dohuy/botnet.git`
5. Migrate database: 
    1. `psql -U postgres -h localhost &lt; botnet/data/store/migrate/db.psql`
    2. `node botnet/utils/crawlGatherProxy/crawlGatherProxy.js`
    3. `node botnet/utils/crawlGatherProxy/insertToDb.js`
    4. `node botnet/utils/crawlGatherProxy/updateDetails.js (press Ctrl+Z)`
6. Config Nginx

    1. ``` sudo nano /etc/nginx/sites-available/app.vnist.vn
        server {
        listen 80;
        
        `# root /var/www/example.com;`
        `# index index.html;`
        
        location / {
        proxy_pass &quot;http://127.0.0.1:8080&quot;;
        }
        }``
     2. `sudo ln -s app.vnist.vn ../sites-enable/`
     3. `node botnet/server.js &amp; (sau đó ấn Ctrl+C)`
     4. `systemctl restart nginx`       
     