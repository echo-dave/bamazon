function menuToggle() {
    if ($("#mobileMenu").css('display') != 'hidden') {
        console.log('mobile menu');

        $("#mobileMenu").on('click', function (event) {
            if ($('.navbar-menu').hasClass('is-active')) {
                $('.navbar-menu').removeClass('is-active')
                console.log('close menu');

            } else {
                $('.navbar-menu').addClass('is-active')
                console.log('open menu');

            }
        })

    }
}

export { menuToggle }