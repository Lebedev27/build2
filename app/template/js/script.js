'use strict';

$(function(){
    headerMenu();
    $('.header__burger').click(function(){
       $(this).toggleClass('js-isActive');
       $('.header__burger-menu').toggleClass('js-isActive');
       $('body').toggleClass('overflow-hidden');
    });
    $( window ).resize(function () {
        headerMenu();
    });
    function headerMenu (){
        if ($(window).width() < 976){
            $('.header__navigation').appendTo( $('.header__burger-menu') );
            console.log(123);
        }
        if ($(window).width() < 476){
            $('.header__contacts').appendTo($('.header__burger-menu'));
            console.log(321);
        }
    }
});

$(function(){
    var bannerSwiper = new Swiper('.index-banner__container', {
        slidesPerView: 1,
        loop: true,
        pagination: {
            el: '.index-banner__pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.index-banner__next',
            prevEl: '.index-banner__prev',
        },
    });
    var reviewsSwiper = new Swiper('.reviews__container', {
        slidesPerView: 3,
        spaceBetween: 130,
        loop: true,
        navigation: {
            nextEl: '.reviews__next',
            prevEl: '.reviews__prev',
        },
        breakpoints: {
            1375: {
                spaceBetween: 50,
            },
            975: {
                slidesPerView: 2,
                spaceBetween: 80,
            },
            635: {
                slidesPerView: 2,
                spaceBetween: 50,
            },
            475: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
        }
    });
    var advantagesLeftSwiper = new Swiper('.advantages__left-container', {
        slidesPerView: 3,
        spaceBetween: 10,
        slidesPerColumn: 2,
        navigation: {
            nextEl: '.advantages__left-next',
            prevEl: '.advantages__left-prev',
        },
        breakpoints: {
            635: {
                slidesPerView: 2,
                spaceBetween: 50,
            },
            475: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
        }
    });
    var advantagesRightSwiper = new Swiper('.advantages__right-container', {
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
            nextEl: '.advantages__right-next',
            prevEl: '.advantages__right-prev',
        },
        breakpoints: {
            635: {
                slidesPerView: 3,
                spaceBetween: 50,
            },
            475: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
        }
    });
});

$(function () {
    $('[data-fancybox="gallery"]').fancybox({

    });
});

$(function () {
    $(document).on("blur input", ".question__input", function() {
        if ($(this).val() != "") {
            $(this).addClass("_not-empty")
        } else {
            $(this).removeClass("_not-empty")
        }
    });
    $(document).on("blur textarea", ".question__textarea", function() {
        if ($(this).val() != "") {
            $(this).addClass("_not-empty")
        } else {
            $(this).removeClass("_not-empty")
        }
    });


    $(".header__search").click(function (e) {
        var inputLenght = $('.header__search-input').val();
        console.log(inputLenght);
        if (inputLenght == '' && $('.header__search-input').hasClass("isActive")){
            console.log(1);
            e.preventDefault();
            $('.header__search-input').removeClass("isActive")
        } else if (!$('.header__search-input').hasClass("isActive")) {
            console.log(2);
            e.preventDefault();
            $('.header__search-input').addClass("isActive")
        } else {
            console.log(3);
        }
    });
    
    
    /*$(".header__search").click(function () {
        $('.header__search-form').addClass("isActive")
    });*/
});