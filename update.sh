#!/bin/bash
ssh jduncan@design.digiserve.org 'mkdir /data/www/nodejs/live/abv2/nginx/html/pwa/new'
tar czv pwa | ssh jduncan@design.digiserve.org 'cat | tar xz -C /data/www/nodejs/live/abv2/nginx/html/pwa/new'
ssh jduncan@design.digiserve.org 'cp -r /data/www/nodejs/live/abv2/nginx/html/pwa/new/pwa/* /data/www/nodejs/live/abv2/nginx/html/pwa/.'
scp version.txt jduncan@design.digiserve.org:/data/www/nodejs/live/abv2/nginx/html/pwa
ssh jduncan@design.digiserve.org 'rm -rf /data/www/nodejs/live/abv2/nginx/html/pwa/new'
