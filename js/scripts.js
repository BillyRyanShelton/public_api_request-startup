for(let i = 0; i < 12; i++) {	
	var galleryXHR = new XMLHttpRequest();

	galleryXHR.onreadystatechange = function() {
		if(galleryXHR.readyState === XMLHttpRequest.DONE) {
			let employee = JSON.parse(this.responseText);
			console.log(employee.results[0].location);
			let galleryHTML = '<div class="card">';
			galleryHTML += '<div class="card-img-container">';
			galleryHTML += '<img class="card-img" src="'+ employee.results[0].picture.large + '" alt="profile picture">';
			galleryHTML += '</div>';
			galleryHTML += '<div class="card-info-container">';
			galleryHTML += '<h3 id="name" class="card-name cap">' + employee.results[0].name.first + '</h3>';
			galleryHTML += '<p class="card-text">' + employee.results[0].email + '</p>';
			galleryHTML += '<p class="card-text cap">' + employee.results[0].location.city +', ' + employee.results[0].location.state + '</p>';
			galleryHTML += '</div>';
			galleryHTML += '</div>';
			let userHTML = document.createElement('div');
			userHTML.innerHTML = galleryHTML;
			document.getElementById('gallery').appendChild(userHTML);
		} 
	};

	galleryXHR.open('GET', 'https://randomuser.me/api/?format=json', false);
	galleryXHR.send();
}
