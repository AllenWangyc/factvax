/*global chrome*/

chrome.runtime.onInstalled.addListener(function () {
  chrome.action.disable()
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    // Set rules
    let rule = {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            // Match all urls start with 'www.'
            // hostPrefix: 'www.'
            // Match all pages with https
            schemes: ['https']
          },
        }),
      ],
      actions: [
        new chrome.declarativeContent.ShowAction()
      ],
    }
    // Integrate all the rules
    const rules = [rule]
    // Add rules
    chrome.declarativeContent.onPageChanged.addRules(rules)
  })
})

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "detect-text",
    title: "Detect information",
    contexts: ["selection"]
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "detect-text") {
    const selectedText = info.selectionText

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: analyzeText,
      args: [selectedText]
    })
  }
})

function analyzeText(selectedText) {
  const result = `The selected text contains ${selectedText.length} characters.`;
  alert(result); // Display result
}