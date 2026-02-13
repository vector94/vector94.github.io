var doc = jQuery(document);

doc.ready(function () {
  "use strict";

  $(window).scrollTop(0);

  function initializeTyped() {
    try {
      if (typeof Typed !== "undefined") {
        var typed = new Typed(".mytext", {
          strings: [
            "Md Asif Iqbal Ahmed",
            "a Software Engineer",
            "a Competitive Programmer",
          ],
          smartBackspace: true,
          loop: true,
          backDelay: 1000,
          typeSpeed: 20,
        });
      } else {
        $(".mytext").text("Md Asif Iqbal Ahmed");
      }
    } catch (error) {
      $(".mytext").text("Md Asif Iqbal Ahmed");
    }
  }

  function initializeNavigation() {
    try {
      if ($.fn.onePageNav) {
        $(".navbar-nav").onePageNav({
          currentClass: "active",
        });
      }
    } catch (error) {
      $('.navbar-nav a[href^="#"]').on("click", function (e) {
        e.preventDefault();
        var target = $(this.getAttribute("href"));
        if (target.length) {
          $("html, body").animate(
            {
              scrollTop: target.offset().top - 70,
            },
            750
          );
        }
      });
    }
  }

  function initializeScrollHandlers() {
    if ($(window).scrollTop() < 200) {
      $(".navbar-nav").addClass("navbar-nav-bg");
    }

    $(window).scroll(function () {
      var top = $(window).scrollTop();

      if (top >= 200) {
        $("header").addClass("overlay");
        $(".navbar-nav").removeClass("navbar-nav-bg");
      } else if ($("header").hasClass("overlay")) {
        $("header").removeClass("overlay");
      } else {
        $(".navbar-nav").addClass("navbar-nav-bg");
      }
    });
  }

  function initializeAnimations() {
    $(".animation").each(function () {
      var waypoint = new Waypoint({
        element: this,
        handler: function (direction) {
          var cssvalue = $(this.element).attr("data-animation");
          $(this.element).addClass("animated " + cssvalue);
          $(this.element).css("opacity", "1").fadeIn(2000);
        },
        offset: "70%",
      });
    });
  }

  function initializePortfolio() {
    try {
      var $grid = $(".portfolio-container").isotope({
        itemSelector: ".portfolio-item",
      });

      $(".filter li").on("click", function () {
        $(".filter li").removeClass("filter-active");
        var filterValue = $(this).attr("data-filter");
        $grid.isotope({ filter: filterValue });
        $(this).addClass("filter-active");
      });
    } catch (error) {
      $(".filter li").on("click", function () {
        var filterValue = $(this).attr("data-filter");
        $(".filter li").removeClass("filter-active");
        $(this).addClass("filter-active");

        var items = $(".portfolio-item");
        items.hide();
        if (filterValue === "*") {
          items.show();
        } else {
          items.filter(filterValue).show();
        }
      });
    }
  }

  function initializeVideoPlayback() {
    $(".portfolio-item video").each(function () {
      var video = this;
      $(this).closest(".portfolio-item").on("mouseenter", function () {
        video.play();
      }).on("mouseleave", function () {
        video.pause();
      });

      $(this).on("click", function () {
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        }
      });
    });
  }

  setTimeout(initializeTyped, 100);
  setTimeout(initializeNavigation, 200);
  setTimeout(initializeScrollHandlers, 300);
  setTimeout(initializePortfolio, 400);
  setTimeout(initializeVideoPlayback, 500);

  setTimeout(function () {
    if (typeof Waypoint !== "undefined") {
      initializeAnimations();
    } else {
      $(".animation").css("opacity", "1");
    }
  }, 500);
});
