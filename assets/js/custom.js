// portfolio
$('.gallery ul li a').click(function() {
    var itemID = $(this).attr('href');
    $('.gallery ul').addClass('item_open');
    $(itemID).addClass('item_open');
    $('html, body').animate({
        scrollTop: $(itemID).offset().top
    }, 400);
    return false;
});

$('.close').click(function() {
    $('.port, .gallery ul').removeClass('item_open');
    return false;
});



(function($) {
    'use strict';

    // Main Navigation
    $( '.hamburger-menu' ).on( 'click', function() {
        $(this).toggleClass('open');
        $('.site-navigation').toggleClass('show');
    });


    


})(jQuery);



document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.hero-banner')?.classList.add('active');

    var header = document.querySelector('.site-header');
    if (header) {
        var onScroll = function() {
            if (window.scrollY > 12) {
                header.classList.add('is-sticky');
            } else {
                header.classList.remove('is-sticky');
            }
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }
});


// Function to type out text with a typing effect
function typeOutText(words, id, speed) {
    let index = 0; // Initialize index for the current word
    let timer; // Declare timer variable

    // Function to start typing
    function startTyping() {
        let i = 0; // Initialize index for the current character
        timer = setInterval(function() {
            // Check if there are characters left to type for the current word
            if (i < words[index].length) {
                document.getElementById(id).textContent += words[index][i]; // Append the next character
                i++; // Increment the character index
            } else {
                clearInterval(timer); // Clear the interval once all characters have been typed
                setTimeout(function() {
                    // After a delay, start erasing the typed word
                    eraseText();
                }, 1000); // Wait for 1 second before erasing
            }
        }, speed); // Set the typing speed
    }

    // Function to erase the typed text
    function eraseText() {
        let i = words[index].length - 1; // Initialize index for the last character
        timer = setInterval(function() {
            // Check if there are characters left to erase
            if (i >= 0) {
                let newText = words[index].substring(0, i); // Remove the last character
                document.getElementById(id).textContent = newText; // Update the displayed text
                i--; // Decrement the character index
            } else {
                clearInterval(timer); // Clear the interval once all characters have been erased
                index = (index + 1) % words.length; // Move to the next word in the array (loop back to the first word if necessary)
                setTimeout(function() {
                    // After a delay, start typing the next word
                    startTyping();
                }, 500); // Wait for 0.5 seconds before typing the next word
            }
        }, speed); // Set the erasing speed
    }

    // Start typing the first word
    startTyping();
}

// Call the function with your words, target id, and speed (in milliseconds)
if (document.getElementById("typed-text")) {
    typeOutText(["UI/UX Designer", "Wordpress Developer", "Frontend - Developer"], "typed-text", 100);
}

(function() {
	'use strict';


    /* 7. data-background */
    $("[data-background]").each(function () {
        $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
        });

var portfolioMasonry = function() {
    $('.filters ul li').click(function(){
           $('.filters ul li').removeClass('active');
           $(this).addClass('active');
           
           var data = $(this).attr('data-filter');
           $grid.isotope({
             filter: data
           })
         });
   
   
         if(document.getElementById("section-portfolio")){
               var $grid = $(".grid").isotope({
                 itemSelector: ".all",
                 percentPosition: true,
                 masonry: {
                   columnWidth: ".all"
                 }
               })
         };
   
   
       };
   



$(function(){

    portfolioMasonry();
});


})();