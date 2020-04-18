function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
      jiraString: document.getElementById("jiraString").value
    });
  }


  function restoreOptions() {

    function setCurrentChoice(result) {
      document.getElementById("jiraString").value = result.jiraString || "[ticketNo] / [ticketTitle] / [Type:] / [Priority:] / [Epic Link:]";
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let getting = browser.storage.sync.get("jiraString");
    getting.then(setCurrentChoice, onError);

  } 

  document.addEventListener("DOMContentLoaded", restoreOptions);
  document.querySelector("form").addEventListener("submit", saveOptions);