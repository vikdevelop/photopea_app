# Photopea Desktop App for Flatpak
![Photopea](https://github.com/vikdevelop/photopea_app/blob/cpp/screenshots/photopea-default.png)

![Photopea2](https://github.com/vikdevelop/photopea_app/blob/cpp/screenshots/photopea2.png)

<h2>Install Electron version</h2>
<a href="https://flathub.org/apps/details/com.github.vikdevelop.photopea_app"><img src="https://flathub.org/assets/badges/flathub-badge-en.png" width=150 height=45></a>
<h2>Build WebkitGTK (C++) version</h2>

```bash
git clone https://github.com/vikdevelop/photopea_app --branch=cpp && cd photopea_app && c++ photopea.cpp `pkg-config --cflags --libs gtk+-3.0 webkit2gtk-4.0` -o photopea_app
```
