// JavaScript for Lanyard API
const profileBox = document.getElementById('profileBox');

// Fetch Discord user presence
const discordUserID = '917455968013520966'; // Replace with your Discord user ID
const apiUrl = `https://api.lanyard.rest/v1/users/${discordUserID}`;

const updatePresence = () => {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the data from the API response
            const presence = data?.presence;
            if (presence === 'online') {
                const username = data?.discord_user?.username || 'Unknown';
                const avatar = data?.discord_user?.avatar ? `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png` : 'youtube_icon.png';
                const status = presence === 'online' ? 'Online' : 'Offline';
                const game = data?.activities[0]?.name || 'Unknown';
                const listeningToSpotify = data?.listening_to_spotify;
                
                const profileHTML = `
                    <img src="${avatar}" alt="Profile Picture" class="profile-pic">
                    <h2 class="username">${username}</h2>
                    <p class="status">🔵 ${status}</p>
                    <p class="game">🎮 ${game}</p>
                    ${listeningToSpotify ? `<p class="spotify">🎵 Listening to ${listeningToSpotify.song} by ${listeningToSpotify.artist}</p>` : ''}
                    <div class="profile-links">
                        <a href="https://steamcommunity.com/id/Fall1337"><img src="Steam_icon.png" alt="Steam"></a>
                        <a href="https://www.youtube.com/channel/UC0m17-kJT30gx_T0KRA6fPQ"><img src="youtube_icon.png" alt="YouTube"></a>
                    </div>`;
                profileBox.innerHTML = profileHTML;
            } else if (presence === 'offline') {
                profileBox.innerHTML = '<p class="status">⚫ Offline</p>';
            }
        })
        .catch(error => console.error('Error fetching user presence:', error));
};

updatePresence(); // Initial update
setInterval(updatePresence, 60000); // Update presence every minute
