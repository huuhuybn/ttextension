let color = '#3aa757';
var link = '';

async function getCurrentTab() {
    let queryOptions = {active: true, lastFocusedWindow: true};
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log(tab.url + " tab ")
    if (tab.url.indexOf('/video/') > 0) {
        chrome.action.setBadgeText({text: '1'});
        link = tab.url;
    } else {
        chrome.action.setBadgeText({text: ''});
        link = '';
    }
    chrome.action.setBadgeBackgroundColor({color: '#f14646'});
});


chrome.action.onClicked.addListener((tab) => {
    if (link.length == 0) {
        alert('Open Tiktok Video page to download...')
    } else {
        let open = "https://taptik.app?url=" + link;
        chrome.tabs.create({ url: open });
    }
});

chrome.tabs.onActivated.addListener(() => {

    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;

        console.log(url)
        if (url.indexOf('/video/') > 0) {
            console.log('Video')
            chrome.action.setBadgeText({text: '1'});
            chrome.action.setBadgeBackgroundColor({color: '#ff0000'});
            link = url;
        } else {
            console.log('NON')
            chrome.action.setBadgeText({text: '0'});
            chrome.action.setBadgeBackgroundColor({color: '#ff0000'});
            link = '';
        }


    });
})
