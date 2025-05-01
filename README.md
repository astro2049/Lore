# Lore · Recipes 🍲

lore is an online community forum built with a **Vite** frontend (`lore-frontend`) and a **NestJS** backend (`lore-backend`).

You'll find recipes below to help you deploy, update, and maintain the site.

## ⛩️ Deploy for the first time

**Environment:** AWS Lightsail instance (Amazon Linux 2023)

#### step 1. install runtimes

```bash
# refresh package list
sudo dnf upgrade

# install Node.js LTS (20.x) + build tools
sudo dnf install nodejs20 gcc-c++ make
# verify
node -v   # v20.*
npm  -v
```

#### step 2. install Git and pull the code

```bash
sudo dnf install git

sudo mkdir -p /srv/sites
cd /srv/sites
# give yourself ownership and nginx read‑only access
sudo chown ec2-user:nginx /srv/sites
sudo chmod 2750 /srv/sites

git clone https://github.com/astro2049/Lore.git
cd Lore
```

#### step 3. build the Vite app

```bash
cd lore-frontend

# supply environment variables / .env
cp .env.example .env.local
nano .env.local

npm install
npm run build
```

#### step 4. build and start the NestJS app

```bash
cd lore-backend

# supply environment variables / .env
cp .env.example .env
nano .env

npm install
npm run build

# create schema
npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts

# start the app
npm run start:prod
# or, in background
nohup npm run start:prod > app.log 2>&1 &
echo $! > app.pid
```

#### step 5. set up Nginx

**part 1. install and start Nginx**

```bash
sudo dnf install nginx
# verify
nginx -v

# enable Nginx to start on boot (enable) and start it right now (--now)
sudo systemctl enable --now nginx
# verify
sudo systemctl status nginx
```

**part 2. supply the configs**

```bash
sudo nano /etc/nginx/conf.d/lore.conf
```

*lore.conf*

```nginx
server {
    listen 80;                            # HTTP port
    server_name yourdomain.com;           # or your Lightsail (static) IP
    
    # Disable logs
    access_log off;
    error_log  /dev/null  crit;
    
    # Vite app
    root /srv/sites/Lore/lore-frontend/dist;
    index index.html;
    
    # Serve static assets (js, css, images, fonts, etc.) with long cache
    location ~* \.(?:js|mjs|css|woff2?|ttf|eot|svg|png|jpe?g|gif|ico|webp)$ {
        try_files $uri =404;
        access_log off;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback
    location / {
        try_files $uri /index.html;
    }

    # NestJS app, reverse proxy
    location /api/ {
        proxy_pass         http://127.0.0.1:3000/;
        proxy_http_version 1.1;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   Upgrade           $http_upgrade;
        proxy_set_header   Connection        "upgrade";
    }
}
```

**part 3. verify syntax and reload configs**

```bash
# syntax check
sudo nginx -t
# reload configs
sudo systemctl reload nginx
```

#### step 6 (optional). set up HTTPS

```bash
# install Certbot & Nginx plugin
sudo dnf install certbot python3-certbot-nginx

# get and install your certificates
sudo certbot --nginx -d yourdomain.com

# test renewal
sudo certbot renew --dry-run
```

## 🍕 Workflows

### NestJS app

#### start the app

```bash
# option 1: in foreground
npm run start:prod

# option 2: in background
# redirect all output (stdout and stderr) to app.log
nohup npm run start:prod > app.log 2>&1 &
# save the PID to app.pid (useful for stopping the process later)
echo $! > app.pid
```

#### stop the app

```bash
kill $(cat app.pid)
# or
kill $(lsof -iTCP:3000 -sTCP:LISTEN -t)
```

## 🗄️ Database

**Environment:** AWS Lightsail MySQL Database

### migrations

https://typeorm.io/migrations

#### generate migrations

```bash
npx typeorm-ts-node-commonjs migration:generate src/migrations/${InitialSchema} -d src/data-source.ts
```

#### run migrations

```bash
npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts
```

