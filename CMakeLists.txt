cmake_minimum_required(VERSION 3.2)
project(photopea_app)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

FIND_PACKAGE(PkgConfig REQUIRED)
PKG_CHECK_MODULES(GTKMM3 gtkmm-3.0 REQUIRED)
PKG_CHECK_MODULES(WEBKIT webkit2gtk-4.0 REQUIRED)
include_directories(${GTKMM3_INCLUDE_DIRS} ${WEBKIT_INCLUDE_DIRS})

add_executable(photopea_app ${photopea_app_SRC} photopea.cpp webview.h)
target_link_libraries(photopea_app ${GTKMM3_LIBRARIES} ${WEBKIT_LIBRARIES})
