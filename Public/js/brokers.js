document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const tag = btn.dataset.tag;
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".broker-row").forEach((row) => {
      if (tag === "all" || row.dataset.tags?.includes(tag)) {
        row.style.display = "grid";
      } else {
        row.style.display = "none";
      }
    });
  });
});

let abc = `<%- include('partials/theme-home-btn') %>`;
console.log("theme is", abc);

// MY LOGIC ::::::::::::::::::::::::::::::::::::::::::
// :::::::::::::::::::::::: FINAL RESOLVED LOGIC ::::::::::::::::::::::::

// 1. Find all hidden inputs/elements with the class '.brokerId' on the page and loop through each one
document.querySelectorAll(".brokerId").forEach((broker) => {
  // Log the adjacent element container (the container right next to our ID input) to verify DOM tracking
  console.log("Next sibling container:", broker.nextElementSibling);

  // 2. Look INSIDE this specific broker's next sibling container to find ONLY its 5 star elements
  // This isolates our star search so we never accidentally touch another broker's stars
  let ratingStars =
    broker.nextElementSibling.querySelectorAll(".rating-stars span");

  // 3. Find the element holding the rating data attribute INSIDE this broker's specific container
  // RESOLVED BUG: Changed from '#' (ID) to '.' (Class) to prevent duplicate ID selector bugs on the page
  let brokerRatingElement =
    broker.nextElementSibling.querySelector(".broker-rating");

  // Read the rating string value out of the 'data-rating' attribute on that element
  let rating = brokerRatingElement.dataset.rating;

  // Debug logs to verify we have the right data and strings in the browser console
  console.log("Current broker data rating string:", rating);
  console.log("Type of rating variable:", typeof rating);
  console.log("Target stars for this broker:", ratingStars);

  // 4. Convert the rating string to a number and loop through our star index count (up to max rating)
  for (let i = 0; i < Number(rating); i++) {
    // Check if the overall rating is a clean whole integer (e.g., 4 or 5)
    // The '+' shorthand converts the string 'rating' into a number before checking
    if (Number.isInteger(+rating)) {
      console.log("The rating number is a whole integer:", rating);

      // Add the full-star styling class to the star at the current loop index 'i'
      ratingStars[i].classList.add("full-filled-star");
    } else {
      // If the number contains decimals (e.g., 0.6 or 4.5), execute this fallback branch
      console.log("The rating number is a decimal/fraction:", rating);

      // First, provisionally light up the star at index 'i' fully
      ratingStars[i].classList.add("full-filled-star");

      // 5. Evaluate if the remaining fractional value is less than 1
      // Example: If rating is 0.6 and i = 0 -> (0.6 - 0) = 0.6. This is < 1, meaning this star is the fraction!
      if (Number(rating) - i < 1) {
        // Swap out the full-star style for the half-filled style on this final index
        ratingStars[i].classList.replace(
          "full-filled-star",
          "half-filled-star",
        );
        console.log(
          "Star index matches the decimal remainder. Styled as half-filled.",
        );
      }
    }
  }
});

document.querySelectorAll(".badge-gold").forEach((badge) => {
  if (badge.textContent.trim() === "") {
    badge.style.display = "none";
  }
});
