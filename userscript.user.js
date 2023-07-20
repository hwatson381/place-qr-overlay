// ==UserScript==
// @name         r/Place Overlay
// @namespace    https://github.com/marcus-grant/place-overlay
// @version      1.0.3
// @description  A visual overlay to show errors in tile colors of a desired image in r/place
// @author       github.com/marcus-grant
// @match        https://garlic-bread.reddit.com/embed*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// @license      GPL-3.0
// ==/UserScript==

if (window.top !== window.self) {
    window.addEventListener('load', main, false);
}

async function main() {
    let offsets = {x:0, y:0};
    offsets.x = parseInt(prompt('enter x coord for top left corner')) + 500;
    offsets.y = parseInt(prompt('enter y coord for top left corner')) + 500;

    //let offsetResponse = await fetch('https://raw.githubusercontent.com/hwatson381/place-qr-overlay/main/offset.json');
    //let offsets = await offsetResponse.json();

      document
        .getElementsByTagName("garlic-bread-embed")[0]
        .shadowRoot
        .children[0]
        .getElementsByTagName("garlic-bread-canvas")[0]
        .shadowRoot
        .children[0]
      .appendChild(
        (function () {
            const img = document.createElement("img");
            // img.src = "https://drive.google.com/file/d/1VEhNsbR4aHDePwOLmiNlxctv39TeGnci/view?usp=sharing";
            img.src = "https://github.com/hwatson381/place-qr-overlay/raw/main/qroverlay.png";
            img.style = `position: absolute;left: ${offsets.x}px;top: ${offsets.y}px;image-rendering: pixelated;width: 33px;height: 33px;`;
            console.log(img);
            return img;
        })())
}
