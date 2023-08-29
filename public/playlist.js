'use strict';

let mediaData = {};
let videoVisibility = {};

const Playlist = {

  renderMedia: function(media, isVisible) {
    const template = document.getElementById('media-template');
    const clone = template.content.cloneNode(true);
    const el = clone.children[0];

    el.querySelector('.thumbnail').setAttribute('src', media.thumbnail.url);
    el.querySelector('.title').innerText = media.name;
    el.querySelector('.duration').innerText = Utils.formatTime(media.duration);
    el.querySelector('.media-content').setAttribute(
      'href',
      '#wistia_' + media.hashed_id
    );

    if (!isVisible) {
      el.classList.add('media--hidden');
    }

    document.getElementById('medias').appendChild(el);
  }
};

window._wq = window._wq || [];
_wq.push({
  id: "8muu63qeqk",
  options: {
    autoPlay: true,
    playlistLoop: false,
    silentAutoPlay: true,
  },

  onReady: function (video) {
    video.bind("play", function () {
      var playAlertElem = document.createElement("div");
      playAlertElem.style.padding = "20px";
      playAlertElem.innerHTML = `You played the video! Its name is ${video.name()}.`;
      document.body.appendChild(playAlertElem);
      return video.unbind;
    });

    video.bind("end", () => {
      console.log('bound to end')
      const playerContainer = document.querySelector('.wistia_embed');
      let countdownElement = document.createElement("div");
      countdownElement.style.padding = "20px";
      countdownElement.style.top = "20px";
      countdownElement.style.right = "20px";
      countdownElement.style.position = "absolute";
      countdownElement.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      countdownElement.style.borderRadius = "8px";
      countdownElement.style.color = "#fff";
      countdownElement.style.fontSize = "24px";
      countdownElement.style.textAlign = "center";
      var countdownValue = 5;

      playerContainer.appendChild(countdownElement);
      countdownElement.innerHTML = countdownValue;
      updateCountdown();

      function updateCountdown() {
        countdownElement.innerHTML = countdownValue;
        countdownValue--;

        console.log('updating countdown')

        if (countdownValue >= 0) {
          setTimeout(updateCountdown, 1000);
        }
      }
    });    
  }
});


(function() {
  document.addEventListener(
    'DOMContentLoaded',
    function() {
      axios.get('/api/videos')
      .then((response) => {
        mediaData = response.data.mediaData;
        return axios.get('/api/videos/visibility');
      })
      .then((response) => {
        videoVisibility = response.data.videoVisibility;

        if (!mediaData) {
          return;
        }

        const visibleVideos = mediaData.filter(media => videoVisibility[media.hashed_id]);

        if (visibleVideos.length === 0) {
          console.log('No visible videos.');
          return;
        }

        const firstVisibleVideo = visibleVideos[0];

        Playlist.renderMedia(firstVisibleVideo, true);
        visibleVideos.slice(1).forEach(video => {
          Playlist.renderMedia(video, false);
        });

        document
          .querySelector('.wistia_embed')
          .classList.add('wistia_async_' + visibleVideos[0].hashed_id);
      })
      .catch(function(error) {
        console.error('Error fetching playlist data:', error);
      });
    },
    false
  );
})();
