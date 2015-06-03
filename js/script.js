//Гамбургер
(function() {

	var btn = document.querySelector('.open-menu-btn');
	var wrap = document.querySelector('.page-header');

	btn.addEventListener("tap", function(){

		if (wrap.classList.contains('js-open-menu') == false){
			wrap.classList.add('js-open-menu');
		}
		else {
			wrap.classList.remove('js-open-menu');
		}
	});


})();

//"Оживление" числовых полей
(function() {

	var minus = document.querySelectorAll(".js-minus");
	var plus = document.querySelectorAll(".js-plus");

	for (var i = 0; i < minus.length; i++) {

		minus[i].addEventListener("tap", function(){


			event.preventDefault();

			var wrap = this.parentNode;
			var input = wrap.querySelector('input');
			var input_value = parseInt(input.value);
			var new_value = 0;

			if (!isNaN(input_value)) {
				new_value = input_value - 1;

				if (new_value < 0){
					new_value = 0;
				}
			}

			input.value = new_value;
		})

	};

	for (var i = 0; i < plus.length; i++) {

		plus[i].addEventListener("tap", function(){

			event.preventDefault();

			var wrap = this.parentNode;
			var input = wrap.querySelector('input');
			var input_value = parseInt(input.value);
			var new_value = 0;

			

			if (!isNaN(input_value)) {
				new_value = input_value + 1;
			}

			input.value = new_value;

		})

	};
})();


//Отправка формы с помощью AJAX
(function() {

	if (!("FormData" in window)) { 
		return; 
	} 

	var form = document.querySelector(".worksheet"); 
	
	form.addEventListener("submit", function(event) { 
		event.preventDefault(); 
		
		var data = new FormData(form); 
		
		request(data, function(response) { 
			console.log(response); 
		}); 

	});

	function request(data, fn) { 

			var xhr = new XMLHttpRequest();
			var time = (new Date()).getTime();

			xhr.open("post", "http://simonenko.su/academy/echo?" + time); 

			xhr.addEventListener("readystatechange", function() { 
			if (xhr.readyState == 4) { 
				fn(xhr.responseText); 
			} 
		}); 

		xhr.send(data); 

	}

})();