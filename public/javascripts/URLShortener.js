const URLFormBtn = document.querySelector('#url-shortener-form-btn')
const URLForm = document.querySelector('#url-shortener-form')
const copyBtn = document.querySelector('#btn-copy')

function OnURLFormSubmitted(event) {
  if(!URLForm.checkValidity()) {
    console.log('URL type error!')
    const resultMessage = document.querySelector('.result-message')
    console.log(resultMessage)
    event.preventDefault()
    event.stopPropagation()
    resultMessage.remove()
  } else {
    console.log('URL form submitted!')
  }
}
function OnURLFormBtnClicked(event) {
  console.log('submit button clicked! ', event.target)
  URLForm.classList.add('was-validated')
}

function OncopyBtnClicked() {
  const URLMessage = document.querySelector('#url-message').innerText
  navigator.clipboard.writeText(URLMessage)
    .then(() => console.log('Async: Copying to clipboard was successful!: ', URLMessage))
    .catch(err => console.error('Async: Could not copy text: ', err))
}

URLForm.addEventListener('submit', OnURLFormSubmitted)
URLFormBtn.addEventListener('click', OnURLFormBtnClicked )
copyBtn.addEventListener('click', OncopyBtnClicked)