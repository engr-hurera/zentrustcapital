"use strict";

/*
|--------------------------------------------------------------------------
| Broker Review Page
|--------------------------------------------------------------------------
|
| This file contains browser-side behaviour only.
|
| It does NOT:
| - query MongoDB
| - calculate broker business scores
| - decide whether a broker is regulated
| - generate pros/cons
|
| The controller has already prepared that data.
|
|--------------------------------------------------------------------------
*/

document.addEventListener("DOMContentLoaded", () => {
  /*
  |--------------------------------------------------------------------------
  | Rating Stars
  |--------------------------------------------------------------------------
  */

  const ratingContainers = document.querySelectorAll(".rating-stars");

  ratingContainers.forEach((container) => {
    const stars = container.querySelectorAll(".star");

    /*
    |--------------------------------------------------------------------------
    | Find rating associated with this page
    |--------------------------------------------------------------------------
    */

    const ratingElement = document.querySelector(".broker-rating");

    if (!ratingElement) {
      return;
    }

    let rating = Number(ratingElement.dataset.rating);

    /*
    |--------------------------------------------------------------------------
    | Validate rating
    |--------------------------------------------------------------------------
    */

    if (Number.isNaN(rating)) {
      rating = 0;
    }

    rating = Math.max(0, Math.min(5, rating));

    /*
    |--------------------------------------------------------------------------
    | Reset stars
    |--------------------------------------------------------------------------
    */

    stars.forEach((star) => {
      star.classList.remove("full-filled-star", "half-filled-star");
    });

    /*
    |--------------------------------------------------------------------------
    | Calculate full stars
    |--------------------------------------------------------------------------
    */

    const fullStars = Math.floor(rating);

    const decimalPart = rating - fullStars;

    /*
    |--------------------------------------------------------------------------
    | Full stars
    |--------------------------------------------------------------------------
    */

    for (let index = 0; index < fullStars && index < stars.length; index++) {
      stars[index].classList.add("full-filled-star");
    }

    /*
    |--------------------------------------------------------------------------
    | Half star
    |--------------------------------------------------------------------------
    */

    if (decimalPart >= 0.25 && decimalPart < 0.75 && fullStars < stars.length) {
      stars[fullStars].classList.add("half-filled-star");
    }

    /*
    |--------------------------------------------------------------------------
    | Round up to full star
    |--------------------------------------------------------------------------
    */

    if (decimalPart >= 0.75 && fullStars < stars.length) {
      stars[fullStars].classList.add("full-filled-star");
    }
  });

  /*
  |--------------------------------------------------------------------------
  | Prevent broken rating data from causing errors
  |--------------------------------------------------------------------------
  */

  const scoreCircle = document.querySelector(".score-circle");

  if (scoreCircle) {
    const ratingElement = document.querySelector(".broker-rating");

    if (ratingElement) {
      const rating = Number(ratingElement.dataset.rating);

      if (!Number.isNaN(rating)) {
        const percentage = Math.max(0, Math.min(100, rating * 20));

        scoreCircle.style.setProperty("--pages-pct", percentage);
      }
    }
  }
});
