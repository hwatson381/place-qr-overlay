// ==UserScript==
// @name         r/Place Overlay
// @namespace    https://github.com/marcus-grant/place-overlay
// @version      1.0.5
// @description  A visual overlay to show errors in tile colors of a desired image in r/place
// @author       github.com/marcus-grant
// @match        https://garlic-bread.reddit.com/embed*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        GM_getResourceText
// @resource     offsets         https://raw.githubusercontent.com/hwatson381/place-qr-overlay/main/offset.json
// @license      GPL-3.0
// ==/UserScript==

if (window.top !== window.self) {
    window.addEventListener('load', main, false);
}

async function main() {
    addModal();

    let offsets = JSON.parse(GM_getResourceText('offsets'));

    document.getElementById('coordstring').textContent = `x: ${offsets.x}, y: ${offsets.y}`;

    let qrLinkContainer = document.getElementById('qr-link');
    qrLinkContainer.innerHTML = '';
    let link = document.createElement('a');
    link.href = `https://new.reddit.com/r/place/?screenmode=fullscreen&cx=${offsets.x}&cy=${offsets.y}&px=21`;
    link.textContent = 'jump';
    qrLinkContainer.appendChild(link);

    //Adjust since the coords of top left spot are negative
    offsets.x += offsets.adjustmentX;
    offsets.y += offsets.adjustmentY;

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

function addModal() {
  const cornerModal = `
      <div>Coords: <span id="coordstring">Loading...</span></div>
      <div>Link to QR <span id="qr-link">(loading...)</span></div>
  `;

  let cornerModalEl = document.createElement('div');
  cornerModalEl.id = 'mod-indicator';
  cornerModalEl.style = 'z-index: 9999999;background-color: white;position: fixed;bottom: 5px;right: 5px;font-size:0.7em;border-top: 1px solid black;padding: 5px;font-family: helvetica, sans-serif;display:block';
  cornerModalEl.innerHTML = cornerModal;
  document.body.appendChild(cornerModalEl);
}
