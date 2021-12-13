#include "webview.h"
#ifdef WIN32
int WINAPI WinMain(HINSTANCE hInt, HINSTANCE hPrevInst, LPSTR lpCmdLine,
                   int nCmdShow) {
#else
int main() {
#endif
  webview::webview w(true, nullptr);
  w.set_title("Photopea");
  w.set_size(3840, 2160, WEBVIEW_HINT_NONE);
  w.navigate("https://photopea.com");
  w.run();
  return 0;
}
