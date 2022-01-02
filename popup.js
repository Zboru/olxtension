clearList.addEventListener('click', async () => {
    chrome.storage.local.set({offers: []}, () => {
        console.log("Offers list has been cleared");
    });
    renderOffers([]);
})

undoAction.addEventListener('click', async () => {
    let savedOffers = await chrome.storage.local.get('offers');
    savedOffers = savedOffers.offers;
    savedOffers.splice(0, 1);
    renderOffers(savedOffers);
    await chrome.storage.local.set({offers: savedOffers});
})

chrome.storage.onChanged.addListener((changes, areaName) => {
    console.log(changes,areaName)
})


function renderOffers(offers) {
    const offerList = document.querySelector(".offer-list");
    const template = document.querySelector('#offerTemplate');
    // Clear parent from existing offers
    offerList.innerHTML = "";
    // Create offer list
    offers.forEach(offer => {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".image").src = offer.imageUrl
        clone.querySelector(".title").innerText = offer.name
        clone.querySelector(".price").innerText = offer.price
        clone.querySelector(".link").href = offer.link
        clone.querySelector(".location").innerText = offer.location
        clone.querySelector(".link").addEventListener('click', () => {
            chrome.tabs.create({ url: offer.link });
        })
        offerList.appendChild(clone);
    })
}
chrome.storage.local.get('offers', (result) => {
    console.log(result.offers)
    renderOffers(result.offers)
});