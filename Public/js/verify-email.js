"use strict";


// ============================================================
// VERIFY EMAIL PAGE
// ============================================================

document.addEventListener("DOMContentLoaded", () => {


  // ==========================================================
  // PAGE ELEMENTS
  // ==========================================================

  const verifyEmailPage =
    document.getElementById("verifyEmailPage");


  const resendForm =
    document.getElementById("resendForm");


  const resendBtn =
    document.getElementById("resendBtn");


  const countdown =
    document.getElementById("countdown");


  const resendLimit =
    document.getElementById("resendLimit");


  const errorMessage =
    document.getElementById("errorMessage");


  const successMessage =
    document.getElementById("successMessage");


  // ==========================================================
  // SAFETY CHECK
  // ==========================================================

  if (
    !verifyEmailPage ||
    !resendForm ||
    !resendBtn ||
    !countdown ||
    !resendLimit ||
    !errorMessage ||
    !successMessage
  ) {

    console.error(
      "Verify email page elements could not be found."
    );

    return;

  }


  // ==========================================================
  // SERVER-PROVIDED VALUES
  // ==========================================================

  let remainingSeconds =
    Number(
      verifyEmailPage.dataset.resendSeconds
    ) || 0;


  let remainingResends =
    Number(
      verifyEmailPage.dataset.remainingResends
    );


  if (
    Number.isNaN(remainingResends)
  ) {

    remainingResends = 3;

  }


  // ==========================================================
  // COUNTDOWN TIMER REFERENCE
  // ==========================================================

  let countdownTimer = null;


  // ==========================================================
  // SHOW ERROR
  // ==========================================================

  function showError(message) {

    successMessage.style.display =
      "none";


    errorMessage.textContent =
      message;


    errorMessage.style.display =
      "block";

  }


  // ==========================================================
  // SHOW SUCCESS
  // ==========================================================

  function showSuccess(message) {

    errorMessage.style.display =
      "none";


    successMessage.textContent =
      message;


    successMessage.style.display =
      "block";

  }


  // ==========================================================
  // UPDATE RESEND COUNT
  // ==========================================================

  function updateResendCount() {

    resendLimit.innerHTML =
      "Remaining resends: <strong>" +
      remainingResends +
      "</strong>";

  }


  // ==========================================================
  // UPDATE COUNTDOWN DISPLAY
  // ==========================================================

  function updateCountdownDisplay() {


    // --------------------------------------------------------
    // Countdown still active
    // --------------------------------------------------------

    if (
      remainingSeconds > 0
    ) {

      resendBtn.disabled =
        true;


      resendBtn.textContent =
        "Please wait...";


      countdown.innerHTML =
        "You can request another code in " +
        "<strong>" +
        remainingSeconds +
        "</strong> second(s).";


      return;

    }


    // --------------------------------------------------------
    // No resends remaining
    // --------------------------------------------------------

    if (
      remainingResends <= 0
    ) {

      resendBtn.disabled =
        true;


      resendBtn.textContent =
        "Resend limit reached";


      countdown.textContent =
        "Please start the signup process again.";


      return;

    }


    // --------------------------------------------------------
    // Resend available
    // --------------------------------------------------------

    resendBtn.disabled =
      false;


    resendBtn.textContent =
      "Resend verification code";


    countdown.textContent =
      "";

  }


  // ==========================================================
  // START COUNTDOWN
  // ==========================================================

  function startCountdown(seconds) {


    // --------------------------------------------------------
    // Clear previous timer
    // --------------------------------------------------------

    if (countdownTimer) {

      clearInterval(
        countdownTimer
      );

      countdownTimer = null;

    }


    // --------------------------------------------------------
    // Use SERVER value
    // --------------------------------------------------------

    remainingSeconds =
      Math.max(
        0,
        Number(seconds) || 0
      );


    updateCountdownDisplay();


    // --------------------------------------------------------
    // Nothing to count down
    // --------------------------------------------------------

    if (
      remainingSeconds <= 0
    ) {

      return;

    }


    // --------------------------------------------------------
    // Start local display timer
    //
    // IMPORTANT:
    // This is ONLY the visual countdown.
    //
    // The actual security restriction is enforced
    // by the server/controller.
    // --------------------------------------------------------

    countdownTimer =
      setInterval(() => {


        remainingSeconds =
          Math.max(
            0,
            remainingSeconds - 1
          );


        updateCountdownDisplay();


        if (
          remainingSeconds <= 0
        ) {

          clearInterval(
            countdownTimer
          );

          countdownTimer = null;

        }

      }, 1000);

  }


  // ==========================================================
  // INITIAL PAGE STATE
  // ==========================================================

  updateResendCount();


  startCountdown(
    remainingSeconds
  );


  // ==========================================================
  // RESEND OTP
  // ==========================================================

  resendForm.addEventListener(
    "submit",
    async (event) => {


      // ------------------------------------------------------
      // IMPORTANT
      //
      // Stop normal HTML form submission.
      //
      // Without this, browser would navigate to:
      //
      // /resend-otp
      //
      // and display the JSON response.
      // ------------------------------------------------------

      event.preventDefault();


      // ------------------------------------------------------
      // Do not request while countdown is active
      // ------------------------------------------------------

      if (
        remainingSeconds > 0
      ) {

        showError(
          `Please wait ${remainingSeconds} seconds before requesting another OTP.`
        );

        return;

      }


      // ------------------------------------------------------
      // Do not request when resend limit reached
      // ------------------------------------------------------

      if (
        remainingResends <= 0
      ) {

        showError(
          "You have reached the maximum number of OTP resends. Please start the signup process again."
        );

        return;

      }


      // ------------------------------------------------------
      // Disable button while request is running
      // ------------------------------------------------------

      resendBtn.disabled =
        true;


      resendBtn.textContent =
        "Sending...";


      // Hide previous messages

      errorMessage.style.display =
        "none";

      successMessage.style.display =
        "none";


      try {


        // ====================================================
        // SEND REQUEST TO SERVER
        // ====================================================

        const response =
          await fetch(
            resendForm.action,
            {

              method:
                "POST",

              headers: {

                "Accept":
                  "application/json",

              },

              credentials:
                "same-origin",

            }
          );


        // ====================================================
        // READ RESPONSE
        // ====================================================

        let data;


        try {

          data =
            await response.json();

        } catch (jsonError) {

          throw new Error(
            "The server returned an invalid response."
          );

        }


        // ====================================================
        // SERVER REJECTED REQUEST
        // ====================================================

        if (
          !response.ok
        ) {


          // --------------------------------------------------
          // Server may tell us exactly how many seconds remain
          // --------------------------------------------------

          if (
            typeof data.retryAfter !==
            "undefined"
          ) {

            startCountdown(
              Number(
                data.retryAfter
              )
            );

          }


          // --------------------------------------------------
          // Update remaining resend count if supplied
          // --------------------------------------------------

          if (
            typeof data.remainingResends !==
            "undefined"
          ) {

            remainingResends =
              Number(
                data.remainingResends
              );

            updateResendCount();

          }


          showError(
            data.message ||
            "Unable to resend verification code."
          );


          return;

        }


        // ====================================================
        // SUCCESS
        // ====================================================


        // ----------------------------------------------------
        // Update remaining resend count
        // ----------------------------------------------------

        if (
          typeof data.remainingResends !==
          "undefined"
        ) {

          remainingResends =
            Number(
              data.remainingResends
            );

        }


        updateResendCount();


        // ----------------------------------------------------
        // Show success message
        // ----------------------------------------------------

        showSuccess(
          data.message ||
          "A new verification code has been sent to your email."
        );


        // ----------------------------------------------------
        // IMPORTANT
        //
        // Server sends retryAfter.
        //
        // Example:
        //
        // retryAfter: 60
        //
        // The browser then displays:
        //
        // You can request another code in 60 seconds.
        // ----------------------------------------------------

        if (
          typeof data.retryAfter !==
          "undefined"
        ) {

          startCountdown(
            Number(
              data.retryAfter
            )
          );

        } else {

          // --------------------------------------------------
          // Defensive fallback
          //
          // This should normally never be needed because
          // our controller sends retryAfter.
          // --------------------------------------------------

          startCountdown(
            60
          );

        }


      } catch (error) {


        // ====================================================
        // NETWORK / JAVASCRIPT ERROR
        // ====================================================

        console.error(
          "Resend OTP request failed:",
          error
        );


        showError(
          "Something went wrong while requesting a new code. Please try again."
        );


        // ----------------------------------------------------
        // Re-enable button if there is no active countdown
        // ----------------------------------------------------

        if (
          remainingSeconds <= 0 &&
          remainingResends > 0
        ) {

          resendBtn.disabled =
            false;

          resendBtn.textContent =
            "Resend verification code";

        }

      }

    }
  );

});