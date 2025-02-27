export function initializeTabs() {
  const tabs = document.querySelectorAll("[data-tabs]")

  tabs.forEach(tab => {
    const tabTriggers = tab.querySelectorAll("[data-tab-trigger]")
    const tabContents = tab.querySelectorAll("[data-tab-content]")

    tabTriggers[0].classList.add("active")
    tabContents[0].setAttribute("data-tab-active", "")

    tabTriggers.forEach(trigger => {
      trigger.addEventListener("click", () => {
        const triggerValue = trigger.getAttribute("data-tab-trigger")

        // Remove all active tabs
        tabTriggers.forEach(trig => {
          trig.classList.remove("active")
        })
        tabContents.forEach(content => {
          content.removeAttribute("data-tab-active")
        })

        // Replace active tab
        trigger.classList.add("active")

        tabContents.forEach(content => {
          const contentValue = content.getAttribute("data-tab-content")
          if (contentValue === triggerValue) {
            content.setAttribute("data-tab-active", "")
          }
        })
      })
    })
  })
}
