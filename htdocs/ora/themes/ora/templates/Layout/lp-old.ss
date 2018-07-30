<div class="full-height-wrapper">
  <div class="full-height" data-scroll data-animate-scroll>
    <div class="full-height__section" data-section>
      <div data-lazy-load="https://source.unsplash.com/R9OueKOtGGU/1920x1000" class="full-height__bg full-height__bg--page-1"></div>
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
      <div class="row">
        <div class="col-12 col-md-8 text-center">
          content goes here
        </div>
      </div>
    </div>
    <div class="full-height__section" data-section data-url="#our-developments">
      <% include CarouselGrid %>
    </div>

    <div class="full-height__section" data-section data-url="#gallery">
      <div data-carousel data-gallery-carousel class="carousel slide gallery">
        <div class="carousel-inner">

          <div class="carousel-item carousel-item--full-height active" data-carousel-item="1">
            <div class="row">
              <div class="col">
                <div data-lazy-load="https://source.unsplash.com/RGsn47YSJ9U/1920x1000" class="gallery__bg gallery__bg--lg"></div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div data-lazy-load="https://source.unsplash.com/_tF9kFirZf0/1920x1000" class="gallery__bg"></div>
              </div>
              <div class="col">
                <div data-lazy-load="https://source.unsplash.com/yMzboNXo3oo/1920x1000" class="gallery__bg"></div>
              </div>
            </div>
          </div>

          <div class="carousel-item carousel-item--full-height" data-carousel-item="2">
            <div class="row">
              <div class="col">
                <div data-lazy-load="https://source.unsplash.com/_tF9kFirZf0/1920x1000" class="gallery__bg"></div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div data-lazy-load="https://source.unsplash.com/yMzboNXo3oo/1920x1000" class="gallery__bg"></div>
              </div>
            </div>
          </div>

        </div>
        <div class="carousel-controls">
          <a class="carousel-control-prev carousel-control carousel-controls__item" href="[data-gallery-carousel]" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          </a>
          <div class="carousel-count carousel-controls__item" data-carousel-count></div>
          <a class="carousel-control-next carousel-control carousel-controls__item" href="[data-gallery-carousel]" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
          </a>
        </div>
    </div>
  </div>
</div>
