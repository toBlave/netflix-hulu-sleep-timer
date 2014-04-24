chrome.runtime.onInstalled.addListener(function () {
    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        // With a new rule ...
        chrome.declarativeContent.onPageChanged.addRules([
            {
                // That fires when a page's URL contains a 'g' ...
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { urlMatches: "(netflix\.com)|(hulu\.com)" }
                    })
                ],
                // And shows the extension's page action.
                actions: [ new chrome.declarativeContent.ShowPageAction() ]
            }
        ]);
    });
});

chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name == 'sleep_timer') {
        chrome.tabs.query({active: true}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                var tab = tabs[i];
                var url = tab.url;

                if (url.match(/netflix/)) {
                    chrome.tabs.update(tab.id, {
                        url: 'http://www.netflix.com'
                    });
                }
                else if (url.match(/hulu/)) {
                    chrome.tabs.update(tab.id, {
                        url: 'http://www.hulu.com'
                    });
                }
            }
        });
    }
});
