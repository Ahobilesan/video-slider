class VideoSlider extends HTMLElement {
  maxScroll = 0;
  connectedCallback() {
    this.render();
    this.init();
  }
  init() {
    const cpp_playbackConst = 900,
      cpp_block = document.getElementById("cpp-slider"),
      cpp_video = document.getElementById("cpp-video"),
      cpp_wrapper = document.getElementById("cpp-slider-wrapper");

    cpp_video.addEventListener("loadedmetadata", () => {
      this.maxScroll = Math.floor(cpp_video.duration) * cpp_playbackConst;
      cpp_block.style.height = this.maxScroll + "px";
    });

    let scrollTop = 0;
    cpp_wrapper.addEventListener("wheel", ({ deltaY }) => {
      const scrollValue = scrollTop + deltaY;
      if (scrollValue < this.maxScroll) {
        scrollTop = scrollValue;
      }
      if (scrollValue < 1) {
        scrollTop = 0;
      }
    });

    function toggleText(val) {
      const cpp_text1 = document.getElementById("cpp-text-1"),
        cpp_text2 = document.getElementById("cpp-text-2"),
        cpp_text3 = document.getElementById("cpp-text-3");

      if (val > 0 && val < 3) {
        cpp_text1.classList.add("cpp-show");
      } else {
        cpp_text1.classList.remove("cpp-show");
      }
      if (val > 3 && val < 6) {
        cpp_text2.classList.add("cpp-show");
      } else {
        cpp_text2.classList.remove("cpp-show");
      }
      if (val > 6 && val < 8) {
        cpp_text3.classList.add("cpp-show");
      } else {
        cpp_text3.classList.remove("cpp-show");
      }
    }

    function handleScroll() {
      cpp_video.currentTime = scrollTop / cpp_playbackConst;
      toggleText(scrollTop / cpp_playbackConst);

      window.requestAnimationFrame(handleScroll);
    }

    window.requestAnimationFrame(handleScroll);
  }
  render() {
    this.innerHTML = `
      <style>
        #cpp-video {
          height: 65%;
          display: block;
          margin: auto;
        }
        .cpp-text-block {
          padding: 0 3em;
          text-align: center;
          color: #fff;
          margin: auto;
        }
        .cpp-text-block-description {
          color: #fff;
          text-align: center;
          text-transform: uppercase;
          padding-bottom: 20px;
          font-family: Kanit, sans-serif;
          font-size: 20px;
          line-height: 30px;
        }
        .cpp-text-block-header {
          color: #fff;
          text-align: center;
          text-transform: uppercase;
          margin-bottom: 50px;
          font-family: Bad Habits, sans-serif;
          font-size: 50px;
          line-height: 40px;
        }
        .cpp-show {
          display: block !important;
          width: 100%;
        }
        .cpp-hide {
          display: none;
        }
      </style>
      <div class="cpp-text-block-description">the gateway to our backing</div>
      <div class="cpp-text-block-header">
        climate performance<br />potential cpp
      </div>
      <div class="cpp-text-block">
        <div id="cpp-text-1" class="cpp-text-block-description cpp-hide">
          First, we quantitatively analyze the potential CO2e savings of a startup’s
          technology, including a life-cycle assessment.
        </div>
        <div id="cpp-text-2" class="cpp-text-block-description cpp-hide">
          Second, we take a qualitative assessment on environmental and social
          impact, utilizing the IRIS+ metrics.
        </div>
        <div id="cpp-text-3" class="cpp-text-block-description cpp-hide">
          Lastly, the technology needs to fit into our vision of a regenerative
          world, based on four pillars:<br />
          Renewable energy, Full material circularity, Regenerative systems, Climate
          & social equity
        </div>
      </div>
      <video
        id="cpp-video"
        playsinline
        muted
        preload="auto"
        poster="https://lh3.googleusercontent.com/u/0/drive-viewer/AAOQEOQ_3AafdWAjB80tWSTcwTttK_dRhkTqbqntDdo-TWIKCEtZ-BGnDV93uZ8gRMuFUm0ZFqd4WN2qG5ysiAPFIo7l7Y3K=w1661-h953"
      >
        <source
          type="video/mp4"
          src="https://drive.google.com/uc?id=1On40pTelPp4ZEBZI6LZghheTkpMznBsy"
          data-src="https://drive.google.com/uc?id=1On40pTelPp4ZEBZI6LZghheTkpMznBsy"
        />
      </video>
    `;
  }
}

window.customElements.define("video-slider", VideoSlider);
