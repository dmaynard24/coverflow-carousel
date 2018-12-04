(function() {
	function initializeFadedCarousels() {
		var fadedCarousels = document.querySelectorAll('.faded-carousel-component');
		for (var i = 0; i < fadedCarousels.length; i++) {
			var carousel = fadedCarousels[i];

			// DOM elements
			var coverflowContainer = carousel.querySelector('.coverflow'),
				coverflowSlides = carousel.querySelectorAll('.coverflow__slide'),
				coverflowSlideDots = carousel.querySelectorAll('.slide-dot')
				coverflowSlideTitleCaptions = carousel.querySelectorAll('.slide-title-caption'),
				prevArrow = carousel.querySelector('.prev-arrow'),
				nextArrow = carousel.querySelector('.next-arrow');

			// set indicies and initial position
			for (var i = 0; i < coverflowSlides.length; i++) {
				coverflowSlides[i].dataset.coverflowIndex = i + 1;
			}
			for (var i = 0; i < coverflowSlideDots.length; i++) {
				coverflowSlideDots[i].dataset.coverflowIndex = i + 1;
			}
			for (var i = 0; i < coverflowSlideTitleCaptions.length; i++) {
				coverflowSlideTitleCaptions[i].dataset.coverflowIndex = i + 1;
			}
			var coverflowPosition = Math.floor(coverflowSlides.length / 2) + 1;
			// var coverflowPosition = 1;
			coverflowContainer.dataset.coverflowPosition = coverflowPosition;
			updateActiveTitle();

			// navigation functions
			function viewPrevSlide() {
				coverflowPosition = Math.max(1, coverflowPosition - 1);
				coverflowContainer.dataset.coverflowPosition = coverflowPosition;
				updateActiveTitle();
			}

			function viewNextSlide() {
				coverflowPosition = Math.min(coverflowSlides.length, coverflowPosition + 1);
				coverflowContainer.dataset.coverflowPosition = coverflowPosition;
				updateActiveTitle();
			}

			function jumpToSlide(e) {
				var targetImage = e.target;
				coverflowPosition = Math.min(coverflowSlides.length, Math.max(1, targetImage.dataset.coverflowIndex));
				coverflowContainer.dataset.coverflowPosition = coverflowPosition;
				updateActiveTitle();
			}

			// highlight slide title
			function updateActiveTitle() {
				// temporarily set carousel's opacity to 0 (IE fix to force a repaint)
				carousel.classList.remove('active');

				var position = coverflowContainer.dataset.coverflowPosition,
					elementsToActivate = carousel.querySelectorAll('[data-coverflow-index="' + position + '"]');

				for (var i = 0; i < elementsToActivate.length; i++) {
					var element = elementsToActivate[i],
						activeSibling = element.parentNode.querySelector('.active');

					if (activeSibling) {
						activeSibling.classList.remove('active');
					}
					element.classList.add('active');
				}

				// reset carousel's opacity to 1 (IE fix to force a repaint)
				carousel.classList.add('active');
			}

			// add event handlers
			prevArrow.addEventListener('click', viewPrevSlide);
			nextArrow.addEventListener('click', viewNextSlide);
			for (var i = 0; i < coverflowSlides.length; i++) {
				coverflowSlides[i].addEventListener('click', jumpToSlide);
			}
			for (var i = 0; i < coverflowSlideDots.length; i++) {
				coverflowSlideDots[i].addEventListener('click', jumpToSlide);
			}
			for (var i = 0; i < coverflowSlideTitleCaptions.length; i++) {
				coverflowSlideTitleCaptions[i].addEventListener('click', jumpToSlide);
			}
			window.addEventListener('keyup', function(e) {
				if (e.which === 37) { //left arrow
					viewPrevSlide();
				} else if (e.which === 39) { //right arrow
					viewNextSlide();
				}
			});

			// swipe event listeners
			var touchDown,
				touchDownTime;

			function touchstartHandler(e) {
				touchDown = e.touches[0].clientX;
				touchDownTime = Math.round(e.timeStamp);
			}

			function touchendHandler(e) {
				var touchUp = e.changedTouches[0].clientX,
					touchUpTime = Math.round(e.timeStamp);
				if (touchUpTime - touchDownTime > 1000) { // hesitated touchmove
					if (touchUp > touchDown + 30) {
						// swiped right
						viewPrevSlide();
					} else if (touchUp < touchDown - 30) {
						// swiped left
						viewNextSlide();
					}
				} else { // instant touchmove
					if (touchUp > touchDown + 15) {
						// swiped right
						viewPrevSlide();
					} else if (touchUp < touchDown - 15) {
						// swiped left
						viewNextSlide();
					}
				}
			}

			carousel.querySelector('.faded-carousel').addEventListener('touchstart', touchstartHandler);
			carousel.querySelector('.faded-carousel').addEventListener('touchend', touchendHandler);

			// show carousel after init
			carousel.classList.add('active');
		}
	}

	window.addEventListener('load', initializeFadedCarousels);
})();