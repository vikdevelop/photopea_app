#/bin/sh

cmake -B build
cd build
make
install -Dm755 -t /app/bin build/photopea_app
