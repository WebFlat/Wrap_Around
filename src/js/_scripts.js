jQuery(function ($) {
	'use strict';


	$('.polycarbonate-block').not(':first').hide();
	$('#polarized').hide();
	$('#trivex').hide();



	$('.polycarbonate').on('click', function () {
		$('#polarized').hide();
		$('#trivex').hide();
		$('#polycarbonate').show();
		$('.card__prev-btn').removeClass('active');
		$('.polycarbonate').removeClass('active').eq($(this).index()).addClass('active');
		$('.polycarbonate-block').hide().eq($(this).index()).fadeIn()
	}).eq(0).addClass('active');


	$('.polarized').on('click', function () {
		$('#polycarbonate').hide();
		$('#trivex').hide();
		$('#polarized').show();
		$('.card__prev-btn').removeClass('active');
		$('.polarized').removeClass('active').eq($(this).index()).addClass('active');
		$('.polarized-block').hide().eq($(this).index()).fadeIn()
	});



	$('.trivex').on('click', function () {
		$('#polycarbonate').hide();
		$('#polarized').hide();
		$('#trivex').show();
		$('.card__prev-btn').removeClass('active');
		$('.trivex').removeClass('active').eq($(this).index()).addClass('active');
		$('.trivex-block').hide().eq($(this).index()).fadeIn()
	});




	$('.card__img-wrap').on('click', function () {
		var url = $(this).children().attr('src');
		$('.card__img-wrap').removeClass('active');
		$(this).addClass('active');
		$(this).parent().next().children().attr('src', url);
	})



	$('#addToCard').on('click', function () {
		var quantity = $('.card__prev-btn.active').attr('quantity');
		var variantID = $('.card__prev-btn.active').attr('variantID');
		if (!variantID == '' || !quantity == '') {
			var request = {
				variantID: variantID,
				quantity: quantity
			}
			$.ajax({
				url: 'https://firebaseio.com/request.json',
				type: "POST",
				headers: "Content-Type': 'application/json",
				cache: false,
				data: JSON.stringify(request),
				success: function (data) {
					if (data) {
						console.log('done');
					} else {
						console.log('error');
					}
				}, error: function () {
					console.log('error');
				},
			});

		} else {
			console.log('нет данных для отправки');
		}
	})

});



