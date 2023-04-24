class VideoSlider extends HTMLElement {
  videoEle = null;
  playbackConst = 900;
  maxScroll = 0;
  scrollTop = 0;
  initialY = 0;

  /* Run only the last event on a series of triggered events */
  timeout = undefined;
  handleSeries = (event) => {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.handleScrollTop(event), 6000);
  };

  connectedCallback() {
    this.render();
    this.videoEle = this.querySelector("#cpp-video");
    const wrapper = document.getElementById("cpp-slider-wrapper");

    this.videoEle.addEventListener("loadedmetadata", this.loadMetaData);

    wrapper.addEventListener(
      "touchstart",
      ({ touches }) => (this.initialY = touches[0].clientY)
    );
    wrapper.addEventListener("touchend", this.handleSeries);
    wrapper.addEventListener("wheel", this.handleSeries);
    window.requestAnimationFrame(this.handleScroll);
  }

  loadMetaData = () => {
    const cpp_block = document.getElementById("cpp-slider");
    this.maxScroll = Math.floor(this.videoEle.duration) * this.playbackConst;
    cpp_block.style.height = this.maxScroll + "px";
  };

  handleScrollTop = (e) => {
    if (!e || !e.type) return;
    const movedHeight =
      e.type.indexOf("touchend") !== -1
        ? (this.initialY - e.changedTouches[0].clientY)
        : e.deltaY;
    const scrollValue = this.scrollTop + movedHeight;
    if (scrollValue < this.maxScroll) {
      this.scrollTop = scrollValue;
    }
    if (scrollValue < 1) {
      this.scrollTop = 0;
    }
  };

  handleScroll = () => {
    this.videoEle.currentTime = this.scrollTop / this.playbackConst;
    this.toggleText(this.scrollTop / this.playbackConst);

    window.requestAnimationFrame(this.handleScroll.bind(this));
  };

  toggleText(val) {
    const cpp_text1 = this.querySelector("#cpp-text-1"),
      cpp_text2 = this.querySelector("#cpp-text-2"),
      cpp_text3 = this.querySelector("#cpp-text-3");

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

  render() {
    this.innerHTML = `
      <style>
        #cpp-video {
          height: 65%;
          display: block;
          margin: auto;
          max-width: 100%;
        }
        .cpp-text-block {
          padding: 0 1em;
          text-align: center;
          color: #fff;
          margin: auto;
          width: auto!important;
          max-width: 1000px;
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
