describe('jquery-ajax-hijack', function(){
	describe('initialization', function(){

		it('must have jquery as a prerequisite', function(){
			expect(jQuery).toBeDefined();
		});

		it('adds a hijack function to jQuery.ajax', function(){
			expect(typeof jQuery.ajax.hijack).toBe('function');
		});
	});

	describe('bookkeeping', function(){
		it('calling hijack() creates a new ajax function while unwrap restores it', function(){
			var oldAjax = jQuery.ajax;
			// Slightly surprisingly, ajax isn't on the prototype
			expect(jQuery.hasOwnProperty('ajax')).toBeTruthy();
			jQuery.ajax.hijack();
			expect(jQuery.ajax).not.toEqual(oldAjax);
			expect(typeof jQuery.ajax.hijack).toBe('function');

			var nextAjax = jQuery.ajax;
			jQuery.ajax.hijack();
			expect(jQuery.ajax).not.toEqual(nextAjax);


			jQuery.ajax.unwrap();
			expect(jQuery.ajax).toEqual(nextAjax);

			jQuery.ajax.unwrap();
			expect(jQuery.ajax).toEqual(oldAjax);
		});

		it('calling hijack without arguments just results in a ajax function which passes through arguments', function(){
			var spy = spyOn(jQuery,'ajax');
			expect(typeof jQuery.ajax.hijack).toBe('function');
			jQuery.ajax.hijack();

			try {
				expect(typeof jQuery.ajax.hijack).toBe('function');

				jQuery.ajax('abc', 'def');
				expect(spy.calls.first().args).toEqual([['abc', 'def']]);
			} catch(e){
			} finally {
				jQuery.ajax.unwrap();
			}
		});
	});


	it('should pass', function(){
		//expect(true).toBe(false);
	});
})