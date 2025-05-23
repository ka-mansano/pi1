(function() {
  "use strict";

  /** Easy selector helper function **/
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }


  /** Easy on scroll event listener **/
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /** Navbar links active state on scroll **/
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /** Scrolls to an element with header offset **/
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  
  /** Mobile nav toggle **/
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /** Mobile nav dropdowns activate **/
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /** Scrool with ofset on links with a class name .scrollto **/
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /** Scroll with ofset on page load with hash links in the url **/
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /** Initiate glightbox **/
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /** Porfolio isotope and filter **/
  window.addEventListener('load', () => {
    let produtosContainer = select('.produtos-container');
    if (produtosContainer) {
      let produtosIsotope = new Isotope(produtosContainer, {
        itemSelector: '.produtos-item',
        layoutMode: 'fitRows'
      });

      let produtosFilters = select('#produtos-flters li', true);

      on('click', '#produtos-flters li', function(e) {
        e.preventDefault();
        produtosFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        produtosIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

      }, true);
    }

  });

  /** Initiate produtos lightbox **/
  const produtosLightbox = GLightbox({
    selector: '.produtos-lightbox'
  });

  /** FEEDBACK **/
  new Swiper('.feedback-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /** GALERIA **/
  const galeriaLightbox = GLightbox({
    selector: '.galeria-lightbox'
  });

  /** Initiate Pure Counter **/
  new PureCounter();

})
