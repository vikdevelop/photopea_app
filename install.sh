#!/usr/bin/bash
# Install desktop file, icon, appdata file & LICENSE
sudo install -D -t com.github.vikdevlop.photopea_app.desktop /usr/share/applications
sudo install -D -t data/com.github.vikdevlop.photopea_app.metainfo.xml /usr/share/metainfo
sudo install -D -t data/icons/com.github.vikdevlop.photopea_app.png /usr/share/icons/hicolor/128x128/apps
sudo install -D -t LICENSE /usr/share/licenses/photopea_app

# Build
sudo cp -R dist/photopea-linux-x64 /usr/share/
cd /usr/share/dist/photopea-linux-x64 
sudo ln -s photopea photopea_bin
sudo install -D -t photopea_bin /usr/bin
