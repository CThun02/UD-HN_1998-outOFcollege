export function closeFrame(coverFrame, animationFrame) {
  document.getElementById(animationFrame).classList.remove("displayFrame");
  document.getElementById(animationFrame).classList.add("hideFrame");
  setTimeout(function () {
    document.getElementById(coverFrame).classList.add("d-none");
  }, 500);
}

export function displayFrame(coverFrame, animationFrame) {
  document.getElementById(coverFrame).classList.remove("d-none");
  document.getElementById(animationFrame).classList.add("displayFrame");
  document.getElementById(animationFrame).classList.remove("hideFrame");
}
