'use strict';

let mediaData = {};
let videoVisibility = {};

const Playlist = {

  renderMedia: function(media, isVisible) {
    var template = document.getElementById('media-template');
    var clone = template.content.cloneNode(true);
    var el = clone.children[0];

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
      ;
    },
    false
  );
})();
