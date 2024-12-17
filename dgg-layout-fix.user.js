// ==UserScript==
// @name        dgg bigscreen layout fix
// @namespace   Violentmonkey Scripts
// @match       https://www.destiny.gg/bigscreen*
// @grant       none
// @version     0.1
// @author      chatter_here
// @license     MIT
// ==/UserScript==

function GM_addStyle(cssStr) {
  const D = document;
  const newNode = D.createElement("style");
  newNode.textContent = cssStr;

  const target =
    D.getElementsByTagName("head")[0] || D.body || D.documentElement;
  target.appendChild(newNode);
}

function ready(fn) {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

function moveBefore(el, newSibling) {
  newSibling.parentNode.insertBefore(el, newSibling);
}
function moveAppend(el, newParent) {
  newParent.appendChild(el);
}

GM_addStyle(`
body .navbar {
    padding: .5rem 0;
    gap: 1rem;
}
body .navbar__item {
    padding: 0 .5rem;
}
body .navbar__items.navbar__socials {
  gap: 0;
}
body .navbar__items.navbar__socials .navbar__icon {
  height: 1.5rem;
}
.stream-controls[data-embed-type="offline"] #close-embed-btn,
.stream-controls[data-embed-type="live"] #close-embed-btn,
.stream-controls[data-embed-type="host"] #close-embed-btn {
}
body .button {
  padding: 0 .4rem;
  height: 2rem;
  align-self: center;
}

body #stream-wrap {
  padding: 0;
}
body #stream-controls {
  gap: 0;
  padding-top: 0;
}
body #stream-controls .stream-controls__group {
  gap: 0;
}
body #control-buttons {
  min-width: fit-content; /* prevent vertical stacking */
}
body .navbar__logo {
  min-width: fit-content; /* prevent horizontal squishing */
}
body .stream-controls__group {
  flex-direction: row-reverse;
  justify-content: space-between;
  flex-wrap: wrap-reverse;
  padding-bottom: 3px;
}
body .control-badges {
  align-content: center;
}
@media (orientation: portrait), (max-width: 40rem) {
  body .stream-panel .control-buttons {
    flex-direction: row;
    align-self: center;
  }
}
`);

ready(() => {
  document.querySelector('.navbar .navbar__item[href="/donate"]').remove(); // redundant
  document.querySelector('.navbar .navbar__item[href="/"').remove(); // redundant

  // TODO tinker with responsive collapsing
  // const moneyButtons = document.createElement('div');
  // moneyButtons.className = 'navbar__items _layoutfix_navbar__money';
  // moveBefore(
  //   moneyButtons,
  //   document.querySelector('.navbar__actions')
  // );

  moveAppend(
    document.getElementById("donate-btn"),
    document.querySelector(".navbar__items.navbar__navigation")
    // moneyButtons
  );
  moveAppend(
    document.getElementById("subscribe-btn"),
    document.querySelector(".navbar__items.navbar__navigation")
    // moneyButtons
  );
  moveBefore(
    document.getElementById("stream-controls"),
    document.getElementById("embed")
  );
  moveBefore(
    document.getElementById("control-buttons"),
    // document.querySelector('.navbar__actions')
    document.querySelector(".navbar__actions .dropdown-root")
  );
});