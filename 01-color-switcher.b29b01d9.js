!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=document.querySelector("body"),o=null;n.style;t.addEventListener("click",(function(){null!==(o=setInterval((function(){n.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3))&&(t.disabled=!0)})),e.addEventListener("click",(function(){clearInterval(o),t.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.b29b01d9.js.map
