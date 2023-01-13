function languageReplacer(match, hostUrl, languageCode, urlAfterLanguageCode) {
    return [hostUrl, 'en-us', urlAfterLanguageCode].join('');
}

function changeDocsLanguage(requestDetails) {
    // Language code is in format provided by https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
    // Language code is duplicated if language has no dialect (for example pl-pl)
    const extractLanguageCodeRegex = /(^https?:\/\/learn\.microsoft\.com\/)(\w{2}-\w{2})([\w\W]*)/;

    const modifiedUrl = requestDetails
        .url
        .replace(extractLanguageCodeRegex, languageReplacer);

    if (requestDetails.url === modifiedUrl) {
        return;
    }

    return {
        redirectUrl: modifiedUrl
    };
}

browser.webRequest.onBeforeRequest.addListener(
    changeDocsLanguage,
    {
        urls: ["*://learn.microsoft.com/*-*/*"],
        types: ["main_frame"]
    },
    ["blocking"]
);
