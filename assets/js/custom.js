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
    var siteHeader = document.querySelector('.site-header');
    var heroBanner = document.querySelector('.hero-banner');

    if (siteHeader) {
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                siteHeader.classList.add('is-ready');
            });
        });
    }

    // Banner slides up after header entrance finishes
    var showHero = function() {
        if (heroBanner) {
            heroBanner.classList.add('active');
        }
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        showHero();
    } else {
        setTimeout(showHero, 850);
    }

    document.querySelectorAll('.scroll-menu-label[data-label]').forEach(function(label) {
        var text = label.getAttribute('data-label') || '';
        label.textContent = '';
        Array.from(text).forEach(function(char, index) {
            var letter = document.createElement('span');
            letter.className = 'scroll-menu-letter' + (char === ' ' ? ' is-space' : '');
            letter.style.setProperty('--i', index);

            var track = document.createElement('span');
            track.className = 'scroll-menu-letter-track';

            var base = document.createElement('span');
            base.className = 'scroll-menu-letter-base';
            base.textContent = char === ' ' ? '\u00A0' : char;

            var dup = document.createElement('span');
            dup.className = 'scroll-menu-letter-dup';
            dup.setAttribute('aria-hidden', 'true');
            dup.textContent = char === ' ' ? '\u00A0' : char;

            track.appendChild(base);
            track.appendChild(dup);
            letter.appendChild(track);
            label.appendChild(letter);
        });
    });

    var scrollMenuBtn = document.getElementById('scrollMenuBtn');
    var scrollMenu = document.getElementById('scrollMenu');
    var scrollMenuClose = document.getElementById('scrollMenuClose');

    function setMenuOrigin() {
        if (!scrollMenuBtn || !scrollMenu) return;
        var rect = scrollMenuBtn.getBoundingClientRect();
        var x = rect.left + rect.width / 2;
        var y = rect.top + rect.height / 2;
        scrollMenu.style.setProperty('--menu-x', x + 'px');
        scrollMenu.style.setProperty('--menu-y', y + 'px');
    }

    function openMenu() {
        if (!scrollMenu || !scrollMenuBtn) return;
        setMenuOrigin();
        scrollMenu.classList.add('is-open');
        scrollMenu.setAttribute('aria-hidden', 'false');
        scrollMenuBtn.classList.add('is-open');
        scrollMenuBtn.setAttribute('aria-expanded', 'true');
        document.body.classList.add('menu-open');
    }

    function closeMenu() {
        if (!scrollMenu || !scrollMenuBtn) return;
        setMenuOrigin();
        scrollMenu.classList.remove('is-open');
        scrollMenu.setAttribute('aria-hidden', 'true');
        scrollMenuBtn.classList.remove('is-open');
        scrollMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
    }

    if (siteHeader) {
        var isCompact = false;
        var enterAt = 140;
        var leaveAt = 40;

        var onScroll = function() {
            var y = window.scrollY || window.pageYOffset || 0;

            if (!isCompact && y >= enterAt) {
                isCompact = true;
                siteHeader.classList.add('is-compact');
            } else if (isCompact && y <= leaveAt) {
                isCompact = false;
                siteHeader.classList.remove('is-compact');
                if (scrollMenu && scrollMenu.classList.contains('is-open')) {
                    closeMenu();
                }
            }
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    if (scrollMenuBtn && scrollMenu) {
        scrollMenuBtn.addEventListener('click', function() {
            if (scrollMenu.classList.contains('is-open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        if (scrollMenuClose) {
            scrollMenuClose.addEventListener('click', closeMenu);
        }

        scrollMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && scrollMenu.classList.contains('is-open')) {
                closeMenu();
            }
        });

        window.addEventListener('resize', function() {
            if (scrollMenu.classList.contains('is-open')) {
                setMenuOrigin();
            }
        });
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