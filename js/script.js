const sections = 5;

function nav() {

	for(let i = 1; i <= sections; i++) {
		$(`.menu-button:nth-child(${i+1})`).on("click", function(){
			$('html, body').animate({
				scrollTop: $('.target').eq(i-1).offset().top
			}, 1000);
		});
	}
}

nav();