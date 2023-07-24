// ==UserScript==
// @name         r/Place Overlay
// @namespace    https://github.com/marcus-grant/place-overlay
// @version      1.0.9
// @description  A visual overlay to show errors in tile colors of a desired image in r/place
// @author       github.com/marcus-grant
// @match        https://garlic-bread.reddit.com/embed*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        GM_getResourceText
// @resource     offsets         https://raw.githubusercontent.com/hwatson381/place-qr-overlay/main/offset.json
// @license      GPL-3.0
// ==/UserScript==

let offsets = {
    x:0,
    y:0,
    adjustmentX: 1000,
    adjustmentY: 500
}

if (window.top !== window.self) {
    window.addEventListener('load', main, false);
}

async function main() {
    addModal();

    offsets = JSON.parse(GM_getResourceText('offsets'));

    document.getElementById('coordstring').textContent = `x: ${offsets.x}, y: ${offsets.y}`;

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
            img.id = 'qr-overlay';
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
      <button id="change-coords">Change Coords</button><br>
      <input type="checkbox" id="toggle-overlay" checked>
      <label for="checkbox"> Enable Overlay</label>
  `;

  let cornerModalEl = document.createElement('div');
  cornerModalEl.id = 'mod-indicator';
  cornerModalEl.style = 'z-index: 9999999;background-color: white;position: fixed;bottom: 5px;left: 5px;font-size:0.7em;border-top: 1px solid black;padding: 5px;font-family: helvetica, sans-serif;display:block';
  cornerModalEl.innerHTML = cornerModal;
  document.body.appendChild(cornerModalEl);

  document.getElementById('change-coords').addEventListener('click', ()=>{
      offsets.x = parseInt(prompt('new x coord'));
      offsets.y = parseInt(prompt('new y coord'));

      document.getElementById('coordstring').textContent = `x: ${offsets.x}, y: ${offsets.y}`;

      offsets.x += offsets.adjustmentX;
      offsets.y += offsets.adjustmentY;

      let overlayImg = document
        .getElementsByTagName("garlic-bread-embed")[0]
        .shadowRoot
        .children[0]
        .getElementsByTagName("garlic-bread-canvas")[0]
        .shadowRoot
        .children[0]
        .querySelector('#qr-overlay');
      overlayImg.style.left = `${offsets.x}px`;
      overlayImg.style.top = `${offsets.y}px`;
  });

  document.getElementById('toggle-overlay').addEventListener('click', () => {
    let overlayImg = document
        .getElementsByTagName("garlic-bread-embed")[0]
        .shadowRoot
        .children[0]
        .getElementsByTagName("garlic-bread-canvas")[0]
        .shadowRoot
        .children[0]
        .querySelector('#qr-overlay');
    overlayImg.style.display = document.getElementById('toggle-overlay').checked ? 'block' : 'none';
  });
}
