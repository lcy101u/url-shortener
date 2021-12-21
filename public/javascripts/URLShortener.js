const URLFormBtn = document.querySelector('#url-shortener-form-btn')
const URLForm = document.querySelector('#url-shortener-form')

function OnURLFormSubmitted(event) {
  console.log('URL Form submit!')
}
function OnURLFormBtnClicked(event) {
  URLForm.classList.add('was-validated')
}

URLForm.addEventListener('submit', OnURLFormSubmitted)
URLFormBtn.addEventListener('click', OnURLFormBtnClicked )