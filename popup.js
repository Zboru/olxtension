clearList.addEventListener('click', async () => {
    chrome.tabs.query({active: true}, tabs => {
        let activeTab = tabs[0];
        console.log(activeTab)
        console.log(chrome.storage.local.get('links'));

    });
    chrome.tabs.executeScript({code: 'console.log("CODE");'});
})