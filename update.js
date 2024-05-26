// Fetch user data from Lanyard API
fetch('https://api.lanyard.rest/v1/users/917455968013520966')
    .then(response => response.json())
    .then(data => {
        // Update userData with the fetched data
        userData = data;
        // Call function to update HTML with the new userData
        updateHTML(userData);
    })
    .catch(error => console.error('Error fetching user data:', error));

// Function to update HTML with userData
function updateHTML(userData) {
    const profileBox = document.getElementById('profileBox');

    // Extract relevant information from userData
    const username = userData.data.discord_user.username;
    const avatar = `https://cdn.discordapp.com/avatars/${userData.data.discord_user.id}/${userData.data.discord_user.avatar}.png`;
    const status = userData.data.discord_status;
    let game = 'Unknown';
    let spotify = '';

    // Find the first activity that is not a custom status
    const activity = userData.data.activities.find(activity => activity.type !== 4);
    if (activity) {
        game = activity.name;
        if (activity.type === 1 && userData.data.listening_to_spotify) {
            // If listening to Spotify, set spotify object
            spotify = {
                name: activity.spotify.track,
                image: activity.spotify.album_art_url
            };
        }
    }

    // Populate profile box with updated data
    profileBox.querySelector('.profile-pic').src = avatar;
    profileBox.querySelector('.username').textContent = username;
    profileBox.querySelector('.status').textContent = `Status: ${status}`;
    profileBox.querySelector('.game').textContent = `Playing: ${game}`;

    // Display Spotify information if available
    if (spotify) {
        profileBox.querySelector('.spotify-name').textContent = `Spotify: ${spotify.name}`;
        profileBox.querySelector('.spotify-image').src = spotify.image;
    } else {
        profileBox.querySelector('.spotify-name').textContent = '';
        profileBox.querySelector('.spotify-image').src = '';
    }
}
