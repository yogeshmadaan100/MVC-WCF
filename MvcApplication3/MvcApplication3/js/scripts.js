// text rotator plugin
!function(e){var t={animation:"dissolve",separator:",",speed:2e3};e.fx.step.textShadowBlur=function(t){e(t.elem).prop("textShadowBlur",t.now).css({textShadow:"0 0 "+Math.floor(t.now)+"px black"})};e.fn.textrotator=function(n){var r=e.extend({},t,n);return this.each(function(){var t=e(this);var n=[];e.each(t.text().split(r.separator),function(e,t){n.push(t)});t.text(n[0]);var i=function(){switch(r.animation){case"dissolve":t.animate({textShadowBlur:20,opacity:0},500,function(){s=e.inArray(t.text(),n);if(s+1==n.length)s=-1;t.text(n[s+1]).animate({textShadowBlur:0,opacity:1},500)});break;case"flip":if(t.find(".back").length>0){t.html(t.find(".back").html())}var i=t.text();var s=e.inArray(i,n);if(s+1==n.length)s=-1;t.html("");e("<span class='front'>"+i+"</span>").appendTo(t);e("<span class='back'>"+n[s+1]+"</span>").appendTo(t);t.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip").show().css({"-webkit-transform":" rotateY(-180deg)","-moz-transform":" rotateY(-180deg)","-o-transform":" rotateY(-180deg)",transform:" rotateY(-180deg)"});break;case"flipUp":if(t.find(".back").length>0){t.html(t.find(".back").html())}var i=t.text();var s=e.inArray(i,n);if(s+1==n.length)s=-1;t.html("");e("<span class='front'>"+i+"</span>").appendTo(t);e("<span class='back'>"+n[s+1]+"</span>").appendTo(t);t.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip up").show().css({"-webkit-transform":" rotateX(-180deg)","-moz-transform":" rotateX(-180deg)","-o-transform":" rotateX(-180deg)",transform:" rotateX(-180deg)"});break;case"flipCube":if(t.find(".back").length>0){t.html(t.find(".back").html())}var i=t.text();var s=e.inArray(i,n);if(s+1==n.length)s=-1;t.html("");e("<span class='front'>"+i+"</span>").appendTo(t);e("<span class='back'>"+n[s+1]+"</span>").appendTo(t);t.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip cube").show().css({"-webkit-transform":" rotateY(180deg)","-moz-transform":" rotateY(180deg)","-o-transform":" rotateY(180deg)",transform:" rotateY(180deg)"});break;case"flipCubeUp":if(t.find(".back").length>0){t.html(t.find(".back").html())}var i=t.text();var s=e.inArray(i,n);if(s+1==n.length)s=-1;t.html("");e("<span class='front'>"+i+"</span>").appendTo(t);e("<span class='back'>"+n[s+1]+"</span>").appendTo(t);t.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip cube up").show().css({"-webkit-transform":" rotateX(180deg)","-moz-transform":" rotateX(180deg)","-o-transform":" rotateX(180deg)",transform:" rotateX(180deg)"});break;case"spin":if(t.find(".rotating").length>0){t.html(t.find(".rotating").html())}s=e.inArray(t.text(),n);if(s+1==n.length)s=-1;t.wrapInner("<span class='rotating spin' />").find(".rotating").hide().text(n[s+1]).show().css({"-webkit-transform":" rotate(0) scale(1)","-moz-transform":"rotate(0) scale(1)","-o-transform":"rotate(0) scale(1)",transform:"rotate(0) scale(1)"});break;case"fade":t.fadeOut(r.speed,function(){s=e.inArray(t.text(),n);if(s+1==n.length)s=-1;t.text(n[s+1]).fadeIn(r.speed)});break}};setInterval(i,r.speed)})}}(window.jQuery)

//debug function
function debug(msg){
	console.log(msg);
}
function footerInit(){
	var footer = $(".footer").clone();
	footer.addClass("visible");
	$(".content > div").append(footer);

}
$(document).ready(function(){

	footerInit();

	var anim_in = "pt-page-rotateCubeLeftIn";
	var anim_out = "pt-page-rotateCubeLeftOut";

	var anim_in_inv = "pt-page-rotateCubeRightIn";
	var anim_out_inv = "pt-page-rotateCubeRightOut";

	var curr_page_loaded = true;
	var next_page_loaded = false;

	var next_page;

	var pageHeight = $(window).height();
	$("#wrapper .main_content").css("height", pageHeight+"px");
	var rand = Math.floor(Math.random()*6)+1;
	$(document.body).addClass('theme_'+rand);
	
	
	//description rotator
	$(".description .rotate").textrotator({
		animation: "dissolve",
		speed: 4500,
		separator: ",,"
	});

	//scrollpane on pages except homepage
	$(".content > div:not([id='home'])").jScrollPane({
		autoReinitialise: true
	});

	//portfolio type selector
    $("#portfolio_grid li").on('click', function(){
        var popup = $("#portfolio_popup");
        var popup_details = $(this).find(".popup_information");

        if (popup_details.find(".top").hasClass("video")){
	        var video_url = popup_details.find(".top .video_url");
	        popup_details.find(".top iframe").attr("src", video_url.html());
	        popup_details.find(".top .video_url").remove();
	    }

        popup.html(popup_details.clone());
        popup.append('<button title="Close (Esc)" type="button" class="mfp-close fa fa-times"></button>');
    });

    //plus social icon click
	$(".social_icons a.plus").click(function(){
		if ($(this).next().hasClass("visible")){
			$(this).next().slideUp(function(){
				$(this).removeClass("visible");
			});
		}else{
			$(this).next().slideDown(function(){
				$(this).addClass("visible");
			});
		}
	});

	//plus social icon hover
	$(".social_icons li.more_social_icons_li").hover(
		function(){
			if (!$(this).find(".more_social_icons").hasClass("visible")){
				$(this).find(".more_social_icons").slideDown(function(){
					$(this).addClass("visible");
				});
			}
		},
		function(){
			if ($(this).find(".more_social_icons").hasClass("visible")){
				$(this).find(".more_social_icons").slideUp(function(){
					$(this).removeClass("visible");					
				});
			}
		}
	);

	//main menu navigation and goto resume button(home page)
	$(".main_menu ul li a, .goto_resume_btn").click(function(){

		if ($(this).hasClass("active"))
			return false;

		if (curr_page_loaded == false && next_page_loaded == false)
			return false;

		var curr_page = $(".main_menu ul li a.active").attr("href");
		curr_page = curr_page.split("#");
		curr_page = curr_page[1];


		if ($(this).hasClass("goto_resume_btn")){
			next_page = "resume";
		}else{
			next_page = $(this).attr("href");
			next_page = next_page.split("#");
			next_page = next_page[1];
		}

		if (curr_page == next_page)
			return false;

		var curr_page_id = $(".main_menu ul li a.active").attr("data-id");
		var next_page_id;

		if ($(this).hasClass("goto_resume_btn")){
			next_page_id = $(".main_menu ul li a.resume").attr("data-id");
		}else{
			next_page_id = $(this).attr("data-id");
		}

		var animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},

		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

		var anim_in_f = anim_in;
		var anim_out_f = anim_out;
		if (next_page_id < curr_page_id){
			anim_in_f = anim_in_inv;
			anim_out_f = anim_out_inv;
		}

		curr_page_loaded = false;

		$(".content > div#"+curr_page+" .cycle-slideshow").cycle("pause");


		if (curr_page == "home"){
			$(".main_slider").cycle("pause");
		}

		$(".content > div#"+curr_page).removeClass(anim_in_f).addClass(anim_out_f).on(animEndEventName, function(){

			curr_page_loaded = true;

			$(this).removeAttr("class");

			if (next_page == "portfolio"){
				if (!$("#portfolio_grid").hasClass("done")){

					$("#portfolio_grid").mixitup();

					$(' #portfolio_grid > li ').each( function() { $(this).hoverdir(); } );
					
					$("#portfolio_grid").magnificPopup({
				        delegate: 'a',
				        type: 'inline',
				        removalDelay: 300,
				        mainClass: 'my-mfp-slide-bottom'
				    });

				    $("#portfolio_grid").addClass("done");
				}
			}else if (next_page == "contact"){
				if ($("#gmap").is(":empty")){
					new Maplace({
						map_options: {
							mapTypeId: google.maps.MapTypeId.HYBRID,
							set_center: [28.6100, 77.2300],
							zoom: 4
						}
					}).Load(); 
				}
			}else if (next_page == "blog"){
				if ($(".blog_tweets > .tweets").is(":empty")){
					$('.blog_tweets > .tweets').twittie({
					    dateFormat: '%b. %d, %Y',
					    template: '<strong class="date">{{date}}</strong> - <span class="tweet">{{tweet}}</span>',
					    count: 4
					});
				}
			}

			//animations
			if (next_page == "about"){
				if (!$(".content > div#about .left_side").hasClass("animated")){
					$(".content > div#about .left_side").addClass("visible animated fadeInLeft");
					$(".content > div#about .right_side").addClass("visible animated fadeInRight");
					$(".content > div#about .box.awards").addClass("visible animated fadeInUp");
				}
			}else if (next_page == "resume"){
				if (!$(".content > div#resume .left_side").hasClass("animated")){
					$(".content > div#resume .left_side").addClass("visible animated fadeInLeft");
					$(".content > div#resume .right_side").addClass("visible animated fadeInRight");
				}
			}else if (next_page == "blog"){
				if (!$(".content > div#blog .sidebar").hasClass("animated")){
					$(".content > div#blog .sidebar").addClass("visible animated fadeInRight");
				}
			}

		});

		next_page_loaded = false;

		$(".content > div#"+next_page).addClass("pt-page-current "+anim_in_f).on(animEndEventName, function(){

			$(".content > div#"+next_page+" .cycle-slideshow").cycle("resume");

			//home slider resume
			if (next_page == "home"){
				$(".main_slider").cycle("resume");
			}

			next_page_loaded = true;

			$(this).removeClass(anim_in_f);
			if (!$(this).hasClass("pt-page-current")){
				$(this).addClass("pt-page-current");
			}

			//animate bars on resume page
			if (next_page == "resume"){
				if (!$(".skills").hasClass("animated")){
					$(".skills").addClass("animated");

					$(".skills .section .item .bar_outer .bar_inner").each(function(e){
						var width = $(this).attr("data-width");
						width = (width < 9) ? 12 : ((width < 15) ? 15 : width);
						$(this).animate({
							'width' : width+"%"
						}, 600, function(){
							$(this).find(".text").fadeIn();
						});
					});
				}
			}


		});


		$(".main_menu ul li a.active").removeClass("active");
		if ($(this).hasClass("goto_resume_btn")){
			$(".main_menu ul li a.resume").addClass("active");
		}else{
			$(this).addClass("active");
		}

		return false;

	});
	
	//accordion item clicker
	$(".accordion .item_btn").click(function(){

		if (!$(this).parents(".item").find(".item_text").is(":visible")){
			//close previous active
			$(".accordion .item_btn.active").parent().next().slideUp("fast");
			$(".accordion .item_btn").removeClass("active");

			//icon change
			$(".accordion").find(".arrow i").removeClass("fa-minus-circle").addClass("fa-plus-circle");
			$(this).parents(".item").find(".arrow i").removeClass("fa-plus-circle").addClass("fa-minus-circle");

			$(this).parents(".item").find(".item_text").slideDown("fast");
			$(this).addClass("active");
		}else{

			//icon change
			$(this).parents(".item").find(".arrow i").removeClass("fa-minus-circle").addClass("fa-plus-circle");

			$(this).parents(".item").find(".item_text").slideUp("fast");
			$(this).removeClass("active");
		}

	});

	//testimonials slide right button
	$(".testimonials_btns .left_btn, .testimonials_btns .right_btn").click(function(){
		if ($(this).hasClass("left_btn")){
			$('.testimonials.cycle-slideshow').cycle('prev');
		}else if ($(this).hasClass("right_btn")){
			$('.testimonials.cycle-slideshow').cycle('next');
		}
	});

	//testimonials slide left button
	$(".post .media .btns .left_btn, .post .media .btns .right_btn").click(function(){
		if ($(this).hasClass("left_btn")){
			$(this).parent().next().cycle('prev');
		}else if ($(this).hasClass("right_btn")){
			$(this).parent().next().cycle('next');
		}
	});

	//post read more button
	$("body").on("click", ".read_more_btn", function(){

		in_post_view = true;

		$(".blog_posts .post").hide();

		$(this).parents(".post_data").find(".hidden_body").show();
		$(this).parents(".post_data").find(".preview_body").hide();

		$(this).parents(".post_data").find(".btns .read_more_btn").hide();

		$(this).parents(".post").removeClass("animate flipInX").addClass("fullOpacity");
		$(this).parents(".post").fadeIn("fast");

		$(this).parent().prev().show();

		$(this).parents(".blog_posts").find(".load_more_posts").hide();

		$(this).parents(".blog_posts").find(".back_to_blog").show();

	});

	//go back to blog posts button
	$("body").on("click", ".back_to_blog", function(){

		in_post_view = false;

		$(".blog_posts .post:visible").find(".hidden_body").hide();
		$(".blog_posts .post:visible").find(".preview_body").show();

		$(".blog_posts .post .btns .read_more_btn").show();

		if ($(".blog_posts").hasClass("animated")){
			$(".blog_posts > .post").removeClass("animate");
			$(".blog_posts > .post").addClass("fullOpacity");
		}

		$(".blog_posts .post").removeClass("flipInX");

		$(".blog_posts .post").show();

		$(this).parents(".blog_posts").find(".load_more_posts").show();

		$(this).parents(".blog_posts").find(".back_to_blog").hide();

	});

	//tags menu clicker
	$(".tabs_menu a").click(function(){
		var active_tab_box = $(".tabs_menu a.active").attr("href");
		var tab_box = $(this).attr("href");

		if (active_tab_box == tab_box)
			return false;

		$(".tabs_menu a.active").removeClass("active");
		$(this).addClass("active");

		$(".tabs_body > div.active").slideUp("fast", function(){
			$(this).removeClass("active");
		});
		$(".tabs_body > div"+tab_box).slideDown("fast", function(){
			$(this).addClass("active");
		});

		return false;

	});

	//contact form
	$(".send_message_btn").click(function(){
		var name = $(this).parents(".contact_form").find(".name");
		var email = $(this).parents(".contact_form").find(".email");
		var message = $(this).parents(".contact_form").find(".message");

		$(this).val("Loading...");

		$.ajax({
			type: 'POST',
			url: 'ajax/email.php',
			data: {
				'name' : name.val(),
				'email' : email.val(),
				'message' : message.val()
			},
			dataType: 'json',
			success: $.proxy(function(data) {
				
				if (data.error == false){
					$(this).next().removeClass("error").addClass("success").html(data.response);
					name.val('');
					email.val('');
					message.val('');
				}else{
					$(this).next().removeClass("success").addClass("error").html(data.response);
					$(this).val("Success...");
				}

				$(this).val("Send Message");

			}, this)
		});
	});
	
	//blog posts show when visible
	var total_items = 1;//1rst blog post
	var in_post_view = false;
	var first_blog_view = false;
	$(".content > div").scroll(function(){

		if ($(".content > div#blog").is(":visible") && !$(".content > div#blog .blog_posts").hasClass("animated") && !in_post_view){
			
			$(".content > div#blog .blog_posts > .post").each(function(i){

				if($(this).offset().top + 160 < $(".content > div").scrollTop() + $(".content > div").outerHeight() && !$(this).hasClass("animated") && in_post_view == false) {
					//handle video iframe
					if ($(this).find(".media").hasClass("video")){
						var video_url = $(this).find(".media .video_url");
						$(this).find(".media iframe").attr("src", video_url.html());
						$(this).find(".media .video_url").remove();
					}

					$(this).addClass("animate animated flipInX");
					total_items++;
					if (total_items == $(".content > div#blog .blog_posts > .post").length){
						first_blog_view = true;

						setTimeout(function(){
							first_blog_view = false;//hack for last item in blog in order to not stop the animation
						}, 900);
					}
				}

			});

			if (total_items == $(".content > div#blog .blog_posts > .post").length && first_blog_view == false){
				$(".content > div#blog .blog_posts").addClass("animated");
				$(".content > div#blog .blog_posts > .post").removeClass("animated");
				$(".content > div#blog .blog_posts > .post").removeClass("flipInX");
				$(".content > div#blog .blog_posts > .post").addClass("fullOpacity");
			}

		}

	});
	
	//page load animations
	setTimeout(function(){
		$(".loading_overlay").fadeOut("fast", function(){

			$("#wrapper").animate({
				"opacity" : "1"
			}, 200);
			if ($("#wrapper").width() != 300 && $("#wrapper").width() != 470){
				$("#wrapper").addClass("animated fadeInDown");
			}

			$(".theme_configs").addClass("visible");
			
			setTimeout(function(){
				$(".main_menu").animate({
					"opacity" : "1"
				}, 150);
				$(".main_menu").addClass("animated fadeInLeft");

				$(".social_icons").animate({
					"opacity" : "1"
				}, 150);
				$(".social_icons").addClass("animated fadeInRight");

				$("#wrapper").removeClass("animated fadeInDown");
			}, 300);
		});
	}, 750);

	//hash url page changer
	jQuery(window).hashchange( function(e) {
		var hash = location.hash;
		if (hash == "")
			return false;

		var split = hash.split("#");

		var page = split[1];

		var pages_array = [
			'home',
			'about',
			'resume',
			'portfolio',
			'blog',
			'contact'
		];

		if (!($.inArray(page, pages_array) > -1)){
			return false;
		}

		if ($(".main_menu ul li a[href='#"+page+"']").hasClass("active"))
			return false;

		if (curr_page_loaded == false && next_page_loaded == false)
			return false;

		var curr_page = $(".main_menu ul li a.active").attr("href");
		curr_page = curr_page.split("#");
		curr_page = curr_page[1];

		
		var next_page = $(".main_menu ul li a[href='#"+page+"']").attr("href");
		next_page = next_page.split("#");
		next_page = next_page[1];
		

		if (curr_page == next_page)
			return false;

		var curr_page_id = $(".main_menu ul li a[href='#"+page+"']").attr("data-id");
		var next_page_id;

		next_page_id = $(this).attr("data-id");
		

		var animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},

		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

		var anim_in_f = anim_in;
		var anim_out_f = anim_out;
		if (next_page_id < curr_page_id){
			anim_in_f = anim_in_inv;
			anim_out_f = anim_out_inv;
		}

		curr_page_loaded = false;

		$(".content > div#"+curr_page+" .cycle-slideshow").cycle("pause");


		if (curr_page == "home"){
			$(".main_slider").cycle("pause");
		}

		$(".content > div#"+curr_page).removeClass(anim_in_f).addClass(anim_out_f).on(animEndEventName, function(){

			curr_page_loaded = true;

			$(this).removeAttr("class");

			if (next_page == "portfolio"){
				if (!$("#portfolio_grid").hasClass("done")){

					$("#portfolio_grid").mixitup();

					$(' #portfolio_grid > li ').each( function() { $(this).hoverdir(); } );
					
					$("#portfolio_grid").magnificPopup({
				        delegate: 'a',
				        type: 'inline',
				        removalDelay: 300,
				        mainClass: 'my-mfp-slide-bottom'
				    });

				    $("#portfolio_grid").addClass("done");
				}
			}else if (next_page == "contact"){
				if ($("#gmap").is(":empty")){
					new Maplace({
						map_options: {
							mapTypeId: google.maps.MapTypeId.HYBRID,
							set_center: [28.6129, 77.2293],
							zoom: 4
						}
					}).Load(); 
				}
			}else if (next_page == "blog"){
				if ($(".blog_tweets > .tweets").is(":empty")){
					$('.blog_tweets > .tweets').twittie({
					    dateFormat: '%b. %d, %Y',
					    template: '<strong class="date">{{date}}</strong> - <span class="tweet">{{tweet}}</span>',
					    count: 4
					});
				}
			}
			
			//animations
			if (next_page == "about"){
				if (!$(".content > div#about .left_side").hasClass("animated")){
					$(".content > div#about .left_side").addClass("visible animated fadeInLeft");
					$(".content > div#about .right_side").addClass("visible animated fadeInRight");
					$(".content > div#about .box.awards").addClass("visible animated fadeInUp");
				}
			}else if (next_page == "resume"){
				if (!$(".content > div#resume .left_side").hasClass("animated")){
					$(".content > div#resume .left_side").addClass("visible animated fadeInLeft");
					$(".content > div#resume .right_side").addClass("visible animated fadeInRight");
				}
			}else if (next_page == "blog"){
				if (!$(".content > div#blog .sidebar").hasClass("animated")){
					$(".content > div#blog .sidebar").addClass("visible animated fadeInRight");
				}
			}

		});

		next_page_loaded = false;

		$(".content > div#"+next_page).addClass("pt-page-current "+anim_in_f).on(animEndEventName, function(){

			$(".content > div#"+next_page+" .cycle-slideshow").cycle("resume");

			//home slider resume
			if (next_page == "home"){
				$(".main_slider").cycle("resume");
			}

			next_page_loaded = true;

			$(this).removeClass(anim_in_f);
			if (!$(this).hasClass("pt-page-current")){
				$(this).addClass("pt-page-current");
			}

			//animate bars on resume page
			if (next_page == "resume"){
				if (!$(".skills").hasClass("animated")){
					$(".skills").addClass("animated");

					$(".skills .section .item .bar_outer .bar_inner").each(function(e){
						var width = $(this).attr("data-width");
						width = (width < 9) ? 12 : ((width < 15) ? 15 : width);
						$(this).animate({
							'width' : width+"%"
						}, 600, function(){
							$(this).find(".text").fadeIn();
						});
					});
				}
			}


		});


		$(".main_menu ul li a.active").removeClass("active");
		$(".main_menu ul li a[href='#"+page+"']").addClass("active");

		return false;

	});

	$(window).resize(function(){
		var pageHeight = $(window).height();
		$("#wrapper .main_content").css("height", pageHeight+"px");
	});
	
});