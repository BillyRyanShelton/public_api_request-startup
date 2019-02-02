// The following file is a Javascript file which manages pulls employee
// data from an API and appends it to the corresponding index.html file

//An array to hold the employee modal cards is created
let employeeModalCards = [];

//An array to hold the employee gallery cards is created
let employeeGalleryCards = [];

//An array to hold country postal abbreviations where english is the primary language
let speakEnglish = ['AU', 'NZ', 'UK', 'US', 'UM', 'AG', 'BS', 'BB', 'BZ', 'CA', 'CK',
					'DM', 'GD', 'GH', 'GY', 'JM', 'LR', 'KN', 'LC', 'VC', 'TT'];

//This function shows the modal card based on its index in the employeeGalleryCards array
function showModelCard(i){
	let currentEmployeeModal = employeeModalCards[i];
	document.getElementsByTagName('BODY')[0].appendChild(currentEmployeeModal);
}

//This function hides the modal card based on its index in the employeeGalleryCards array
function hideModelCard(i){
	let currentEmployeeModal = employeeModalCards[i];
	if(currentEmployeeModal.parentNode != null) {
		currentEmployeeModal.parentNode.removeChild(currentEmployeeModal);
	}
}

//This functon showsthe modal card  and handles the left, right and x buttons when clicked
function modalCardUI(i) {
		showModelCard(i);

		//When the modal X button is clicked the employee modal is hidden from display
		document.getElementById('modal-close-btn').addEventListener('click', ()=>{
			hideModelCard(i);
		});

		//When the right arrow is clicked in the modal card
		document.getElementById('modal-next').addEventListener('click', ()=>{
			//The current employee modal is hidden
			hideModelCard(i);
			//if the next employee index is in range it is displayed
			if(i === 11){
				return;
			} //if the next employee index is out of range it is not displayed
			else{
				modalCardUI(i+1);
			}
		});

		//When the left arrow is clicked in the modal card
		document.getElementById('modal-prev').addEventListener('click', ()=>{
			//The current employee modal is hidden
			hideModelCard(i);
			//if the next employee index is in range it is displayed
			if(i === 0){
				return;
			} //if the next employee index is out of range it is not displayed
			else{
				modalCardUI(i-1);
			}
		});
}

//This function creates an HTML element with the employee gallery card data and appends it to the DOM
function showEmployeeGalleryCard(employee, employeeGalleryCards, i){
	let galleryHTML = '<div class="card-img-container">';
	galleryHTML += '<img class="card-img" src="'+ employee.results[0].picture.large + '" alt="profile picture">';
	galleryHTML += '</div>';
	galleryHTML += '<div class="card-info-container">';
	galleryHTML += '<h3 id="name" class="card-name cap">' + employee.results[0].name.first + ' '+ employee.results[0].name.last + '</h3>';
	galleryHTML += '<p class="card-text">' + employee.results[0].email + '</p>';
	galleryHTML += '<p class="card-text cap">' + employee.results[0].location.city +', ' + employee.results[0].location.state + '</p>';
	galleryHTML += '</div>';
	let userHTML = document.createElement('div');
	userHTML.innerHTML = galleryHTML;
	userHTML.className = 'card';
	employeeGalleryCards[i] = userHTML;
	console.log(employeeGalleryCards[i]);
	document.getElementById('gallery').appendChild(userHTML);
}

//This function creates an HTML element with the employee modal card data
function createEmployeeModalCard(employee, employeeModalCards, i){
	let userModalHTML = document.createElement('div');
	userModalHTML.className = 'modal-container';
	let modalHTML = '<div class="modal">';
	modalHTML += '<button type="button" id="modal-prev" class="modal-prev btn"><strong><</strong></button>';
	modalHTML += '<button type="button" id="modal-next" class="modal-next btn"><strong>></strong></button>';
	modalHTML += '<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>';
	modalHTML += '<div class="modal-info-container">';
	modalHTML += '<img class="modal-img" src="' + employee.results[0].picture.large + '" alt="profile picture">';
	modalHTML += '<h3 id="name" class="modal-name cap">' + employee.results[0].name.first + ' ' + employee.results[0].name.last + '</h3>';
	modalHTML += '<p class="modal-text">' + employee.results[0].email + '</p>';
	modalHTML += '<p class="modal-text cap">' + employee.results[0].location.city + '</p>';
	modalHTML += '<hr>';
	modalHTML += '<p class="modal-text">' + employee.results[0].phone + '</p>';
	modalHTML += '<p class="modal-text cap">' + employee.results[0].location.street + ', ' + employee.results[0].location.city + ', ' + employee.results[0].location.state + ', ' + employee.results[0].location.postcode + '</p>'; 
	modalHTML += '<p class="modal-text">Birthday: ' + employee.results[0].dob.date.slice(5,7).toString() + '/' + employee.results[0].dob.date.slice(8,10).toString() + '/' + employee.results[0].dob.date.slice(2,4).toString() + '</p>';
	modalHTML += '</div>';
	modalHTML += '</div>';
	userModalHTML.innerHTML = modalHTML;
	//The employee modal card is added to the employee modal array
	employeeModalCards[i] = userModalHTML;
	console.log(employeeModalCards[i]);
}

//This function exectues all 4 stages of each XMLHTTP employee data request
function makeXMLHTTPUserRequest(i){
	//An XMLHttpRequest object is created to retrieve an employee's info
	var galleryXHR = new XMLHttpRequest();

	//When the response is ready, the employee image, name, location and email are appended to the DOM with this callback function
	galleryXHR.onreadystatechange = function() {
		if(galleryXHR.readyState === XMLHttpRequest.DONE) {
			//The JSON returned from the server is parsed
			let employee = JSON.parse(this.responseText);
			//speakEnglish.forEach()

			if(speakEnglish.some((nationality)=>{ return employee.results[0].nat === nationality;}))  
			{
				//The employee modal card is created and added to the employee modal array
				createEmployeeModalCard(employee, employeeModalCards, i);

				//The employee gallery card is created, added to the employee gallery array and appended to the DOM
				showEmployeeGalleryCard(employee, employeeGalleryCards, i);
			
				//The employee modal card is opened when it is clicked
				employeeGalleryCards[i].addEventListener('click',()=>{
					modalCardUI(i);
				});
			}
			else{
				makeXMLHTTPUserRequest(i);
				return;
			}
		} 
	}

	//A request is opened for the current employee info
	galleryXHR.open('GET', 'https://randomuser.me/api/?format=json', true);

	//The request is sent to the server
	galleryXHR.send();
}

//The number of employee data is set
let numEmployees = 12;

//The following for loop determines how many employees to display on the page 
//Note:  The reason there is an makeXMLHPUserRequest function is
//so the employee data can be retrieved asyncronously from the API
for(let i = 0; i < numEmployees; i++) {	
	makeXMLHTTPUserRequest(i);
}



