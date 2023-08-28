'use strict';

let mediaData = {};
let videoVisibility = {};

const Dashboard = {

  renderTag: function(mediaEl, tag) {
    const template = document.getElementById('tag-template');
    const clone = template.content.cloneNode(true);
    const tagEl = clone.children[0];

    tagEl.innerText = tag;
    mediaEl.querySelector('.tags').append(tagEl);
  },

  renderTags: function(mediaEl, tags) {
    tags.forEach(function(tag) {
      Dashboard.renderTag(mediaEl, tag);
    });
  },

  renderMedia: function(media) {
    const template = document.getElementById('media-template');
    const clone = template.content.cloneNode(true);
    const el = clone.children[0];

    el.querySelector('.thumbnail').setAttribute('src', media.thumbnail.url);
    el.querySelector('.title').innerText = media.name;
    el.querySelector('.duration').innerText = Utils.formatTime(media.duration);
    el.querySelector('.count').innerText = '?';
    el.setAttribute('data-hashed-id', media.hashed_id);
    el.querySelector('.visibility-toggle').setAttribute('data-hashed-id', media.hashed_id);

    Dashboard.renderTags(el, ['tag-1', 'tag-2']);

    document.querySelector('.list--unstyled').appendChild(el);
  },

  openModal: function() {
    document.querySelector('.modal').classList.add('modal--open');
  },

  closeModal: function() {
    document.querySelector('.modal').classList.remove('modal--open');
  },

  addTag: function() {
    var el = document.createElement('li');
    el.querySelector('.tags').appendChild(el);
  }
};

(function() {
  document.addEventListener(
    'DOMContentLoaded',
    function() {
      axios.get('/api/videos')
      .then((response) => {
        mediaData = response.data.mediaData;
        console.log('Fetched media data:', mediaData);
        return axios.get('/api/videos/visibility');
      })
      .then((response) => {
        videoVisibility = response.data.videoVisibility;
        console.log('Fetched visibility data:', videoVisibility);
        mediaData.forEach(function(media) {
          Dashboard.renderMedia(media);
        });
        applyVisibilityClasses();
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    },
    { useCapture: false }
  );

  document.addEventListener(
    'click',
    function(event) {
      if (event && event.target.matches('.visibility-toggle')) {
        const toggleButton = event.target;
        const hashedId = event.target.dataset.hashedId;
        const currentVisibility = event.target.classList.contains('media--visible');

        axios.patch(`/api/videos/${hashedId}/visibility`, {
          visibility: !currentVisibility
        })
        .then((response) => {
          videoVisibility[hashedId] = !currentVisibility; 
          applyVisibilityClasses()
        })
        .catch((error) => {
          console.error('Error updating visibility:', error);
        });
      }

      if (event && event.target.matches('.tag-button')) {
        Dashboard.openModal();
      }

      if (event && event.target.matches('.modal__button--close')) {
        Dashboard.closeModal();
      }
    },
    { useCapture: true }
  );
})();

function applyVisibilityClasses() {
  const toggleButtons = document.querySelectorAll('.visibility-toggle');
  toggleButtons.forEach(function(toggleButton) {
    const hashedId = toggleButton.getAttribute('data-hashed-id');
    const visibleSVG = toggleButton.querySelector('.media--visible');
    const hiddenSVG = toggleButton.querySelector('.media--hidden');
    
    if (videoVisibility[hashedId]) {
      visibleSVG.style.display = 'block';
      hiddenSVG.style.display = 'none'; 
      toggleButton.classList.remove('media--hidden');
      toggleButton.classList.add('media--visible');
      console.log('adding visibility')
    } else {
      visibleSVG.style.display = 'none';
      hiddenSVG.style.display = 'block';
      toggleButton.classList.remove('media--visible');
      toggleButton.classList.add('media--hidden');
    }
  });
};
