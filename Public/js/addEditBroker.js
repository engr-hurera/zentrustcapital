let ratingInput = document.querySelector('input[name="brokerRating"]');
const ratingReadout = document.getElementById("ratingReadout");

let ratingStars = document.querySelectorAll(".rating-stars span");
console.log(ratingInput);
console.log(ratingStars);

// MY LOGIC ::::::::::::::::::::::::::::::::::::::::::

document.addEventListener("DOMContentLoaded", function () {
  let ratingInput = document.querySelector('input[name="brokerRating"]');
  const ratingReadout = document.getElementById("ratingReadout");
  let ratingStars = document.querySelectorAll(".rating-stars span");

  console.log("Input:", ratingInput);
  console.log("Stars:", ratingStars);

  // 1. PURE DRAWING LOGIC: Colors stars based on the value passed to it
  function updateStars(value) {
    let val = parseFloat(value) || 0;

    // Reset all stars
    ratingStars.forEach((star) => {
      star.classList.remove("full-filled-star", "half-filled-star");
    });

    // Fill stars up to the value limit
    for (let i = 0; i < val; i++) {
      if (!ratingStars[i]) break;

      if (Number.isInteger(val)) {
        ratingStars[i].classList.add("full-filled-star");
      } else {
        ratingStars[i].classList.add("full-filled-star");
        // If we are looking at the fractional star (e.g., index 3 for a 3.5 rating)
        if (val - i < 1) {
          ratingStars[i].classList.replace(
            "full-filled-star",
            "half-filled-star",
          );
        }
      }
    }

    // Update text readout (e.g., 4.5)
    if (ratingReadout) {
      ratingReadout.textContent = val.toFixed(1);
    }
  }

  // 2. INITIALIZE ON PAGE LOAD (For Editing Mode Data)
  if (ratingInput) {
    updateStars(ratingInput.value);
  }

  // 3. STAR CLICK LOGIC: Setup click event listeners ONCE outside updateStars
  ratingStars.forEach((star, index) => {
    star.addEventListener("click", function () {
      let starValue = index + 1; // e.g., click 3rd star = value 3
      console.log("Star clicked! Setting value to:", starValue);

      if (ratingInput) {
        ratingInput.value = starValue; // Update input element value
        ratingInput.dispatchEvent(new Event("input")); // Notify system of change
        updateStars(starValue); // Redraw stars based on click selection
      }
    });
  });

  // 4. MANUAL TYPING INPUT LISTENERS
  if (ratingInput) {
    ratingInput.addEventListener("input", function () {
      updateStars(this.value);
    });

    ratingInput.addEventListener("keyup", function () {
      let numericValue = parseFloat(this.value);

      if (numericValue > 5) {
        this.value = 5;
        this.dispatchEvent(new Event("input"));
        updateStars(5);
      } else if (numericValue < 0) {
        this.value = 0;
        this.dispatchEvent(new Event("input"));
        updateStars(0);
      }
    });
  }
});

// VS Code Logic ::::::::::::::::::::::::::::::::::::::::::

//  ratingInput.addEventListener('input', function () {
//     // 1. Clear all stars
//     ratingStars.forEach(star => {
//       star.classList.remove('full-filled-star', 'half-filled-star');
//     });

//     // 2. Parse the value to a number (use parseInt or Number)
//     let ratingValue = parseFloat(this.value);

//     // 3. Loop through the stars and fill them based on the rating value
//     for (let i = 0; i < ratingStars.length; i++) {
//       if (i < Math.floor(ratingValue)) {
//         ratingStars[i].classList.add('full-filled-star');
//       } else if (i === Math.floor(ratingValue) && ratingValue % 1 !== 0) {
//         ratingStars[i].classList.add('half-filled-star');
//       }
//     }
//   });

let brokerMinSpread = document.querySelector('input[name="brokerMinSpread"]');
if (brokerMinSpread) {
  brokerMinSpread.addEventListener("input", function (e) {
    // 1. If deleting, do absolutely nothing (let the user delete naturally)
    if (e.inputType && e.inputType.startsWith("delete")) return;

    // 2. Strip out everything except numbers and the dot
    let clean = this.value.replace(/[^0-9.]/g, "");

    // 3. If there is a number but no dot after the first digit, inject it
    if (clean.length > 0 && !clean.includes(".")) {
      clean = clean.charAt(0) + "." + clean.slice(1);
    }

    this.value = clean;
  });
}

let brokerLeverage = document.querySelector('input[name="brokerLeverage"]');
if (brokerLeverage) {
  brokerLeverage.addEventListener("input", function (e) {
    // 1. If deleting, do absolutely nothing
    if (e.inputType && e.inputType.startsWith("delete")) return;

    // 2. Strip out everything except numbers and the colon
    let clean = this.value.replace(/[^0-9:]/g, "");

    // 3. If there is a number but no colon after the first digit, inject it
    if (clean.length > 0 && !clean.includes(":")) {
      clean = clean.charAt(0) + ":" + clean.slice(1);
    }

    this.value = clean;
  });
}

// ---- Additive UI helpers (do not affect form submission logic) ----

// Show a live preview of the logo image if the URL resolves
const brokerLogoInput = document.getElementById("brokerLogo");
const logoPreview = document.getElementById("logoPreview");
if (brokerLogoInput && logoPreview) {
  brokerLogoInput.addEventListener("input", function () {
    const url = this.value.trim();
    if (!url) {
      logoPreview.innerHTML = '<span class="logo-preview-fallback">🏷️</span>';
      return;
    }
    const img = new Image();
    img.onload = () => {
      logoPreview.innerHTML = "";
      logoPreview.appendChild(img);
    };
    img.onerror = () => {
      logoPreview.innerHTML = '<span class="logo-preview-fallback">⚠️</span>';
    };
    img.src = url;
    img.alt = "Broker logo preview";
  });
}
let container = document.querySelector("#brokerTagsContainer");
const originalLabelItem = container.querySelector(".checkbox-item");
const originalInputItem = container.querySelector(".checkbox-item").firstChild;
let addMoreBrokerTagsBtn = document.querySelector("#addMoreBrokerTagsBtn");
let defaultBrokerTags = [
  "FCA",
  "CySEC",
  "ECN",
  "Instant Withdrawal",
  "ASIC",
  "$30 Bonus",
  "MT4/MT5",
  "Raw Spreads",
  "cTrader",
  "Crypto CFDs",
  "MT5",
  "Standard",
  "MT4",
];
// 1. Select the script tag by ID
let brokerDataElement = document.getElementById("broker-tags-data");
console.log(brokerDataElement);

// 2. Parse the text content into a usable array or object
let arrayOfBrokerTags = JSON.parse(brokerDataElement.textContent);

// 3. Use the data safely
console.log(arrayOfBrokerTags);

console.log("this is arrayOfBrokerTags", typeof arrayOfBrokerTags);
arrayOfBrokerTags = arrayOfBrokerTags.filter(
  (tag) => !defaultBrokerTags.includes(tag),
);

// Initialize initial base variables
let inputBrokerTag;
inputBrokerTag = document.createElement("input");

let copyOfOriginalLabelItem;
let deleteBtn;
deleteBtn = document.createElement("button");
let okayBtn;
okayBtn = document.createElement("button");

// Create the very first element workspace clone
copyOfOriginalLabelItem = originalLabelItem.cloneNode(true);
copyOfOriginalLabelItem.innerHTML = originalInputItem.outerHTML + "";

// Define properties for the first element immediately so references don't get lost
inputBrokerTag.type = "text";
inputBrokerTag.placeholder = "Enter broker tag";
inputBrokerTag.classList.add("form-input", "inputBrokerTag");

inputBrokerTag.addEventListener("click", function (e) {
  e.stopPropagation();
});

okayBtn.type = "button";
okayBtn.value = "OK";
okayBtn.textContent = "OK";
okayBtn.classList.add("okayBtn");

deleteBtn.type = "button";
deleteBtn.value = "Delete";
deleteBtn.textContent = "Delete";
deleteBtn.classList.add("deleteBtn");

// Append the interactive layout elements to your first clone right away
copyOfOriginalLabelItem.appendChild(inputBrokerTag);
copyOfOriginalLabelItem.appendChild(deleteBtn);
copyOfOriginalLabelItem.appendChild(okayBtn);

// Hidden initially: Only show this empty creator input wrapper when Add More is clicked
copyOfOriginalLabelItem.style.display = "none";
container.insertBefore(copyOfOriginalLabelItem, addMoreBrokerTagsBtn);

// Updated Handler: safely isolates clean database items from blank text templates
function brokerTagInputHandler(targetClone, newTagValue, isOkBtnClicked) {
  let localDelete = document.createElement("button");
  localDelete.type = "button";
  localDelete.value = "Delete";
  localDelete.textContent = "Delete";
  localDelete.classList.add("deleteBtn");

  localDelete.addEventListener("click", function (e) {
    e.stopPropagation();
    targetClone.remove();
  });

  // Grab a live structural pointer to the existing checkbox element node
  let currentCheckbox = targetClone.querySelector('input[type="checkbox"]');

  if (!currentCheckbox) {
    currentCheckbox = document.createElement("input");
    currentCheckbox.type = "checkbox";
    currentCheckbox.name = "brokerTags";
  }

  // IF FROM DATABASE: Keep it normally checked and fully interactive
  if (newTagValue !== "" && !isOkBtnClicked) {
    currentCheckbox.value = newTagValue;
    currentCheckbox.checked = true;
    currentCheckbox.setAttribute("checked", "checked");

    targetClone.innerHTML = "";
    targetClone.appendChild(currentCheckbox);
    targetClone.appendChild(document.createTextNode(" " + newTagValue + " "));
    targetClone.appendChild(localDelete);

    currentCheckbox.addEventListener("change", function () {
      if (currentCheckbox.checked) {
        currentCheckbox.setAttribute("checked", "checked");
      } else {
        currentCheckbox.removeAttribute("checked");
      }
    });

    // Re-enable editing when clicking on the existing item block text layout
    targetClone.addEventListener("click", function editExistingTag(e) {
      if (e.target === currentCheckbox || e.target === localDelete) return;
      e.preventDefault();

      let editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = newTagValue;
      editInput.classList.add("form-input", "inputBrokerTag");

      editInput.addEventListener("click", function (evt) {
        evt.stopPropagation();
      });

      let editOkay = document.createElement("button");
      editOkay.type = "button";
      editOkay.textContent = "OK";
      editOkay.classList.add("okayBtn");

      // Build edit context fields seamlessly
      targetClone.innerHTML = "";
      targetClone.appendChild(currentCheckbox);
      targetClone.appendChild(editInput);
      targetClone.appendChild(editOkay);
      targetClone.appendChild(localDelete);

      editInput.focus();

      editOkay.addEventListener("click", function (evt) {
        evt.stopPropagation();
        let freshVal = editInput.value.trim();

        if (freshVal === "") {
          alert("Broker tag value cannot be empty!");
          editInput.focus();
          return;
        }

        brokerTagInputHandler(targetClone, freshVal, true);
      });
    });
  } else {
    // IF CREATED BY ADD MORE: Disable it during configuration workspace setup
    currentCheckbox.disabled = false;
    currentCheckbox.style.pointerEvents = "auto";
    currentCheckbox.value = newTagValue;
    currentCheckbox.checked = true;
    currentCheckbox.setAttribute("checked", "checked");

    targetClone.innerHTML = "";
    targetClone.appendChild(currentCheckbox);
    targetClone.appendChild(document.createTextNode(" " + newTagValue + " "));
    targetClone.appendChild(localDelete);

    currentCheckbox.addEventListener("change", function () {
      if (currentCheckbox.checked) {
        currentCheckbox.setAttribute("checked", "checked");
      } else {
        currentCheckbox.removeAttribute("checked");
      }
    });
  }

  container.insertBefore(targetClone, addMoreBrokerTagsBtn);
}

let newTagValue = inputBrokerTag.value.trim();

let isChecked;

function handleLabelClick(event, isChecked) {
  event.preventDefault();
  event.stopPropagation();

  if (copyOfOriginalLabelItem.firstChild.checked && isChecked === "yes") {
    copyOfOriginalLabelItem.firstChild.checked =
      !copyOfOriginalLabelItem.firstChild.checked;
    copyOfOriginalLabelItem.firstChild.removeAttribute("checked");
  } else if (
    !copyOfOriginalLabelItem.firstChild.checked &&
    isChecked === "yes"
  ) {
    copyOfOriginalLabelItem.firstChild.checked = false;
    copyOfOriginalLabelItem.firstChild.removeAttribute("checked");
  }
}

storedLabelListener = (event) => {
  handleLabelClick(event, "yes");
};

// Process database tags on configuration startup
if (originalLabelItem.firstChild.checked && arrayOfBrokerTags.length === 0) {
  copyOfOriginalLabelItem.firstChild.checked =
    !copyOfOriginalLabelItem.firstChild.checked;
  copyOfOriginalLabelItem.firstChild.removeAttribute("checked");
  copyOfOriginalLabelItem.addEventListener("click", storedLabelListener);
} else if (
  originalLabelItem.firstChild.checked &&
  arrayOfBrokerTags.length > 0
) {
  for (let i = 0; i < arrayOfBrokerTags.length; i++) {
    let loopClone = originalLabelItem.cloneNode(true);
    loopClone.innerHTML = originalInputItem.outerHTML + "";
    brokerTagInputHandler(loopClone, arrayOfBrokerTags[i], false);
  }
} else {
  if (copyOfOriginalLabelItem && copyOfOriginalLabelItem.firstChild) {
    copyOfOriginalLabelItem.addEventListener("click", storedLabelListener);
  }
  for (let i = 0; i < arrayOfBrokerTags.length; i++) {
    let loopClone = originalLabelItem.cloneNode(true);
    loopClone.innerHTML = originalInputItem.outerHTML + "";
    brokerTagInputHandler(loopClone, arrayOfBrokerTags[i], false);
  }
}

// Attach controls for adding new elements dynamically via buttons
okayBtn.addEventListener("click", (event) => {
  okayBtnClick(event);
});

let isOkBtnClicked = 0;

function okayBtnClick(event) {
  event.preventDefault();
  event.stopPropagation();

  isOkBtnClicked = 1;
  const freshValue = inputBrokerTag.value.trim();

  if (freshValue === "") {
    alert("Please enter a tag name before clicking OK!");
    inputBrokerTag.focus();
    return;
  }

  let submissionClone = originalLabelItem.cloneNode(false);
  brokerTagInputHandler(submissionClone, freshValue, true);

  inputBrokerTag.value = "";
  copyOfOriginalLabelItem.style.display = "none";
}

deleteBtn.addEventListener("click", function () {
  inputBrokerTag.value = "";
  copyOfOriginalLabelItem.style.display = "none";
});

// Define a global scope window function bridge to satisfy your inline HTML click attribute
window.addMoreBrokerTags = function (event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  copyOfOriginalLabelItem.style.display = "inline-flex";
  inputBrokerTag.focus();
};

if (addMoreBrokerTagsBtn) {
  addMoreBrokerTagsBtn.addEventListener("click", window.addMoreBrokerTags);
}
// }
