
//this for loop creates 12 XMLHttp Requests to call the user data.  
for(let i = 0; i < 12; i++) {	
	//an XMLHttpRequest object is created
	var galleryXHR = new XMLHttpRequest();

	//USER GALLERY CARD
	//when the response is ready, the user image, name, location and email and appended to the DOM with this callback function
	galleryXHR.onreadystatechange = function() {
		if(galleryXHR.readyState === XMLHttpRequest.DONE) {
			//the JSON returned from the server is parsed
			let employee = JSON.parse(this.responseText);
			//HTML is created for the user info to be appended to gallery ID
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
			document.getElementById('gallery').appendChild(userHTML);

			//HTML is created for the user modal
			let modalHTML = '<div class="modal">';
			modalHTML += '<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>';
			modalHTML += '<div class="modal-info-container">';
			modalHTML += '<img class="modal-img" src="' + employee.results[0].picture.large + '" alt="profile picture">';
			modalHTML += '<h3 id="name" class="modal-name cap">' + employee.results[0].name.first + ' ' + employee.results[0].name.last + '</h3>';
			modalHTML += '<p class="modal-text">' + employee.results[0].email + '</p>';
			modalHTML += '<p class="modal-text cap">' + employee.results[0].location.city + '</p>';
			modalHTML += '<hr>';
			modalHTML += '<p class="modal-text">' + employee.results[0].phone + '</p>';
			modalHTML += '<p class="modal-text">' + employee.results[0].location.street + ', ' + employee.results[0].location.city + ', ' + employee.results[0].location.state + ', ' + employee.results[0].location.postcode + '</p>'; 
			modalHTML += '<p class="modal-text">Birthday: '; + employee.results[0].dob.date.slice(5,7) + '/' + employee.results[0].dob.date.slice(8,10) + '/' + employee.results[0].dob.date.slice(2,4) + '</p>';
			modalHTML += '</div>';
			modalHTML += '</div>';
			//console.log(employee.results[0]);
			let userModalHTML = document.createElement('div');
			document.getElementsByTagName('BODY')[0].appendChild(userModalHTML);

			//FIXXXXXXXXX
			//the user card is opened when it is clicked
			userHTML.addEventListener('click',()=>{
				userModalHTML.style.display = 'inline-block';
				userModalHTML.className = 'modal-container';
				userModalHTML.innerHTML = modalHTML;

				//FIXXXXXXXXXXX
				//when the modal x button is clicked the modal is hidden from display
				document.getElementById('modal-close-btn').addEventListener('click', ()=>{
					userModalHTML.style.display = 'none';
					//userModalHTML.parentNode.removeChild(userModalHTML);
				});
			});

		} 
	};

	//a request is opened
	galleryXHR.open('GET', 'https://randomuser.me/api/?format=json', false);
	//the request is sent to the server
	galleryXHR.send();
}
