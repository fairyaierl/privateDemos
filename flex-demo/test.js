(function() {
	foo(1, 2);
	var foo = function(num1, num2) {
		return num1 + num2;
	}
})()