document.querySelectorAll(".bfil").forEach((btn) => {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".bfil").forEach((e) => e.classList.remove("on"));
    btn.classList.add("on");
    console.log(btn.innerHTML);
    let bkCard = document.querySelectorAll(".bk-card");
    console.log(bkCard.length);

    bkCard.forEach((bkCardElement) => {
      let chips = bkCardElement.querySelectorAll(".bk-chip");
      let chipArray = ["all"];
      // console.log(chips);
      chips.forEach((chipsElement) => {
        chipArray.push(chipsElement.innerHTML.toLocaleLowerCase());
        console.log(chipArray);

        if (chipArray.includes(btn.innerHTML.toLocaleLowerCase())) {
          bkCardElement.style.display = "initial";
        } else {
          bkCardElement.style.display = "none";
        }
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const jsonElement = document.getElementById("index-brokers-payload");
  const gridContainer = document.getElementById("brokerGrid");

  if (!gridContainer) return; // Safely exit if not on the index page

  // 1. Fetch backend payload safely out of the secure JSON element
  let rawBrokersData = [];
  if (jsonElement) {
    try {
      rawBrokersData = JSON.parse(jsonElement.textContent);
    } catch (e) {
      console.error("Failed to parse index brokers payload data JSON:", e);
    }
  }

  // 2. Sort array by priority weightings (Top Pick > Editor's Pick > Rest)
  const brokersData = [...rawBrokersData].sort((a, b) => {
    const pickA = (a.brokerPick || "").trim().toUpperCase();
    const pickB = (b.brokerPick || "").trim().toUpperCase();

    const getWeight = (pickString) => {
      if (pickString === "TOP PICK") return 3;
      if (pickString === "EDITOR'S PICK" || pickString === "EDITOR’S PICK")
        return 2;
      return 1; // Standard brokers with empty/no picks
    };

    return getWeight(pickB) - getWeight(pickA);
  });

  console.log("Sorted broker data:", brokersData);

  // 3. Render sorted cards dynamically into the layout grid container
  gridContainer.innerHTML = brokersData
    .map((b, i) => {
      const columnGroup = i % 3;
      const animationDelay = (columnGroup * 0.1).toFixed(1);
      const hasPick = b.brokerPick && b.brokerPick.trim() !== "";

      return `
      <div class="bk-card ${b.brokerPick === "Top Pick" ? "star" : ""} sr" data-delay="${columnGroup + 1}" style="transition-delay: ${animationDelay}s">
        
        ${hasPick ? `<div class="bk-top-badge">⭐ ${b.brokerPick}</div>` : ""}

        <div class="bk-logo">${b.brokerLogo || ""}</div>
        <div class="bk-name">${b.brokerName || ""}</div>
        
        ${b.brokerHeading ? `<div class="bk-tag">${b.brokerHeading}</div>` : ""}

        <div class="bk-stars">
          <span class="bk-score">(${b.brokerRating || "0"}/5)</span>
        </div>
        
        <div class="bk-rows">
          <div class="bk-row">
            <span class="bk-key">Leverage</span>
            <span class="bk-val">${b.brokerLeverage || "N/A"}</span>
          </div>
          <div class="bk-row">
            <span class="bk-key">Min Deposit</span>
            <span class="bk-val">$${b.brokerMinDeposit || "0"}</span>
          </div>
          <div class="bk-row">
            <span class="bk-key">From Spread</span>
            <span class="bk-val">${b.brokerMinSpread || "0.0"} pips</span>
          </div>
          <div class="bk-row">
            <span class="bk-key">Bonus</span>
            <span class="bk-val">${b.welcomeBonus ? `$${b.welcomeBonus}` : "None"}</span>
          </div>
        </div>
        
        <div class="bk-chips">
          ${Array.isArray(b.brokerTags) ? b.brokerTags.map((tag) => `<span class="bk-chip">${tag}</span>`).join("") : ""}
        </div>

        <button class="btn-bk" data-broker="${b.brokerName || ""}" data-id="${b.id}">
          Open Account →
        </button>

      </div>
    `;
    })
    .join("");

  // 4. ATTACH BUTTON EVENT LISTENERS (CSP Friendly)
  document.querySelectorAll(".btn-bk").forEach((btn) => {
    btn.addEventListener("click", function () {
      const brokerId = this.getAttribute("data-id");
      const brokerName = this.getAttribute("data-broker");
      console.log(
        `Navigating to open account for ${brokerName} with ID: ${brokerId}`,
      );
      window.location.href = `/open-account?brokerId=${brokerId}`;
    });
  });
});
