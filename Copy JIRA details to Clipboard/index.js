function TemplateString (templateString) {
    this.templateString = templateString;
    this.valuesToArray = function () {
        let valuesArray = [];
        let foundPos1 = -1;
        while ((foundPos1 = this.templateString.indexOf('\{', foundPos1 + 1)) !== -1) {
            let foundPos2 = foundPos1;
            while ((foundPos2 = this.templateString.indexOf('\}', foundPos2 + 1)) !== -1) {
                valuesArray.push(this.templateString.slice(foundPos1 + 1, foundPos2));
                foundPos1 = foundPos2;
                break;
            }
        }
        return valuesArray;
    }
}

function copyJiraLabelToClipboard (templateString) {
    let string = new TemplateString (templateString);
    for (let value of string.valuesToArray()) {
        string.templateString = string.templateString.replace(`\{${value}\}`, getJiraLabelValue(value));
    }
    copyToClipboard(string.templateString);
    return string.templateString;
}

function getJiraLabelValue (jiraLabelName) { 
    if (jiraLabelName == 'ticketTitle') {
        label = document.getElementById('summary-val').textContent || document.getElementById('summary-val').innerText;
        return label;
    } 
    if (jiraLabelName == 'ticketNo') { 
        label = document.getElementById('key-val').parentElement.innerHTML;
        return label;
    }
    let itemHtmlCollection = document.getElementsByClassName('item');
    for (let value of itemHtmlCollection ) {
        if (value.innerHTML.includes(jiraLabelName)) {
            let label = value.textContent ? value.textContent : value.innerText;
            label = label.replace(/\s{2,}/g, '');
            label = label.replace(`${jiraLabelName}:`, '');
            return label;
        }
    }
}

function copyToClipboard(text) {
    function listener(e) {
        e.clipboardData.setData("text/html", text);
        text = text.replace(/\<.+?\>/g, '');
        e.clipboardData.setData("text/plain", text);
        e.preventDefault();
      }
    let input = document.createElement('textarea');
    input.innerHTML = text;
    document.body.appendChild(input);
    input.select();
    document.addEventListener('copy', listener);
    let result = document.execCommand('copy');
    document.removeEventListener('copy', listener);
    document.body.removeChild(input);
    return result;
}

function createJiraLabelButton() {
    let aElement = document.createElement('a');
    aElement.classList.add('aui-button', 'toolbar-trigger', 'issueaction-workflow-transition');
    let buttonLabel = document.createTextNode('Copy to Clipboard');
    aElement.appendChild(buttonLabel);
    let opsBarElement = document.getElementById('opsbar-opsbar-transitions');
    let parentDiv = document.getElementById('opsbar-opsbar-transitions').parentNode;
    parentDiv.insertBefore(aElement, opsBarElement);
    aElement.onclick = function () {
        let getting = browser.storage.sync.get("templateJiraString");
        getting.then(onGot, onError);
    }
}

function onError(error) {
    console.log(`Error: ${error}`);
  }

function onGot(item) {
    let value = "{ticketNo} / {ticketTitle} / {Type} / {Priority} / {Status}";
    if (item.templateJiraString) {
      value = item.templateJiraString;
    }
    copyJiraLabelToClipboard(value);
  }

createJiraLabelButton();