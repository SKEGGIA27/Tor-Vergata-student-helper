document.addEventListener("DOMContentLoaded", () => {

  const autoFillFormBtn = document.getElementById("autofillFormButton");

  // Function that will be injected into the page
  function autoFillValutationForm() {
    const xpathList = [
      '//*[@id="sezioni0.domande0.risposta1"]',
      '//*[@id="sezioni0.domande1.risposta1"]',
      '//*[@id="sezioni0.domande2.risposta1"]',
      '//*[@id="sezioni0.domande3.risposta1"]',
      '//*[@id="sezioni1.domande0.risposta1"]',
      '//*[@id="sezioni1.domande1.risposta2"]',
      '//*[@id="sezioni1.domande2.risposta1"]',
      '//*[@id="sezioni1.domande3.risposta1"]',
      '//*[@id="sezioni2.domande0.risposta1"]',
      '//*[@id="sezioni2.domande1.risposta1"]',
      '//*[@id="sezioni2.domande2.risposta1"]',
      '//*[@id="sezioni2.domande3.risposta4"]',
      '//*[@id="sezioni3.domande0.risposta1"]',
      '//*[@id="sezioni3.domande1.risposta1"]',
      '//*[@id="sezioni3.domande2.risposta1"]',
      '//*[@id="sezioni3.domande3.risposta1"]',
      '//*[@id="sezioni3.domande4.risposta1"]',
      '//*[@id="sezioni4.domande0.risposta4"]',
      '//*[@id="sezioni4.domande1.risposta5"]',
      '//*[@id="sezioni5.domande0.risposta1"]',
      '//*[@id="sezioni5.domande1.risposta1"]',
      '//*[@id="sezioni6.domande0.risposta2"]',
    ];

    let clickedCount = 0;

    // We can't use await in the injected function body directly easily unless wrapped, 
    // but Promise interaction inside valid injection is okay if we don't expect a return value immediately.
    // Ideally we iterate with delays. simpler approach for injection:

    (async () => {
      for (const [index, xpath] of xpathList.entries()) {
        try {
          const element = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue;

          if (element) {
            element.click();
            clickedCount++;
            console.log(`Risposta cliccata ${index + 1}/${xpathList.length}`);
            // Simple delay
            await new Promise((resolve) => setTimeout(resolve, 200));
          }
        } catch (error) {
          console.error(`Errore con ${xpath}:`, error);
        }
      }
      console.log("Autofill completato.");
    })();
  }

  autoFillFormBtn.addEventListener("click", async () => {
    console.log("Auto-filling form...");

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab?.id) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: autoFillValutationForm
      });
    } else {
      console.error("No active tab found");
    }
  });
});



