#!/bin/sh

# for Flatpak:
mkdir ./build
cd ./build
c++ photopea.cpp `pkg-config --cflags --libs gtk+-3.0 webkit2gtk-4.0` -o photopea_app
install -Dm755 -t /app/bin ./photopea_app

# for all Linux distros (uncoonment lines below):
# mkdir ./build
# cd ./build
# c++ photopea.cpp `pkg-config --cflags --libs gtk+-3.0 webkit2gtk-4.0` -o photopea_app
# install -Dm755 ./photopea_app /usr/bin/photopea_app
