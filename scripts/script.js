// VARIABLES //

// Get class to show Mobile menu
let dynamicMenu =  $('.js-navigate');

// Get elements to modified active link
let hoverLinks = document.querySelectorAll('.navigate-list__item--hover')

/** 
 * Mange LocalStorage for Editable Mode
 * Variables and Arrays to load the new content (edited elements)
 */
// Get all element to be editable by the user
const editElements = $('.js-editor');
// Save the current HTML elements edited
let sessionEdited = [];
// Get the element in the local storage
let readEditable = localStorage.getItem('neweditedElements');
readEditable = JSON.parse(readEditable) ;

// Load content edited if it was saved before
if(readEditable) {
  let i = 0;
  Array.from(editElements).forEach( function (test) {
    test.innerHTML = readEditable[i] ;
    i++;
  } );
}

$(function () {
  
  //Calculate the height of <header>
  //Use outerHeight() instead of height() if have padding
  let aboveHeight = $('header').outerHeight();
  
  // Fix the navbar/header when user scrolls the page
  $(window).on('scroll', () => {
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
  $('.js-menu-button').on('click', function () {
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


/* EDITABLE MODE */

/** 
 * Setting ctrl + k (windows OS) and cmd + k (Mac OS) 
 * From https://wangchujiang.com/hotkeys/ library
*/
hotkeys('ctrl+k, command+k', (event) => {
  // Show the Options box
  $('.saveEditor')[0].style.display='flex';
  // 'ctrl+k or command+k'
  editElements.each( (idx, editable) => {
    editable.contentEditable="true";
  });
  event.preventDefault();
});

// Save each editable element in a array. Don't lose the edition
$('.js-saveEditor__Ok').on('click', () => {
  
  // Save the editable elements in an array to localstorage
  Array.from(editElements).forEach( function (test) {
    sessionEdited.push(test.textContent) ;
  } );
  // Save in the localstorage
  sessionEdited.forEach( function () {
    localStorage.setItem('neweditedElements', JSON.stringify(sessionEdited));
  });

});

// Close app
$('.js-saveEditor__close').on('click', () => { $('.saveEditor')[0].style.display='none'; });

