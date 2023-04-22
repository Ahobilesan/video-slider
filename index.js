class VideoSlider extends HTMLElement{connectedCallback(){console.log("connected callback"),this.render(),this.init()}init(){const e=900,n=document.getElementById("blockScroll"),t=document.getElementById("video"),o=document.getElementById("wrapper"),d=document.getElementById("video-wrapper");t.addEventListener("loadedmetadata",()=>n.style.height=Math.floor(t.duration)*e+"px"),d.addEventListener("wheel",e=>o.scrollTop=o.scrollTop+e.deltaY),window.requestAnimationFrame(function n(){t.currentTime=o.scrollTop/e,function(e){const n=document.getElementById("text-1"),t=document.getElementById("text-2"),o=document.getElementById("text-3");e>0&&e<3?n.classList.add("show"):n.classList.remove("show"),e>3&&e<6?t.classList.add("show"):t.classList.remove("show"),e>6&&e<8?o.classList.add("show"):o.classList.remove("show")}(o.scrollTop/e),window.requestAnimationFrame(n)})}render(){this.innerHTML='<div id="wrapper">\n    <style>\n      html,\n      body {\n        margin: 0;\n        padding: 0;\n        overflow: hidden;\n      }\n      #blockScroll {\n        display: block;\n      }\n      #video {\n        top: 0;\n        left: 0;\n        height: 100%;\n      }\n      .cpp-text-block {\n        top: 0;\n        color: #fff;\n        z-index: 100;\n      }\n      .show {\n        display: block !important;\n      }\n      .hide {\n        display: none;\n      }\n      #wrapper {\n        height: 100vh;\n        overflow: auto;\n      }\n      #video-wrapper {\n        background-color: #1e3930;\n        position: absolute;\n        top: 0;\n        z-index: 10;\n        height: 90vh;\n      }\n    </style>\n    <div id="blockScroll"></div>\n    <div id="video-wrapper">\n      <div class="cpp-text-block">\n        <h1 id="text-1" class="hide">Text 1</h1>\n        <h1 id="text-2" class="hide">Text 2</h1>\n        <h1 id="text-3" class="hide">Text 3</h1>\n      </div>\n      <video\n        id="video"\n        playsinline\n        muted\n        preload="auto"\n        poster="https://lh3.googleusercontent.com/u/0/drive-viewer/AAOQEOQ_3AafdWAjB80tWSTcwTttK_dRhkTqbqntDdo-TWIKCEtZ-BGnDV93uZ8gRMuFUm0ZFqd4WN2qG5ysiAPFIo7l7Y3K=w1661-h953"\n      >\n        <source\n          type="video/mp4"\n          src="https://drive.google.com/uc?id=1On40pTelPp4ZEBZI6LZghheTkpMznBsy"\n          data-src="https://drive.google.com/uc?id=1On40pTelPp4ZEBZI6LZghheTkpMznBsy"\n        />\n      </video>\n    </div>\n  </div>'}}window.customElements.define("video-slider",VideoSlider);
