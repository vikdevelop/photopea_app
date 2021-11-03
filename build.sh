#/bin/sh

mkdir build_photopea
cd build_photopea
c++ ./photopea/photopea.cpp `pkg-config --cflags --libs gtk+-3.0 webkit2gtk-4.0` -o photopea_app
install -Dm755 -t /app/bin build_photopea/photopea_app
