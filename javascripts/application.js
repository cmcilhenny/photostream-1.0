
// Var containing master list of images
var masterImageList = [];
var form = document.querySelector("form");

form.addEventListener("submit", getImages);

function getImages (e) {
	e.preventDefault();
	var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=[INSERTHERE]&user_id=[INSERTHERE]&format=json&nojsoncallback=1";
	sc.getJSON(url, updateImages);
	document.getElementById("startingHTML").className += " animated tada";
	displayImages();
	setTimeout(refetchImages, 120000);// Set a timer for 2 min (120000), have it call refetchImages
};


function refetchImages () {
	var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=[INSERTHERE]&user_id=[INSERTHERE]&format=json&nojsoncallback=1";
	sc.getJSON(url, updateImages);
	masterImageList.length = 0;
	setTimeout(refetchImages, 120000);// Set a timer for 2 min, have it call refetch images
};


function updateImages (json) {
// 1. Pull out list of IDs for each image; create array of ids
	var arrayId = [];
 	json['photos']["photo"].forEach(function(i) {
    	arrayId.push(i["id"]);
 	});
 // 2. Create array of image urls containing photo's ID by concatenation of (url + id)
 	arrayId.forEach(function(i) {
		var url = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=[INSERTHERE]&photo_id=" + i + "&format=json&nojsoncallback=1";
	 	sc.getJSON(url, gatherImageData);
 	});
};


function gatherImageData (json) {
	//create a masterImageList:
// Steps:
// 1. Read aspect ratio (height/width); if greater than 1, aspectRatio = "Portrait", else aspectRatio = "Landscape"... 
   var imageData = json["sizes"]["size"][json["sizes"]["size"].length-2];
   var aspectRatio = parseInt(imageData["height"]) / parseInt(imageData["width"]);
   
      if(aspectRatio >= 1) {
    	aspectRatioString = "portrait";
	  }
	  else {
	  	aspectRatioString = "landscape";
	}
// 2. Read url of photo
    var url = imageData["source"];
// 3. Create array containing [url, aspectRatio]
	var data = [url, aspectRatioString];
// 4. Push this array to masterImageList array
	masterImageList.push(data);
};


function displayImages () {
// this functions pulls out images and displays them. 
// 0. Check masterImageList.length < 3, reset timer for 10s, and return
	if (masterImageList.length < 3) {
 		setTimeout(displayImages, 250);
 		return;
 	}
// // 1. Get random images/call getRandomImages function
  var results = getRandomImages();
// // 2. Hide starting html by reaching in and query selecting the div "startingHTML", creating a class that is attached to that div, having that class "display: none". 
  document.getElementById("startingHTML").style.display = "none";
// // 2. set up html 
  var page1 = document.querySelector("#div1");
  var page2	= document.querySelector("#div2");
  var page3 = document.querySelector("#div3");
  var img1 = document.createElement("img");
  var img2 = document.createElement("img");
  var img3 = document.createElement("img");
  img1.setAttribute("src", results[0]);
  img2.setAttribute("src", results[1]);
  img3.setAttribute("src", results[2]);
  img1.setAttribute("id", "img1");
  img2.setAttribute("id", "img2");
  img3.setAttribute("id", "img3");
  page1.innerHTML = "";
  page2.innerHTML = "";
  page3.innerHTML = "";
  page1.appendChild(img1);
  page2.appendChild(img2);
  page3.appendChild(img3);
  //add animations
  document.querySelector("#img1").className = "animated fadeInLeft";
  document.querySelector("#img2").className = "animated fadeInRight";
  document.querySelector("#img3").className = "animated fadeInRight";
// // 3. Set new timer for 10s, have it re-call displayImages
	setTimeout(displayImages, 5000);

};

function getRandomImages() { 
// this will gather 3 images from masterImageList
	//Math.floor - thanks Dash!
//generate random number that will designate an image in the masterImageList to select
	// 	1. pulling out all the portraits into an array
	var imageSet = [];	
    var portraits = [];
	 
	masterImageList.forEach(function(i) {
  		if (i[1] == "portrait") {
           portraits.push(i)
	 	};
    });
    console.log(portraits);
 	//2. randomly select one using Math.random(), pull out the url of the selected array number and add to imageSet
	var portrait = Math.floor(Math.random()*portraits.length);
	var urlPortrait = portraits[portrait][0];
	//3. put url into new array (this url will be joined by 2 landscape urls)
	imageSet.push(urlPortrait);
		
	//find two random landscape image
		//1. pulling out all the landscapes into an array
	var landscapes = [];
	masterImageList.forEach(function(i) {
		if (i[1] == "landscape") {
			landscapes.push(i)
		};
	});
	console.log(landscapes);
		//2. randomly selecting one landscape by getting random number, creating a variable equal to that number, and pulling the url and pushing it to array that holds the portrait url
	var landscape = Math.floor(Math.random()*landscapes.length);
	var urlLandscape = landscapes[landscape][0];
	imageSet.push(urlLandscape);
		//3. randomly select another landscape by declaring a variable to defines a number that references the index of an array, specifically landscapes array
	var landscape1 = Math.floor(Math.random()*landscapes.length);

		//4.check that it is not the same as the previously selected landscape by using a while clause that compares this new number to the var craeted in 2. 
		while (landscape == landscape1) {
			landscape1 = Math.floor(Math.random()*landscapes.length);
		}
		//if landscape != landscape1 we move on to ...
		var urlLandscape1 = landscapes[landscape1][0];
			imageSet.push(urlLandscape1);

	//final.. array called imageSet with one portrait and two landscapes
	return imageSet;
};





