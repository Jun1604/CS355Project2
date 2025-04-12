const avatarChoices = document.querySelectorAll('.choice');
const profilePic = document.querySelector('.profileChange');
const popup = document.querySelector('.picturesDropDown');
let radio = document.getElementsByName("picRadio")

for(let i =0; i<radio.length;i++){
  radio[i].addEventListener("input",()=> {document.querySelector('input[type="submit"]').click();});
}

profilePic.addEventListener('click', () => {
    popup.classList.toggle('show');
  });
  
document.addEventListener('click', (e) => {
if (!popup.contains(e.target) && !profilePic.contains(e.target)) {
    popup.classList.remove('show');
}
});

avatarChoices.forEach(choice => {
   choice.addEventListener('click', ()=>{
        popup.classList.remove('show');
    })
});

function submitBio(){
  document.getElementById("change_bio").submit();
}

function submitUser(){
  document.getElementById("change_user").submit();
}

function submitEmail(){
  document.getElementById("change_email").submit();
}

function submitPassword(){
  document.getElementById("change_password").submit();
}