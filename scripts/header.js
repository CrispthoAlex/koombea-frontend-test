// VARIABLES //

// Get class to show Mobile menu
let dynamicMenu =  $('.js-navigate');

// Get elements to modified active link
let hoverLinks = document.querySelectorAll('.navigate-list__item--hover')


$(document).ready(function () {
  
  //Calculate the height of <header>
  //Use outerHeight() instead of height() if have padding
  let aboveHeight = $('header').outerHeight();
  
  // Fix the navbar/header when user scrolls the page
  $(window).scroll(() => {
      //if scrolled down more than the header’s height
      if ($(window).scrollTop() > aboveHeight) {
        // if yes, add “fixed” class to the <nav>
        // add padding top to the #content (value is same as the height of the nav)
        $('.main-header').addClass('fixed');
      }
      else {
        // when scroll up or less than aboveHeight, remove the “fixed” class, and the padding-top
        $('.main-header').removeClass('fixed');
      }
    });

  // Toggle class from Small and Medium device menu
  $('.js-menu-button').click(function () {
      //hamburgerMenu.toggleClass('mobile-menu-hidden');
      dynamicMenu.toggleClass('navigate--opened');
      this.classList.toggle('menu-button--opened');
      this.setAttribute('aria-expanded', this.classList.contains('menu-button--opened'));
    });

  // Loop through the links and add the active class to the current/clicked link
  hoverLinks.forEach(activelink => {
    activelink.addEventListener('click', function() {
      // Remove last element with active class
      hoverLinks.forEach(link => link.classList.remove('active'));
      // Add to current element the active class
      this.classList.add('active');
    });
  });
});
