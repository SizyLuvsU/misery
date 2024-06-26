document.addEventListener('DOMContentLoaded', () => {
  const fetchProfile = async () => {
    const userId = '917455968013520966'; 
    const apiUrl = `https://api.lanyard.rest/v1/users/${userId}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      updateProfile(data.data);
    } catch (error) {
      console.error('Error fetching profile:', error);

      const errorElement = document.getElementById('error-message');
      if (errorElement) {
        errorElement.textContent = 'Failed to fetch profile data. Please try again later.';
      }
    }
  };

  const updateProfile = (profile) => {
    const usernameElement = document.getElementById('username');
    const avatarElement = document.getElementById('avatar');
    const spotifyElement = document.getElementById('spotify-info');
    const progressElement = document.getElementById('playbar-progress');
    const timestampElement = document.getElementById('playbar-timestamp');
    const activitiesSection = document.getElementById('activities-section');

    if (!profile) {
      console.error('Profile data is empty or undefined.');
      return;
    }

    if (usernameElement) {
      usernameElement.textContent = `${profile.discord_user.username}`;
    } else {
      console.error('Element with ID "username" not found.');
    }

    if (avatarElement) {
      avatarElement.src = `https://cdn.discordapp.com/avatars/${profile.discord_user.id}/${profile.discord_user.avatar}.png`;
      avatarElement.classList.remove('dnd', 'online', 'offline', 'idle', 'invisible');

      const discordStatus = profile.discord_status ? profile.discord_status.toLowerCase() : '';
      switch (discordStatus) {
        case 'dnd':
          avatarElement.classList.add('dnd');
          break;
        case 'online':
          avatarElement.classList.add('online');
          break;
        case 'offline':
          avatarElement.classList.add('offline');
          break;
        case 'idle':
          avatarElement.classList.add('idle');
          break;
        case 'invisible':
          avatarElement.classList.add('invisible');
          break;
        default:
          avatarElement.classList.add('offline'); 
          break;
      }
    } else {
      console.error('Element with ID "avatar" not found.');
    }

    if (profile.listening_to_spotify) {
      const spotify = profile.spotify;
      const albumArtElement = document.getElementById('album-image');
      if (albumArtElement) {
        albumArtElement.src = `${spotify.album_art_url}`;
        albumArtElement.alt = 'Album Art';
      } else {
        console.error('Element with ID "album-image" not found.');
      }

      const albumTitleElement = document.getElementById('album-title');
      if (albumTitleElement) {
        albumTitleElement.textContent = spotify.song;
      } else {
        console.error('Element with ID "album-title" not found.');
      }

      const albumArtistElement = document.getElementById('album-artist');
      if (albumArtistElement) {
        albumArtistElement.textContent = `by ${spotify.artist}`;
      } else {
        console.error('Element with ID "album-artist" not found.');
      }

      const albumSongElement = document.getElementById('album-song');
      if (albumSongElement) {
        albumSongElement.textContent = `on ${spotify.album}`;
      } else {
        console.error('Element with ID "album-song" not found.');
      }

      if (progressElement && timestampElement) {
        const now = Date.now();
        const startTime = spotify.timestamps.start;
        const endTime = spotify.timestamps.end;
        const totalTime = endTime - startTime;
        const elapsedTime = now - startTime;
        const progressPercent = (elapsedTime / totalTime) * 100;

        progressElement.style.width = `${progressPercent}%`;

        const minutes = Math.floor(elapsedTime / 60000);
        const seconds = Math.floor((elapsedTime % 60000) / 1000);
        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        timestampElement.textContent = formattedTime;
      } else {
        console.error('Element with ID "playbar-progress" or "playbar-timestamp" not found.');
      }
    } else {
      if (spotifyElement) {
        spotifyElement.innerHTML = '';
      } else {
        console.error('Element with ID "spotify-info" not found.');
      }
    }

    if (activitiesSection) {
      activitiesSection.innerHTML = '';

      if (profile.activities && profile.activities.length > 0) {
        profile.activities.forEach(activity => {
          if (activity.type === 0) { // Only consider rich presence activities (type 0)
            const activityElement = document.createElement('div');
            activityElement.classList.add('activity');

            const activityArt = document.createElement('div');
            activityArt.classList.add('activity-art');
            const largeImageId = activity.assets ? activity.assets.large_image : null;
            if (largeImageId) {
              const activityImage = document.createElement('img');
              activityImage.src = `https://cdn.discordapp.com/app-assets/${activity.application_id}/${largeImageId}.png`;
              activityImage.alt = 'Activity Image';
              activityArt.appendChild(activityImage);
            }
            activityElement.appendChild(activityArt);

            const activityInfo = document.createElement('div');
            activityInfo.classList.add('activity-info');
            activityElement.appendChild(activityInfo);

            const activityTitle = document.createElement('p');
            activityTitle.classList.add('activity-title');
            activityTitle.textContent = `${activity.name}`;
            activityInfo.appendChild(activityTitle);

            const activityState = document.createElement('p');
            activityState.classList.add('activity-state');
            activityState.textContent = `${activity.state || 'N/A'}`;
            activityInfo.appendChild(activityState);

            const activityDetails = document.createElement('p');
            activityDetails.classList.add('activity-details');
            activityDetails.textContent = `${activity.details || 'N/A'}`;
            activityInfo.appendChild(activityDetails);

            activitiesSection.appendChild(activityElement);
          }
        });
      } else {
        const noActivityElement = document.createElement('p');
        noActivityElement.textContent = ' ';
        activitiesSection.appendChild(noActivityElement);
      }
    } else {
      console.error('Element with ID "activities-section" not found.');
    }
  };

  fetchProfile();
  setInterval(fetchProfile, 2000); 
});
