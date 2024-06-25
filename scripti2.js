document.addEventListener('DOMContentLoaded', function() {
  const startContainer = document.getElementById('startContainer');
  const typewriterText = document.getElementById('typewriter-text');
  const backgroundVideo = document.getElementById('background-video');
  const backgroundAudio = document.getElementById('background-audio');
  const newBackgroundAudio = document.getElementById('newBackgroundAudio'); // New audio element
  const body = document.body;

  typewriterText.style.display = 'none';

  startContainer.addEventListener('click', function() {
      startContainer.style.display = 'none';
      typewriterText.style.display = 'block';
      startAnimations();
  });

  function startAnimations() {
      const lines = [
        "Ｗｈｏ ａｍ Ｉ? Ａｍ Ｉ? Ｗｈｏ ａｍ Ｉ? Ｗｈｏ ａｍ Ｉ? Ｄｏ Ｉ ｅｘｉｓｔ? Ｄｏ ｙｏｕ?",
          "Ｗｈｏ ａｍ Ｉ? Ａｍ Ｉ? Ｗｈｏ ａｍ Ｉ? Ｗｈｏ ａｍ Ｉ? Ｄｏ Ｉ ｅｘｉｓｔ? Ｄｏ ｙｏｕ?",
          "Ｗｈｏ ａｍ Ｉ? Ａｍ Ｉ? Ｗｈｏ ａｍ Ｉ? Ｗｈｏ ａｍ Ｉ? Ｄｏ Ｉ ｅｘｉｓｔ? Ｄｏ ｙｏｕ?",
          "Ｗｈｏ ａｍ Ｉ? Ａｍ Ｉ? Ｗｈｏ ａｍ Ｉ? Ｗｈｏ ａｍ Ｉ? Ｄｏ Ｉ ｅｘｉｓｔ? Ｄｏ ｙｏｕ?",
          "Ｗｈｏ ａｍ Ｉ? Ａｍ Ｉ? Ｗｈｏ ａｍ Ｉ? Ｗｈｏ ａｍ Ｉ? Ｄｏ Ｉ ｅｘｉｓｔ? Ｄｏ ｙｏｕ?",
          "Ｗｈｏ ａｍ Ｉ? Ａｍ Ｉ? Ｗｈｏ ａｍ Ｉ? Ｗｈｏ ａｍ Ｉ? Ｄｏ Ｉ ｅｘｉｓｔ? Ｄｏ ｙｏｕ?",
          "Ｗｈｏ ａｍ Ｉ? Ａｍ Ｉ? Ｗｈｏ ａｍ Ｉ? Ｗｈｏ ａｍ Ｉ? Ｄｏ Ｉ ｅｘｉｓｔ? Ｄｏ ｙｏｕ?",
          "Ｗｈｏ ａｍ Ｉ? Ａｍ Ｉ? Ｗｈｏ ａｍ Ｉ? Ｗｈｏ ａｍ Ｉ? Ｄｏ Ｉ ｅｘｉｓｔ? Ｄｏ ｙｏｕ?",
          "Ｗｈｏ ａｍ Ｉ? Ａｍ Ｉ? Ｗｈｏ ａｍ Ｉ? Ｗｈｏ ａｍ Ｉ? Ｄｏ Ｉ ｅｘｉｓｔ? Ｄｏ ｙｏｕ?",
          "Ｗｈｏ ａｍ Ｉ? Ａｍ Ｉ? Ｗｈｏ ａｍ Ｉ? Ｗｈｏ ａｍ Ｉ? Ｄｏ Ｉ ｅｘｉｓｔ? Ｄｏ ｙｏｕ?",
          "Ｗｈｏ ａｍ Ｉ? Ａｍ Ｉ? Ｗｈｏ ａｍ Ｉ? Ｗｈｏ ａｍ Ｉ? Ｄｏ Ｉ ｅｘｉｓｔ? Ｄｏ ｙｏｕ?",
          "Ｗｈｏ ａｍ Ｉ? Ａｍ Ｉ? Ｗｈｏ ａｍ Ｉ? Ｗｈｏ ａｍ Ｉ? Ｄｏ Ｉ ｅｘｉｓｔ? Ｄｏ ｙｏｕ?"
      ];
      let lineIndex = 0;
      let charIndex = 0;

      function typeWriter() {
          if (lineIndex < lines.length) {
              if (charIndex < lines[lineIndex].length) {
                  typewriterText.innerHTML += lines[lineIndex].charAt(charIndex);
                  charIndex++;
                  setTimeout(typeWriter, 30);
              } else {
                  typewriterText.innerHTML += "<br>";
                  lineIndex++;
                  charIndex = 0;
                  setTimeout(typeWriter, 100);
              }
          } else {
              typewriterText.classList.add('glitch');
              body.classList.add('shake');
              startBloodFill();
              // Stop current background audio
              backgroundAudio.pause();
              backgroundAudio.currentTime = 0;
              // Start new background audio
              newBackgroundAudio.play();
          }
      }

      typeWriter();
  }

  backgroundVideo.play();
  backgroundAudio.play();
});

function startBloodFill() {
  const bloodFill = document.createElement('div');
  bloodFill.className = 'blood-fill';
  document.body.appendChild(bloodFill);
}
