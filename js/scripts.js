
//The number of employee data is set
let numEmployees = 12;

let employeeJSONdata = [];

//This function creates an HTML element with the employee gallery card data and appends it to the DOM
function showEmployeeGalleryCard(i){
	let galleryHTML = '<div id="class="card-img-container">';
	galleryHTML += '<img class="card-img" src="'+ employeeJSONdata[i].picture.large + '" alt="profile picture">';
	galleryHTML += '</div>';
	galleryHTML += '<div class="card-info-container">';
	galleryHTML += '<h3 id=' + employeeJSONdata[i].name.first + 'class="card-name cap">' + employeeJSONdata[i].name.first + ' '+ employeeJSONdata[i].name.last + '</h3>';
	galleryHTML += '<p class="card-text">' + employeeJSONdata[i].email + '</p>';
	galleryHTML += '<p class="card-text cap">' + employeeJSONdata[i].location.city +', ' + employeeJSONdata[i].location.state + '</p>';
	galleryHTML += '</div>';
	let userHTML = document.createElement('div');
	userHTML.innerHTML = galleryHTML;
	userHTML.className = 'card';
	userHTML.id = employeeJSONdata[i].email;
	document.getElementById('gallery').appendChild(userHTML);
}





//This function creates an HTML element with the employee modal card data
function createEmployeeModalCard(i){
	let userModalHTML = document.createElement('div');
	userModalHTML.id = employeeJSONdata[i].phone;
	userModalHTML.className = 'modal-container';
	let modalHTML = '<div class="modal">';
	modalHTML += '<button type="button" id="modal-prev" class="modal-prev btn"><strong><</strong></button>';
	modalHTML += '<button type="button" id="modal-next" class="modal-next btn"><strong>></strong></button>';
	modalHTML += '<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>';
	modalHTML += '<div class="modal-info-container">';
	modalHTML += '<img class="modal-img" src="' + employeeJSONdata[i].picture.large + '" alt="profile picture">';
	modalHTML += '<h3 id="name" class="modal-name cap">' + employeeJSONdata[i].name.first + ' ' + employeeJSONdata[i].name.last + '</h3>';
	modalHTML += '<p class="modal-text">' + employeeJSONdata[i].email + '</p>';
	modalHTML += '<p class="modal-text cap">' + employeeJSONdata[i].location.city + '</p>';
	modalHTML += '<hr>';
	modalHTML += '<p class="modal-text">' + employeeJSONdata[i].phone + '</p>';
	modalHTML += '<p class="modal-text cap">' + employeeJSONdata[i].location.street + ', ' + employeeJSONdata[i].location.city + ', ' + employeeJSONdata[i].location.state + ', ' + employeeJSONdata[i].location.postcode + '</p>'; 
	modalHTML += '<p class="modal-text">Birthday: ' + employeeJSONdata[i].dob.date.slice(5,7).toString() + '/' + employeeJSONdata[i].dob.date.slice(8,10).toString() + '/' + employeeJSONdata[i].dob.date.slice(2,4).toString() + '</p>';
	modalHTML += '</div>';
	modalHTML += '</div>';
	userModalHTML.innerHTML = modalHTML;
	document.getElementById('modal').appendChild(userModalHTML);
	
}



//This functon shows the modal card  and handles the left, right and x buttons when clicked
function modalCardUI(i) {
	
	//When the modal X button is clicked the employee modal is hidden from display
	document.getElementById('modal-close-btn').addEventListener('click', ()=>{
		document.getElementById('modal').removeChild(document.getElementById(employeeJSONdata[i].phone));
	});

	//When the right arrow is clicked in the modal card
	document.getElementById('modal-next').addEventListener('click', ()=>{
		//The current employee modal card is deleted
		document.getElementById('modal').removeChild(document.getElementById(employeeJSONdata[i].phone));
		//if the next employee index is in range it is displayed
		if(i < numEmployees - 1){
			createEmployeeModalCard(i+1);
			modalCardUI(i+1);
		} 
	});

	//When the left arrow is clicked in the modal card
	document.getElementById('modal-prev').addEventListener('click', ()=>{
		//The current employee modal card is deleted
		document.getElementById('modal').removeChild(document.getElementById(employeeJSONdata[i].phone));
		//if the next employee index is in range it is displayed
		if(i > 0){
			createEmployeeModalCard(i-1);
			modalCardUI(i-1);
		} 
	});
}

function makeXMLHTTPUserRequest(i){
	//An XMLHttpRequest object is created to retrieve an employee's info
	var galleryXHR = new XMLHttpRequest();

	galleryXHR.onreadystatechange = function() {
		if(galleryXHR.readyState === XMLHttpRequest.DONE) {
	 		//The JSON returned from the server is parsed
	 		let employee = JSON.parse(this.responseText);
	 		employeeJSONdata.push(employee.results[0]);
	 		showEmployeeGalleryCard(i);
			//The employee modal card is opened when it is clicked
			document.getElementById(employeeJSONdata[i].email).addEventListener('click',()=>{
				createEmployeeModalCard(i);
				modalCardUI(i);
			});
		}
	}

	//A request is opened for the current employee info
	galleryXHR.open('GET', 'https://randomuser.me/api/?format=json', true);

	//The request is sent to the server
	galleryXHR.send();
}

//The following for loop determines how many employees to display on the page 
//Note:  The reason there is an makeXMLHPUserRequest function is
//so the employee data can be retrieved asyncronously from the API
for(let i = 0; i < numEmployees; i++) {	
	makeXMLHTTPUserRequest(i);
}

