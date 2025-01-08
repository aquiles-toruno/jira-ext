function CreateContextMenu() {
    chrome.contextMenus.create({
        id: "translate",
        title: "Translate",
        contexts: ["selection"]
    })
}

async function CreateDefaultAlarm() {
    chrome.alarms.create('remember-current-issue', {
        delayInMinutes: 1,
        periodInMinutes: 1
    });
}

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
    if (reason !== 'install') {
        return;
    }

    console.log("extension installed")
    // CreateContextMenu();
    // CreateDefaultAlarm();
});

chrome.alarms.onAlarm.addListener((alarm) => {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'stay_hydrated.png',
        title: 'Time to Hydrate',
        message: 'Everyday I\'m Guzzlin\'!',
        buttons: [
            { title: 'Keep it Flowing.' }
        ],
        priority: 0
    });
});