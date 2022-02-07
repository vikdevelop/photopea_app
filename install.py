import os
import shutil
os.system("npm install")
os.system("sudo -u")
os.makedirs("/usr/share/photopea_app")
shutil.move("node_modules", "/usr/share/photopea_app/")
shutil.move("com.github.vikdevelop.photopea_app.desktop", "/usr/share/applications/")
shutil.move("data/icons/com.github.vikdevelop.photopea_app.png", "/usr/share/icons/hicolor/128x128/apps/")
shutil.move("src", "/usr/share/photopea_app/")
shutil.move("package.json", "/usr/share/photopea_app/")
shutil.move("package-lock.json", "/usr/share/photopea_app/")
os.makedirs("/usr/share/licenses/photopea_app")
shutil.move("LICENSE", "/usr/share/licenses/photopea_app/")
shutil.move("data/com.github.vikdevelop.photopea_app.metainfo.xml", "/usr/share/metainfo/")
shutil.move("photopea.py", "/usr/bin/")
print("Photopea was installed successfully!")