// Code under: to open the sidenav on the mobile version
// The hamburger menu vanishes too 

domLogoHamburger = document.getElementById("button_hamburger");
menuPrincipal = document.getElementById("div_menu");

if (domLogoHamburger != null && menuPrincipal != null) {

  domLogoHamburger.addEventListener("click", function (e) {

    console.log('click');
    menuPrincipal.classList.add("visible");
    domLogoHamburger.classList.add("remove_button");

    e.preventDefault();
  });
}

// Code under: to close the sidenav on the mobile version  when you click on the cross or outside the nav
// The hamburger menu reappears when you click
// The X button is not really clickable: the user thinks that he clicked on it, when in fact he clicked on
// the side area that has a lighter transparency. All this area is clickable and closes the menu 

sideNav = document.getElementById("h_div_side_nav");

if (sideNav != null) {

  sideNav.addEventListener("click", function (e) {

    menuPrincipal.classList.remove("visible");
    domLogoHamburger.classList.remove("remove_button");

    e.preventDefault();
  });
}


/********* Code Under : Smooth Scrolling */

/** By Felipen Moura - https://gist.github.com/felipenmoura/650e7e1292c1e7638bcf6c9f9aeb9dd5
 * Will gracefuly scroll the page
 * This function will scroll the page using
 * an `ease-in-out` effect.
 *
 * You can use it to scroll to a given element, as well.
 * To do so, pass the element instead of a number as the position.
 * Optionally, you can pass a `queryString` for an element selector.
 *
 * The default duration is half a second (500ms)
 *
 * This function returns a Promise that resolves as soon
 * as it has finished scrolling. If a selector is passed and
 * the element is not present in the page, it will reject.
 *
 * EXAMPLES:
 *
 * ```js
 * window.scrollPageTo('#some-section', 2000);
 * window.scrollPageTo(document.getElementById('some-section'), 1000);
 * window.scrollPageTo(500); // will scroll to 500px in 500ms
 * ```
 *
 * @returns {Promise}
 * @param {HTMLElement|Number|Selector} Target
 * @param {Number} Duration [default=500]
 *
 * Inspired by @andjosh's work
 *
 */

let arrowToGoDown = document.querySelector(".m_blog_banner_button");

if(arrowToGoDown){
  arrowToGoDown.addEventListener("click", 
    function(){
      scrollPageTo(".m_articles");
    }
  ); 
}

function scrollPageTo (to, duration=1200) {
  //t = current time
  //b = start value
  //c = change in value
  //d = duration
  const easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
  };

  return new Promise((resolve, reject) => {
    const element = document.scrollingElement;

    if (typeof to === 'string') {
      to = document.querySelector(to) || reject();
    }
    if (typeof to !== 'number') {
      to = to.getBoundingClientRect().top + element.scrollTop;
    }

    let start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20;

    const animateScroll = function() {
        currentTime += increment;
        let val = easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        } else {
          resolve();
        }
    };
    animateScroll();
  });
}