var galleryXHR = new XMLHttpRequest();

galleryXHR.onreadystatechange = function() {
	if(galleryXHR === 4) {
		console.log(galleryXHR);
	} 
};

galleryXHR.open('GET', 'https://randomuser.me/api/?format=json');
galleryXHR.send();
