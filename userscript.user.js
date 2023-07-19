// ==UserScript==
// @name         r/Place Overlay
// @namespace    https://github.com/marcus-grant/place-overlay
// @version      1.0.1
// @description  A visual overlay to show errors in tile colors of a desired image in r/place
// @author       github.com/marcus-grant
// @match        https://hot-potato.reddit.com/embed*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// @license      GPL-3.0
// ==/UserScript==
if (window.top !== window.self) {
    window.addEventListener('load', () => {
      document
        .getElementsByTagName("mona-lisa-embed")[0]
        .shadowRoot
        .children[0]
        .getElementsByTagName("mona-lisa-canvas")[0]
        .shadowRoot
        .children[0]
        .appendChild(
          (function () {
              const img = document.createElement("img");
              // img.src = "https://drive.google.com/file/d/1VEhNsbR4aHDePwOLmiNlxctv39TeGnci/view?usp=sharing";
              img.src = "https://github.com/hwatson381/place-qr-overlay/raw/main/qroverlay.png";
              // img.style = "position: absolute;left: 0;top: 0;image-rendering: pixelated;width: 2000px;height: 1000px;";
              // img.style = "position: absolute;left: 1859px;top: 618px;image-rendering: pixelated;width: 33px;height: 33px;";
              img.style = "position: absolute;left: 1870px;top: 917px;image-rendering: pixelated;width: 33px;height: 33px;";
              console.log(img);
              return img;
          })())
        .appendChild(
          (function () {
              const img = document.createElement("img");
              // img.src = "https://drive.google.com/file/d/1VEhNsbR4aHDePwOLmiNlxctv39TeGnci/view?usp=sharing";
              img.src = "https://github.com/hwatson381/place-qr-overlay/raw/main/qroverlay.png";
              // img.style = "position: absolute;left: 0;top: 0;image-rendering: pixelated;width: 2000px;height: 1000px;";
              // img.style = "position: absolute;left: 1859px;top: 618px;image-rendering: pixelated;width: 33px;height: 33px;";
              img.style = "position: absolute;left: 1300px;top: 1916px;image-rendering: pixelated;width: 33px;height: 33px;";
              console.log(img);
              return img;
          })())
  }, false);
}
