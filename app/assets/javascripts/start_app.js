
// jquery to make the banner disappear and enter the website
$(window).load(function(){


$("#free_tour").click(function(e){

	//jquery to set opacity to zero
	$("#dumb>span").removeClass('transparent');

	//jquery to fadeOut the banner
	$("#main_banner").fadeOut("slow",function(){});

	//start_app();
});


});

