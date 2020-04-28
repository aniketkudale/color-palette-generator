let paletteLength =  document.getElementsByClassName('palette_color').length, i;
var copyToast = document.getElementsByClassName("toast-copied")[0];
document.addEventListener('DOMContentLoaded', function() {
  load();
});

document.body.onkeyup = function(e) {
    if(e.keyCode == 13) {
     load();
   }
}

function load() {
  document.getElementById("generate").pause();
  document.getElementById("generate").currentTime = 0;
  document.getElementById("generate").play();
  for(i = 0; i < paletteLength; i++) {
    document.getElementsByClassName('palette_color')[i].addEventListener("click", function(e) {
      var rgbValues = window.getComputedStyle(this, null).getPropertyValue("background-color");
      var hexValue = rgb2hex(rgbValues);
      copyToast.classList.toggle("show");
      copyToast.innerText = "Copied!";
      copyToast.innerText = hexValue + " " + copyToast.innerText;
      copyToClipboard(hexValue);
      copyToast.style.backgroundColor = hexValue;
      document.getElementById("copy").play();
      setTimeout(function() {
        copyToast.classList.toggle("show");
      }, 2000);   
    });
    document.getElementsByClassName('palette_color')[i].style.backgroundColor = "#"+((1<<24)*Math.random()|0).toString(16);
  }   
}

function rgb2hex(rgb) {
  if (rgb.search("rgb") == -1) {
    return rgb;
  } else {
    rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
    function hex(x) {
      return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
  }
}

function copyToClipboard(text) {
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}