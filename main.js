const offers = document.querySelectorAll(".wrap");
offers.forEach(offer => {
    const observeButton = offer.querySelector(".observelinkinfo");
    if (observeButton) {
        const observeParent = observeButton.parentNode;
        // Set parent styles
        observeParent.style.display = "flex";
        observeParent.style.justifyContent = "flex-end";
        // Add filter button
        addFilterButton(observeParent);
        // Hide if on list
        let savedLinks = window.localStorage.getItem("links");
        if (savedLinks) {
            savedLinks = savedLinks.split(",");
            const offerLink = offer.querySelector("a.thumb").href;
            if (savedLinks.includes(offerLink)) {
                hideOffer(offer);
            }
        }
    }
})

function addFilterButton(parent) {
    const button = document.createElement("button");
    button.classList.add('filter-out-btn')
    button.addEventListener("click", (ev) => {
        const btn = ev.target;
        const offer = btn.closest('tr.wrap');
        const link = offer.querySelector("a.thumb");
        saveLink(link.href);
        hideOffer(offer);
    })
    parent.append(button);
}

/**
 * Save unique link to localStorage
 * @param link
 */
function saveLink(link) {
    let savedLinks = window.localStorage.getItem("links");
    if (savedLinks) {
        savedLinks = new Set(savedLinks.split(","));
        savedLinks.add(link);
        window.localStorage.setItem("links", Array.from(savedLinks).join(","));
    } else {
        window.localStorage.setItem("links", [link].join(","));
    }
    console.log("Saved link!");
}

function hideOffer(offerRow) {
    offerRow.style.display = 'none';
}