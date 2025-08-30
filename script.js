// Popup functionality
document.addEventListener("DOMContentLoaded", function() {
  // Get modal elements
  const modal = document.getElementById('popupModal');
  const btn = document.getElementById('popupBtn');
  const span = document.getElementsByClassName('close')[0];

  // Open modal when button is clicked
  if (btn) {
    btn.onclick = function() {
      modal.style.display = 'block';
    }
  }

  // Close modal when X is clicked (for series modals)
  const closeButtons = document.querySelectorAll('.close');
  closeButtons.forEach(function(closeBtn) {
    closeBtn.onclick = function() {
      const modal = closeBtn.closest('.modal');
      if (modal) {
        modal.style.display = 'none';
        // Stop any playing audio when modal closes via X button
        stopCurrentAudio();
      }
    }
  });

  // Close modal when clicking outside of it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }

  // Close modal with Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
      modal.style.display = 'none';
    }
  });

  // Show the loading GIF when the document is loading (existing functionality)
  const loadingElement = document.getElementById('loading');
  if (loadingElement) {
    loadingElement.style.display = 'flex';
  }
});

// Hide the loading GIF when the window has finished loading (existing functionality)
window.onload = function() {
  const loadingElement = document.getElementById('loading');
  if (loadingElement) {
    loadingElement.style.display = 'none';
  }
};

// Soundfont Series Modal Functions
function openSeriesModal(seriesId) {
  const modal = document.getElementById(seriesId + '-modal');
  if (modal) {
    modal.style.display = 'block';
  }
}

function closeSeriesModal(seriesId) {
  const modal = document.getElementById(seriesId + '-modal');
  if (modal) {
    modal.style.display = 'none';
    // Stop any playing audio when modal closes
    stopCurrentAudio();
  }
}

// Close series modal when clicking outside
window.addEventListener('click', function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
    // Stop any playing audio when modal closes
    stopCurrentAudio();
  }
});

// Close series modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(function(modal) {
      if (modal.style.display === 'block') {
        modal.style.display = 'none';
        // Stop any playing audio when modal closes
        stopCurrentAudio();
      }
    });
  }
});

// Audio preview functionality
let currentAudio = null;
let currentPlayingButton = null;

// Sample audio URLs for each soundfont
const soundfontPreviews = {
  'zayeal-yamaha-c7': './Soundfonts/U.N. Owen (Zayeal Yamaha C7).mp3',
  'zyrox-keys-2': './Soundfonts/U.N. Owen (ZyroX Keys II).mp3',
  'zayeal-piano-1': './Soundfonts/U.N. Owen (Zayeal Piano).mp3',
  'lazeon-keys-2': './Soundfonts/U.N. Owen (Lazeon Keys II).mp3',
  'raverz-keys-1': './Soundfonts/U.N. Owen (Raverz Keys I).mp3'
};

function playPreview(soundfontId) {
  const button = event.target.closest('.preview-btn');

  // If clicking the same button that's playing, stop it
  if (currentPlayingButton === button && button.classList.contains('playing')) {
    stopCurrentAudio();
    return;
  }

  // Stop any currently playing audio
  if (currentAudio && !currentAudio.paused) {
    stopCurrentAudio();
  }

  // Play new audio
  const audioUrl = soundfontPreviews[soundfontId];
  if (audioUrl) {
    currentAudio = new Audio(audioUrl);
    currentPlayingButton = button;

    button.classList.add('playing');
    button.innerHTML = '<img src="https://cdn-icons-png.flaticon.com/512/61/61155.png" alt="Stop" class="play-icon">Stop';

    currentAudio.play().catch(function(error) {
      console.log('Audio playback failed:', error);
      resetButton(button);
      alert('Unable to play preview. Audio file may not be available.');
    });

    currentAudio.addEventListener('ended', function() {
      resetButton(button);
    });

    currentAudio.addEventListener('pause', function() {
      resetButton(button);
    });
  } else {
    alert('Preview not available for this soundfont.');
  }
}

function stopCurrentAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  if (currentPlayingButton) {
    resetButton(currentPlayingButton);
  }
}

function resetButton(button) {
  if (button) {
    button.classList.remove('playing');
    button.innerHTML = '<img src="https://cdn-icons-png.flaticon.com/512/727/727245.png" alt="Play" class="play-icon">Preview';
  }
  currentPlayingButton = null;
  currentAudio = null;
}