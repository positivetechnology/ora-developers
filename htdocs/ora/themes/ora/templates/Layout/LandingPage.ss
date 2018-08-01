<div class="full-height-wrapper">
  <div class="full-height" data-scroll data-animate-scroll>
    <div class="full-height__section" data-section data-url="#home">
      <div data-lazy-load="https://source.unsplash.com/FIKD9t5_5zQ/1920x1000" class="full-height__bg full-height__bg--page-1"></div>
      <div class="homepage">
        <div class="homepage__content">
          <a href="#about-us" data-scroll-link>
            <img class="homepage__logo" src="/img/logo.png" alt="Ora logo" />
          </a>
          <h1 class="homepage__title">More than developers</h1>
        </div>
      </div>
    </div>
    <div class="full-height__section" data-section data-url="#about-us">
      <div class="about container">
        <div class="row">
          <div class="col">
            <h2 class="about__title">About Us</h2>
            <h3 class="about__subtitle">We dream big</h3>
            <p class="about__text">We design to make a difference and bring happiness.</p>
            <p class="about__text">We embrace creativity, innovation, sustainibility and harmony.</p>
            <p class="about__text">We are more than developers</p>

            <div class="about__person">
              <img src="https://image.flaticon.com/icons/svg/194/194935.svg" class="about__person__image" alt="" />
              <span class="about__person__text">
                <strong>Naguib Sawiris</strong><br />
                Interview
              </span>
            </div>
            <div data-video>
              <button data-video-btn class="about__video__btn" aria-label="Play">&#x25BA;</button>
              <div class="about__video-wrapper">
                <video data-video-video class="about__video l-fluid-video">
                  <source src="https://www.w3schools.com/htmL/mov_bbb.mp4" type="video/mp4">
                  <source src="https://www.w3schools.com/htmL/mov_bbb.ogg" type="video/ogg">
                  Your browser does not support HTML5 video.
                </video>
                <button data-video-btn class="about__video__close" aria-label="Close"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="full-height__section" data-section data-url="#our-developments">
      <div data-carousel='{"arrows" : false}'>
        <div data-carousel-items class="carousel slide">
          <div class="carousel-item carousel-item--full-height" data-carousel-item="1">
            <div data-lazy-load='{"default" : "https://source.unsplash.com/AB6z0-LIOX8/768x400", "md-only" : "https://source.unsplash.com/AB6z0-LIOX8/1152x600", "lg-up" : "https://source.unsplash.com/AB6z0-LIOX8/1920x1000"}' class="full-height__bg"></div>
          </div>
          <div class="carousel-item carousel-item--full-height" data-carousel-item="2">
            <div data-lazy-load="https://source.unsplash.com/_8rjlHwN4uk/1920x1000" class="full-height__bg"></div>
          </div>
        </div>
        <div class="carousel-controls">
          <button data-carousel-arrow-prev class="carousel-controls__item carousel-control carousel-control-prev-icon" aria-label="Previous" type="button">Previous</button>
          <div data-carousel-count class="carousel-controls__item carousel-count"></div>
          <button data-carousel-arrow-next class="carousel-controls__item carousel-control carousel-control-next-icon" aria-label="Next" type="button">Next</button>
        </div>
      </div>
    </div>
    <div class="full-height__section full-height__section--bg-white" data-section data-url="#gallery">
      <% include CarouselGrid %>
    </div>
  </div>
</div>
