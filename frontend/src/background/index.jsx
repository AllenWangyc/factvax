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
    // 将选中的文本和弹窗创建逻辑注入到页面
    chrome.tabs.sendMessage(tab.id, {
      type: "showPopup",
      text: info.selectionText
    })
  }
})
