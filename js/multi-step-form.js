/**
 * File multi-step-form.js.
 *
 * Validation functions for the quote form
 */

(function($) {

    $('document').ready(function() {
        
        // Remove wrapping
        $("input.file-upload").unwrap();

        // Add capture attribute
        $('.file-upload').attr('capture','camera').attr('accept','image/*');

        jQuery.validator.addMethod('phoneUK', function(phone_number, element) {
            return this.optional(element) || phone_number.length > 9 &&
                phone_number.match(/^(\(?(0|\+44)[1-9]{1}\d{1,4}?\)?\s?\d{3,4}\s?\d{3,4})$/);
        }, 'Please specify a valid phone number');

        // Matches UK postcode. Does not match to UK Channel Islands that have their own postcodes (non standard UK)
        $.validator.addMethod("postcodeUK", function(value, element) {
            return this.optional(element) || /^((([A-PR-UWYZ][0-9])|([A-PR-UWYZ][0-9][0-9])|([A-PR-UWYZ][A-HK-Y][0-9])|([A-PR-UWYZ][A-HK-Y][0-9][0-9])|([A-PR-UWYZ][0-9][A-HJKSTUW])|([A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]))\s?([0-9][ABD-HJLNP-UW-Z]{2})|(GIR)\s?(0AA))$/i.test(value);
        }, "Please specify a valid UK postcode");

        var _validator;

        // validate signup form on keyup and submit
        _validator = $(".wpcf7-form").validate({
            rules: {
                firstname: "required",
                lastname: "required",
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true,
                    phoneUK: true
                },
                postcode: {
                    required: true,
                    postcodeUK: true
                },
                propertytype: "required",
                gassupply: "required",
                radiators: {
                    required: true,
                    number: true
                },
                img1: {
                    required: true,
                    accept: "image/*"
                },
                img2: {
                    required: true,
                    accept: "image/*"
                },
                img3: {
                    required: true,
                    accept: "image/*"
                },
                img4: {
                    required: true,
                    accept: "image/*"
                },
                img5: {
                    required: true,
                    accept: "image/*"
                },
                img6: {
                    required: true,
                    accept: "image/*"
                },
            },
            messages: {
                firstname: "Please enter your first name",
                lastname: "Please enter your last name",
                email: "Please enter a valid email address",
                img1: "Please choose an image",
                img2: "Please choose an image",
                img3: "Please choose an image",
                img4: "Please choose an image",
                img5: "Please choose an image",
                img6: "Please choose an image",
            },
            errorPlacement: function(error, element) {
                if ( element.attr("name") == "img1" || element.attr("name") == "img2" || element.attr("name") == "img3" || element.attr("name") == "img4" || element.attr("name") == "img5" || element.attr("name") == "img6" ) {
                    error.appendTo( element.closest('div') );

                    $('#img-errors').html('<label class="error">Please ensure you have supplied all the images.</label>');

                } else {
                    error.insertAfter(element);
                }
            }
        });

        function step1HasError() {
            var hasError = false;
            if (!_validator.element($('#firstname'))) { hasError = true }
            if (!_validator.element($('#lastname'))) { hasError = true }
            if (!_validator.element($('#phone'))) { hasError = true }
            if (!_validator.element($('#email'))) { hasError = true }
            return hasError;
        }

        function moveToStep2() {
            $('#step-1, .step-1').removeClass('active').addClass('complete');
            $('#step-2, .step-2').addClass('active');
            $('.multi-step-form').addClass('step-2-active');
        }

        $('.step-1-next').click(function() {
            if (step1HasError() == false) { // If step 1 contains no errors, then move to next step
                moveToStep2();
            }
            return false;
        });

        function step2HasError() {
            var hasError = false;
            if (!_validator.element($('#propertytype'))) { hasError = true }
            if (!_validator.element($('#gassupply'))) { hasError = true }
            if (!_validator.element($('#radiators'))) { hasError = true }
            if (!_validator.element($('#postcode'))) { hasError = true }
            return hasError;
        }

        function moveToStep3() {
            $('#step-2, .step-2').removeClass('active').addClass('complete');
            $('#step-3, .step-3').addClass('active');
            $('.multi-step-form').addClass('step-3-active');
        }

        $('.step-2-next').click(function() {
            if (step2HasError() == false) { // If step 2 contains no errors, then move to next step
                moveToStep3();
            }
            return false;
        });

        function step3HasError() {
            var hasError = false;
            if (!_validator.element($('#img1'))) { hasError = true }
            if (!_validator.element($('#img2'))) { hasError = true }
            if (!_validator.element($('#img3'))) { hasError = true }
            if (!_validator.element($('#img4'))) { hasError = true }
            if (!_validator.element($('#img5'))) { hasError = true }
            if (!_validator.element($('#img6'))) { hasError = true }
            return hasError;
        }

        $('.multi-step-form .wpcf7-submit').click(function() {
            if (step3HasError() == true) { // If step 3 contains errors, then don't submit
                event.preventDefault();
                return false;
            }
        });

        // Prevent form submit using enter key, and skip through steps insted
        $(window).keydown(function(event) {
            if (event.keyCode == 13) {

                if ($('#step-1').hasClass('active')) { // If step 1 is active...
                    if (!step1HasError() == true) { // and doesn't have errors errors
                        moveToStep2();
                    }
                }
                if ($('#step-2').hasClass('active')) { // If step 2 is active...
                    if (!step2HasError() == true) { // and doesn't have errors errors
                        moveToStep3();
                    }
                }

                // Prevent form submission
                event.preventDefault();
                return false;

            }
        });

    });


    $( '.file-upload' ).each( function() {
		var $input	 = $( this ),
			$label	 = $input.closest('div').find('.choose-an-img'),
			labelVal = $label.html();

        $input.on( 'change', function( e ) {
			var fileName = '';

			if( e.target.value )
				fileName = e.target.value.split( '\\' ).pop();

			if( fileName ) {
				$label.html( fileName );
                $input.closest('div').addClass('img-added');
            } else {
				$label.html( labelVal );
            }
		});

		// Firefox bug fix
		$input
		.on( 'focus', function(){ $input.addClass( 'has-focus' ); })
		.on( 'blur', function(){ $input.removeClass( 'has-focus' ); });
	});



})(jQuery);