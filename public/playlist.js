'use strict';

let mediaData = {};
let videoVisibility = {};
let currentVideoIndex = 0;
let visibleVideos = [];
let playlistLinksContainer = {};

const Playlist = {
  renderMedia: function(media, isPlaying = false) {
    const template = document.getElementById('media-template');
    const clone = template.content.cloneNode(true);
    const el = clone.children[0];

    el.querySelector('.thumbnail').setAttribute('src', media.thumbnail.url);
    el.querySelector('.title').innerText = media.name;
    el.querySelector('.duration').innerText = Utils.formatTime(media.duration);
    el.querySelector('.media-content').setAttribute('href', '#wistia_' + media.hashed_id);

    if (isPlaying) {
      el.classList.add('media--playing');
      const playingText = document.createElement('span');
      playingText.classList.add('playing-text');
      playingText.innerText = 'Playing';
      el.querySelector('.media-content').appendChild(playingText);
    }

    document.getElementById('medias').appendChild(el);
  }
};

window._wq = window._wq || [];


(function() {
  document.addEventListener(
    'DOMContentLoaded',
    function() {
      axios
        .get('/api/videos')
        .then((response) => {
          mediaData = response.data.mediaData;
          return axios.get('/api/videos/visibility');
        })
        .then((response) => {
          videoVisibility = response.data.videoVisibility;

          visibleVideos = mediaData.filter(media => videoVisibility[media.hashed_id]);

          if (visibleVideos.length === 0) {
            console.log('No visible videos.');
            return;
          }

          const firstVisibleVideo = visibleVideos[0];

          Playlist.renderMedia(firstVisibleVideo, true);
          visibleVideos.slice(1).forEach(video => {
            Playlist.renderMedia(video, false);
          });

          document.querySelector('.wistia_embed').classList
            .add('wistia_async_' + firstVisibleVideo.hashed_id);

          _wq.push({
            id: "_all",
            options: {
              playlistLoop: false,
              silentAutoPlay: true,
            },
            onReady: function(video) {
              let currentVideoId = firstVisibleVideo.hashed_id;
              let currentPlayingElement = null;
              video.bind('play', function() {
                currentVideoId = visibleVideos[currentVideoIndex].hashed_id; 
                currentPlayingElement = Array.from(document.querySelectorAll('a.media-content')).find(
                  el => el.getAttribute('href').endsWith(currentVideoId)
                );

                if (currentPlayingElement) {
                  currentPlayingElement.classList.add('media--playing');
                  const playingText = document.createElement('span');
                  console.log('trying to set playing text', currentPlayingElement);
                  playingText.classList.add('playing-text');
                  playingText.innerText = 'Playing';
                  currentPlayingElement.querySelector('.media-content').appendChild(playingText);
                }
              });

              video.bind('end', () => {
                currentPlayingElement = Array.from(document.querySelectorAll('.media-content')).find(
                  el => el.getAttribute('href') === '#wistia_' + currentVideoId
                );
                const playingText = currentPlayingElement.querySelector('.playing-text');
                if (playingText) {
                  playingText.remove();
                }
                currentPlayingElement.classList.remove('media--playing');

                function startCountdown(nextVideoId) {
                  let countdownValue = 5;
                  const countdownElement = document.createElement('div');
                  countdownElement.classList.add('countdown');
                
                  const playerContainer = document.querySelector('.wistia_embed');
                  playerContainer.appendChild(countdownElement);
                
                  function updateCountdown() {
                    countdownElement.innerHTML = countdownValue;
                    countdownValue--;
                  
                    if (countdownValue >= 0) {
                      setTimeout(updateCountdown, 1000);
                    } else {
                      countdownElement.remove();
                      currentVideoIndex++;
                      if (currentVideoIndex < visibleVideos.length) {
                        nextVideoId = visibleVideos[currentVideoIndex].hashed_id
                        currentPlayingElement.classList.add('media--played');
                        document.getElementById('medias').appendChild(currentPlayingElement);
                        nextVideoId = visibleVideos[currentVideoIndex].hashed_id;
                        video.replaceWith(nextVideoId);
                        video.unbind();
                      }
                    }
                  }
                  updateCountdown();
                }
                startCountdown(currentVideoId);
              });
            },
          });
        })
        .catch(function(error) {
          console.error('Error fetching playlist data:', error);
        });
    },
    false
  );
})();