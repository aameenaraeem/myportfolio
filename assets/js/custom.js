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

    // Main Navigation — desktop/mobile now share the black circle scroll menu
    // Legacy hamburger toggle kept inert if markup is reintroduced elsewhere.


    


})(jQuery);



document.addEventListener("DOMContentLoaded", function() {
    var siteHeader = document.querySelector('.site-header');
    var heroBanner = document.querySelector('.hero-banner');
    var introPreloader = document.getElementById('introPreloader');
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    var skipIntro = document.documentElement.classList.contains('skip-intro');

    var forceScrollTop = function() {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    };

    var scrollToHash = function() {
        if (!location.hash) return false;
        var target = document.querySelector(location.hash);
        if (!target) return false;
        target.scrollIntoView();
        return true;
    };

    if (!skipIntro) {
        forceScrollTop();
    }

    var revealSite = function() {
        if (siteHeader) {
            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    siteHeader.classList.add('is-ready');
                });
            });
        }

        var showHero = function() {
            if (heroBanner) {
                heroBanner.classList.add('active');
            }
        };

        if (prefersReducedMotion) {
            showHero();
        } else {
            setTimeout(showHero, 850);
        }
    };

    var finishPreloader = function() {
        forceScrollTop();
        document.body.classList.remove('is-preloading');
        forceScrollTop();

        if (!introPreloader) {
            revealSite();
            return;
        }

        introPreloader.classList.add('is-open');
        introPreloader.setAttribute('aria-hidden', 'true');
        revealSite();

        setTimeout(function() {
            forceScrollTop();
            if (introPreloader && introPreloader.parentNode) {
                introPreloader.parentNode.removeChild(introPreloader);
            }
        }, prefersReducedMotion ? 450 : 1100);
    };

    if (skipIntro) {
        document.body.classList.remove('is-preloading');
        if (introPreloader && introPreloader.parentNode) {
            introPreloader.parentNode.removeChild(introPreloader);
        }
        revealSite();
        if (!scrollToHash()) {
            forceScrollTop();
        }
        window.addEventListener('load', function() {
            if (!scrollToHash()) {
                forceScrollTop();
            }
        });
    } else if (introPreloader) {
        try {
            sessionStorage.setItem('introPlayed', '1');
        } catch (e) {}

        // Keep page pinned to top while browser tries to restore scroll
        var pinTop = setInterval(forceScrollTop, 50);

        if (prefersReducedMotion) {
            clearInterval(pinTop);
            finishPreloader();
        } else {
            requestAnimationFrame(function() {
                introPreloader.classList.add('is-shimmer');
            });

            // Shimmer done → solid full text (no transparent glyphs)
            setTimeout(function() {
                introPreloader.classList.add('is-shimmer-done');
                introPreloader.classList.add('is-splitting');
            }, 1750);

            // Fade whole line out first so panels never crop it
            setTimeout(function() {
                introPreloader.classList.add('is-text-out');
            }, 2200);

            // Open doors only after text is gone
            setTimeout(function() {
                clearInterval(pinTop);
                finishPreloader();
            }, 2700);
        }

        window.addEventListener('load', forceScrollTop);
    } else {
        forceScrollTop();
        revealSite();
        window.addEventListener('load', forceScrollTop);
    }

    var portSection = document.getElementById('port');
    if (portSection) {
        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            portSection.classList.add('is-in');
        } else {
            var portObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (!entry.isIntersecting) return;
                    portSection.classList.add('is-in');
                    portObserver.disconnect();
                });
            }, { threshold: 0.16, rootMargin: '0px 0px -10% 0px' });
            portObserver.observe(portSection);
        }
    }

    var expSection = document.getElementById('experience');
    if (expSection) {
        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            expSection.classList.add('is-in');
        } else {
            var expObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (!entry.isIntersecting) return;
                    expSection.classList.add('is-in');
                    expObserver.disconnect();
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
            expObserver.observe(expSection);
        }
    }

    var pageWipe = document.getElementById('pageWipe');

    var removePageWipe = function(wipeEl) {
        var wipe = wipeEl || document.getElementById('pageWipe');
        document.documentElement.classList.remove('page-enter');
        if (wipe && wipe.parentNode) {
            wipe.parentNode.removeChild(wipe);
        }
    };

    // Browser back/forward can restore a page from bfcache while the black
    // wipe is still covering it. Clear that frozen overlay so home is visible.
    var recoverFromHistory = function() {
        document.documentElement.classList.remove('page-enter');
        document.body.classList.remove('menu-open', 'is-preloading');
        removePageWipe();

        var intro = document.getElementById('introPreloader');
        if (intro && intro.parentNode) {
            intro.parentNode.removeChild(intro);
        }
        document.documentElement.classList.add('skip-intro');

        if (siteHeader) {
            siteHeader.classList.add('is-ready');
        }
        if (heroBanner) {
            heroBanner.classList.add('active');
        }
    };

    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            recoverFromHistory();
            return;
        }

        // Non-bfcache back can still leave a covering wipe if navigation aborted
        var wipe = document.getElementById('pageWipe');
        if (wipe && wipe.classList.contains('is-cover') && !wipe.classList.contains('is-reveal') && !document.documentElement.classList.contains('page-enter')) {
            removePageWipe(wipe);
        }
    });

    window.addEventListener('pagehide', function() {
        document.documentElement.classList.remove('page-enter');
        var wipe = document.getElementById('pageWipe');
        if (wipe) {
            wipe.classList.remove('is-cover', 'is-holding', 'is-reveal');
        }
    });

    var shouldRevealWipe = pageWipe && (
        pageWipe.classList.contains('is-holding') ||
        document.documentElement.classList.contains('page-enter')
    );

    if (shouldRevealWipe && !prefersReducedMotion) {
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                pageWipe.classList.add('is-reveal');
            });
        });
        var clearWipe = function() {
            removePageWipe(pageWipe);
        };
        pageWipe.addEventListener('transitionend', function(evt) {
            if (evt.propertyName !== 'transform') return;
            clearWipe();
        });
        setTimeout(clearWipe, 800);
    } else if (pageWipe && pageWipe.parentNode) {
        removePageWipe(pageWipe);
    }

    function isPageChange(link) {
        if (!link || link.target === '_blank' || link.hasAttribute('download')) return false;
        var raw = link.getAttribute('href') || '';
        if (!raw || raw.charAt(0) === '#' || raw.indexOf('mailto:') === 0 || raw.indexOf('tel:') === 0 || raw.indexOf('javascript:') === 0) return false;
        var next;
        try {
            next = new URL(link.href, window.location.href);
        } catch (e) {
            return false;
        }
        if (next.origin !== window.location.origin) return false;
        return next.pathname !== window.location.pathname;
    }

    document.addEventListener('click', function(event) {
        if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (event.button !== 0) return;

        var link = event.target.closest('a[href]');
        if (!isPageChange(link)) return;
        if (prefersReducedMotion) return;

        event.preventDefault();
        event.stopImmediatePropagation();

        var wipe = document.querySelector('.page-wipe');
        if (!wipe) {
            wipe = document.createElement('div');
            wipe.className = 'page-wipe';
            wipe.id = 'pageWipe';
            document.body.appendChild(wipe);
        }

        wipe.getBoundingClientRect();
        wipe.classList.add('is-cover');

        var go = function() {
            try {
                sessionStorage.setItem('pageEnter', '1');
            } catch (e) {}
            window.location.href = link.href;
        };
        var left = false;
        wipe.addEventListener('transitionend', function(evt) {
            if (evt.propertyName !== 'transform' || left) return;
            left = true;
            go();
        });
        setTimeout(function() {
            if (!left) {
                left = true;
                go();
            }
        }, 620);
    }, true);

    document.addEventListener('click', function(event) {
        var link = event.target.closest('a[href^="#"]');
        if (!link) return;
        var hash = link.getAttribute('href');
        if (!hash || hash === '#') return;
        var target = document.querySelector(hash);
        if (!target) return;
        event.preventDefault();

        // Close the full-screen menu first — otherwise overflow:hidden blocks
        // scrolling and the black overlay stays on top of the section.
        var menu = document.getElementById('scrollMenu');
        var menuBtn = document.getElementById('scrollMenuBtn');
        if (menu && menu.classList.contains('is-open')) {
            menu.classList.remove('is-open');
            menu.setAttribute('aria-hidden', 'true');
            if (menuBtn) {
                menuBtn.classList.remove('is-open');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
            document.body.classList.remove('menu-open');
        }

        var goToSection = function() {
            target.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth',
                block: 'start'
            });
            if (history.pushState) {
                history.pushState(null, '', hash);
            } else {
                location.hash = hash;
            }
        };

        requestAnimationFrame(function() {
            requestAnimationFrame(goToSection);
        });
    }, true);

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