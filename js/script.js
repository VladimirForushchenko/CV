"use strict"

window.addEventListener('load', windowLoad);

function windowLoad() {
	document.addEventListener('click', documentActions);
}

function documentActions(e) {
	const targetElement = e.target;

	// Scroll To...
	if (targetElement.hasAttribute('data-goto')) {
		const gotoElement = document.querySelector(`${targetElement.dataset.goto}`);
		const headerHeight = document.querySelector(`.header`).offsetHeight;

		if (gotoElement) {
			window.scrollTo({
				top: gotoElement.offsetTop - headerHeight,
				behavior: "smooth"
			});
		}
		e.preventDefault();
	}

	// Works filter ========================================

	if (targetElement.classList.contains('items-works__type') && !targetElement.classList.contains('active')) {
		const activeElement = document.querySelector(`.items-works__type.active`);
		const elements = document.querySelectorAll(`.items-works__item`);
		const elementType = targetElement.dataset.workType;

		activeElement.classList.remove('active');
		targetElement.classList.add('active');

		elements.forEach(element => {
			!elementType || element.dataset.workType === elementType ?
				element.hidden = false : element.hidden = true;
		});
	}
}

// Send Request =======================================

let sendRequest = document.querySelector('#send-message');
let inptName = document.querySelector('.input-name');
let inptMail = document.querySelector('.input-mail');
let inptMessage = document.querySelector('.input-message');

sendRequest.addEventListener('click', function (e) {
  saveContact();
})

function saveContact() {
  let userName = inptName.value;
  let userMail = inptMail.value;
  let userMessage = inptMessage.value;

  localStorage.setItem('name', userName);
  localStorage.setItem('e-mail', userMail);
  localStorage.setItem('message', userMessage);
}

// Form validation =======================================

const form = document.getElementById('form');
form.addEventListener('submit', formSend);

async function formSend(e) {
	e.preventDefault();

	let error = formValidate(form);

	if (error === 0) {
		form.classList.add('_sending');

		setTimeout( () => {
				form.classList.remove('_sending');
				alert("Your form has been submitted successfully");
			}, 4800);
			form.reset();
	} else {
		alert("Please fill in the required fields");
	}
}

	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let i = 0; i < formReq.length; i++) {
			const input = formReq[i];
			formRemoveError(input);

			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
				formAddError(input);
				error++;
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}

	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}


// Download CV =======================================

let downloadCV = document.querySelector('#download');
downloadCV.addEventListener('click', downloadFunc);

function downloadFunc(){
	var anchor = document.createElement('a');
	anchor.setAttribute('href','./SV_Volodymyr_Forushchenko.docx');
	anchor.setAttribute('download','');
	document.body.appendChild(anchor);
	anchor.click();
	anchor.parentNode.removeChild(anchor); 
}


