const body = document.querySelector("body");
console.log("ca marecje")
body.addEventListener("click", startOrStopSound);

function startOrStopSound() {
  const myAudioPlayer = document.querySelector("#audioPlayer");

  if (myAudioPlayer.paused) myAudioPlayer.play();
  else myAudioPlayer.pause() ;
}
