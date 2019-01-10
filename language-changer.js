function languageReplacer(match, p1, p2, p3, offset, string) {
    return [p1, 'en-us', p3].join('');
  }

function changeDocsLanguage(requestDetails) {
    let modifiedUrl = requestDetails.url.replace(/(^https?:\/\/docs\.microsoft\.com\/)(\w{2,3}(?:-\w{2})?)([\/*\w*\/*\W*]*)/, languageReplacer);

    if(requestDetails.url === modifiedUrl){
      return;
    }

    return {
      redirectUrl: modifiedUrl
    };
  }
  
  browser.webRequest.onBeforeRequest.addListener(
    changeDocsLanguage,
    {
      urls: ["*://docs.microsoft.com/*-*/*"],
      types: ["main_frame"]
    },
    ["blocking"]
  );
