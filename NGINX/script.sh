if [ -e "./script.js" ]; then
    node script.js
    rm script.js
fi

exec nginx -g 'daemon off;'