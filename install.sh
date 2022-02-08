#!/usr/bin/bash
# Install desktop file, icon, appdata file & LICENSE
cp com.github.vikdevlop.photopea_app.desktop /usr/share/applications/
cp data/com.github.vikdevlop.photopea_app.metainfo.xml /usr/share/metainfo/
cp data/icons/com.github.vikdevlop.photopea_app.png /usr/share/icons/hicolor/128x128/apps/
cp LICENSE /usr/share/licenses/photopea_app/

# Install Binary file
cp -R dist/photopea-linux-x64 /usr/share/
cd /usr/share/photopea-linux-x64 
ln -s /usr/share/photopea-linux-x64/photopea /usr/bin/photopea
echo "Photopea was installed successfully!"
