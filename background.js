const RULE_ID = 1;

chrome.runtime.onInstalled.addListener(() => {
  
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [RULE_ID],
    addRules: [{
      id: RULE_ID,
      priority: 1,
      action: { type: "block" },
      condition: {
        urlFilter: "https://www.youmath.it/9bs8cb32q1691a61.js",
        resourceTypes: ["script"]
      }
    }]
  }, () => {
    if (chrome.runtime.lastError) {
      console.warn("Failed to add DNR rule:", chrome.runtime.lastError.message);
    } else {
      console.log("DNR blocking rule installed.");
    }
  });
});


chrome.runtime.onStartup.addListener(() => {
  console.log("Helper service worker started.");
});
