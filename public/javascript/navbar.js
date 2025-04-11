const dropdownMenu = document.querySelector('.dropdownMenu');
const profileButton = document.querySelector('.profile-button');
const greetText = document.getElementById('greet');


profileButton.addEventListener('click', () => {
  fetchUser().then(user => {
    greetText.innerText = "Hello " + user + "!";
    dropdownMenu.classList.toggle('show');
  });
});

document.addEventListener('click', (e) => {
  if (!dropdownMenu.contains(e.target) && !profileButton.contains(e.target)) {
    dropdownMenu.classList.remove('show');
  }
});

function fetchUser() {
  return fetch(`/getUser`)
    .then(res => res.text())
    .then(data => {
      return data;
    });
}