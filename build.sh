#/bin/sh

c++ ./photopea/photopea.cpp `pkg-config --cflags --libs gtk+-3.0 webkit2gtk-4.0` -o photopea-app
install -Dm755 -t /app/bin photopea_app
