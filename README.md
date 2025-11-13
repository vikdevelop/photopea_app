# Photocrea Desktop App for Flatpak
![Photopea](https://github.com/vikdevelop/photopea_app/blob/js/data/screenshots/photopea_home.png)

![Photopea2](https://github.com/vikdevelop/photopea_app/blob/js/data/screenshots/photopea_project_page.png)

<h2>Install Electron version</h2>
<a href='https://flathub.org/apps/com.github.vikdevelop.photopea_app'>
<img width='240' alt='Get it on Flathub' src='https://flathub.org/api/badge?locale=en'/>
</a>

<h2>Build WebkitGTK (C++) version</h2>

```bash
git clone https://github.com/vikdevelop/photocrea --branch=cpp && cd photocrea && c++ photopea.cpp `pkg-config --cflags --libs gtk+-3.0 webkit2gtk-4.0` -o photopea_app
```
