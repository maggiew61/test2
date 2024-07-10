;(async function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	
	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
	};



	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};

	var pieChart = function() {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 4,
			lineCap: 'butt',
			barColor: '#27C452',
			trackColor:	"#f5f5f5",
			size: 160,
			animate: 1000
		});
	};

	var skillsWayPoint = function() {
		if ($('#fh5co-skills').length > 0 ) {
			$('#fh5co-skills').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( pieChart , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}

	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	
	$(function(){
		contentWayPoint();
		goToTop();
		loaderPage();
		fullHeight();
		parallax();
		// pieChart();
		skillsWayPoint();
	});

	let dataGlobal;

	fetch('/js/data.json')
  .then(response => response.json())
  .then(data => {
	console.log('data is',data)
	dataGlobal = data
	console.log('dataGlobal is',dataGlobal)
		  renderView(dataGlobal)

	// let content = dataGlobal['en']
	// 	for (let key in content) {
	// 		document.querySelector('#' + key).textContent = content[key]
	// 		}
})
  .catch(error => console.log(error));
	let dataExport;
	console.log('dataGlobal is',dataGlobal)



// function grabData(returnData) {
//     fetch("/js/data.json")
//     .then(response => {
//         return response.json().then(function(data) {
// 			console.log('data is',data);

//             // returnData = JSON.parse(data);
//             // console.log('is',returnData);
//         });
//     })

// }

// grabData(dataExport);

	// const languageContent = {
	// 	"en":{
	// 		"title": "ttitle",
	// 		"description": "descriptio2"
	// 	},
	// 	"cn":{
	// 		"title": "標題",
	// 		"description": "內文"
	// 	}
	//   }
	let barEl = document.getElementById("switchLanguageBar");
	const renderView = (dataGlobal, lang = 'en') => {
		let content = dataGlobal[lang]
		for (let key in content) {
			document.querySelector('#' + key).textContent = content[key]
			}
	}

	// const handleLanguage = (event) => {
	// 	let lang = event.target.getAttribute("language");
	//   renderView(lang)
	// }
	// renderView();
	// barEl.addEventListener("click", handleLanguage);

	barEl.addEventListener("click", async event => {
		const response = await fetch('/js/data.json').then((res) => res.json());
		console.log('response 2nd',response)
		let lang = event.target.getAttribute("language");
		renderView(response,lang)

		// let content = response[lang]
		// for (let key in content) {
		// 	document.querySelector('#' + key).textContent = content[key]
		// 	}

		// const paragraph = document.createElement("p");
		// paragraph.innerHTML = response.one.bio;
		// paragraph.id = "bio-project";
		// // p.style.cssText = 'border-left: 8px solid aqua;';
	  
		// document.querySelector(".projeto-contents").appendChild(paragraph);
	  });

}());