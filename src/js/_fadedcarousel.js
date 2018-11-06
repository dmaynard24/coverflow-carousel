(function() {
	//DOM elements
	var coverflowContainer = document.querySelector('.coverflow'),
        coverflowSlides = document.querySelectorAll('.coverflow__slide'),
        prevArrow = document.querySelector('.prev-arrow'),
        nextArrow = document.querySelector('.next-arrow');

    //set indicies and initial position
    for (var i = 0; i < coverflowSlides.length; i++) {
        coverflowSlides[i].dataset.coverflowIndex = i + 1;
    }
	var coverflowPosition = Math.floor(coverflowSlides.length / 2) + 1;
	coverflowContainer.dataset.coverflowPosition = coverflowPosition;

	//navigation functions
	function viewPrevSlide() {
		coverflowPosition = Math.max(1, coverflowPosition - 1);
		coverflowContainer.dataset.coverflowPosition = coverflowPosition;
	}

	function viewNextSlide() {
		coverflowPosition = Math.min(coverflowSlides.length, coverflowPosition + 1);
		coverflowContainer.dataset.coverflowPosition = coverflowPosition;
	}

	function jumpToSlide(e) {
        var targetImage = e.target;
		coverflowPosition = Math.min(coverflowSlides.length, Math.max(1, targetImage.dataset.coverflowIndex));
		coverflowContainer.dataset.coverflowPosition = coverflowPosition;
	}

	//add event handlers
	prevArrow.addEventListener('click', viewPrevSlide);
    nextArrow.addEventListener('click', viewNextSlide);
    for (var i = 0; i < coverflowSlides.length; i++) {
        coverflowSlides[i].addEventListener('click', jumpToSlide);
    }
	window.addEventListener('keyup', function(e) {
		if (e.which === 37) { //left arrow
			viewPrevSlide();
		} else if (e.which === 39) { //right arrow
			viewNextSlide();
		}
	});
})();