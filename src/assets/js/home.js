import "lite-youtube-embed";
import BasePage from "./base-page";
import Lightbox from "fslightbox";
window.fslightbox = Lightbox;

class Home extends BasePage {
  onReady() {
    this.initFeaturedTabs();
    this.startCounter();
  }

  /**
   * used in views/components/home/featured-products-style*.twig
   */
  initFeaturedTabs() {
    app.all(".tab-trigger", (el) => {
      el.addEventListener("click", ({ currentTarget: btn }) => {
        let id = btn.dataset.componentId;
        // btn.setAttribute('fill', 'solid');
        app
          .toggleClassIf(
            `#${id} .tabs-wrapper>div`,
            "is-active opacity-0 translate-y-3",
            "inactive",
            (tab) => tab.id == btn.dataset.target
          )
          .toggleClassIf(
            `#${id} .tab-trigger`,
            "is-active",
            "inactive",
            (tabBtn) => tabBtn == btn
          );

        // fadeIn active tabe
        setTimeout(
          () =>
            app.toggleClassIf(
              `#${id} .tabs-wrapper>div`,
              "opacity-100 translate-y-0",
              "opacity-0 translate-y-3",
              (tab) => tab.id == btn.dataset.target
            ),
          100
        );
      });
    });
    document
      .querySelectorAll(".s-block-tabs")
      .forEach((block) => block.classList.add("tabs-initialized"));
  }
  startCounter() {
    // Set the target date for the countdown
    const targetDate = new Date("2025-09-25T00:00:00").getTime();

    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      // Time calculations
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display results
      document.getElementById("days").innerText = days;
      document.getElementById("hours").innerText = hours;
      document.getElementById("minutes").innerText = minutes;
      document.getElementById("seconds").innerText = seconds;

      // If countdown is over
      if (distance < 0) {
        clearInterval(countdown);
        document.getElementById("countdown").innerHTML =
          "<p class='text-xl font-bold'>Offer Expired</p>";
      }
    }, 1000);
  }
}

Home.initiateWhenReady(["index"]);
