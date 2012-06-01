window.Portfolio.ApplicationExcption  = function (message) {
	this.message = message;
	_logat();
	function _logat() {
		console.error(message);
	}
}
Portfolio.ApplicationExcption.prototype = new Error;