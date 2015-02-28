(function(jQuery){
	if (!jQuery) {
		throw 'jQuery is needed to install jquery-ajax-hijack';
		return;
	};

	var hijack = function(){
		var oldAjax = this;
		// This doesn't really apply in this case with jQuery.ajax, but
		// is good in general when the original is on prototype
		var isOriginal = !jQuery.hasOwnProperty('ajax');
		jQuery.ajax = function(){
			oldAjax.call(this, Array.prototype.slice.apply(arguments));
		};
		jQuery.ajax.unwrap = function(){
			if (isOriginal) {
				delete jQuery.ajax;
			} else {
				jQuery.ajax = oldAjax;
			};
		};
 
		jQuery.ajax.hijack = hijack;
	};

	jQuery.ajax.hijack = hijack;
})($);