#!/usr/bin/bash
# Install desktop file, icon, appdata file & LICENSE
cp -r com.github.vikdevlop.photopea_app.desktop /usr/share/applications/
cp -r data/com.github.vikdevlop.photopea_app.metainfo.xml /usr/share/metainfo/
cp -r data/icons/com.github.vikdevlop.photopea_app.png /usr/share/icons/hicolor/128x128/apps/
cp -r LICENSE /usr/share/licenses/photopea_app/

# Install Binary file
cp -R dist/photopea-linux-x64 /usr/share/
cd /usr/share/photopea-linux-x64 
ln -s photopea photopea_bin
cp photopea_bin /usr/bin/
echo "Photopea was installed successfully!"
