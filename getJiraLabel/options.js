function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
      templateJiraString: document.getElementById("templateJiraString").value
    });
  }


  function restoreOptions() {

    function setCurrentChoice(result) {
      document.getElementById("templateJiraString").value = result.templateJiraString || "{ticketNo} / {ticketTitle} / {Type} / {Priority} / {Status}";
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let getting = browser.storage.sync.get("templateJiraString");
    getting.then(setCurrentChoice, onError);

  } 

  document.addEventListener("DOMContentLoaded", restoreOptions);
  document.querySelector("form").addEventListener("submit", saveOptions);