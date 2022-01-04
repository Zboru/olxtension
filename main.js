// Find out what type of view is currently selected
const viewType = document.querySelector('.view__icon.is-active').dataset.cy;

if (viewType === 'list') {
    renderListFilter();
}

function renderListFilter() {
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
            // Hide container if offer is on a list
            chrome.storage.local.get('offers', (result) => {
                if (result.offers.length) {
                    const offerLink = offer.querySelector("a.thumb").href;
                    if (result.offers.some(offer => offer.link === offerLink)) {
                        hideOffer(offer);
                    }
                }
            });
        }
    })
}

/**
 * Assign click event listener to passed button in argument
 * @param button
 */
function addButtonEvent(button) {
    button.addEventListener("click", (ev) => {
        const btn = ev.target;
        const offerDOM = btn.closest('tr.wrap');
        // Create offer object to save it to filter list
        const offerObject = {
            name: offerDOM.querySelector("td.title-cell").innerText,
            price: offerDOM.querySelector(".price").innerText,
            location: offerDOM.querySelector('small span').innerText,
            imageUrl: offerDOM.querySelector("a.thumb img")?.src,
            link: offerDOM.querySelector("a.thumb").href,
        }
        saveOffer(offerObject);
        hideOffer(offerDOM);
    })
}

/**
 * Create button used to filtering out offers
 * @param parent
 */
function addFilterButton(parent) {
    const button = document.createElement("button");
    button.classList.add('filter-out-btn')
    addButtonEvent(button);
    parent.append(button);
}

/**
 * Save filtered offer to localStorage
 * @param offerObj
 */
async function saveOffer(offerObj) {
    let savedOffers = await chrome.storage.local.get('offers');
    // When user is using extension first time, variable must be declared as array in localStorage
    if (typeof savedOffers === 'object' && !savedOffers.hasOwnProperty('offers')) {
        await chrome.storage.local.set({offers: []});
        savedOffers = await chrome.storage.local.get('offers');
    }
    // Change object variable to just array with offers
    savedOffers = savedOffers.offers;
    if (savedOffers.length > 0) {
        savedOffers.unshift(offerObj);
        await chrome.storage.local.set({offers: savedOffers});
    } else {
        await chrome.storage.local.set({offers: [offerObj]});
    }
}

/**
 * Hide offer from user
 * TODO: Possible change to removing node from DOM
 * @param offerRow
 */
function hideOffer(offerRow) {
    offerRow.style.display = 'none';
}
