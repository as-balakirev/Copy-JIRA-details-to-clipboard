function TemplateString(templateString) {
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


function StringToCopy(string) {
    this.plainTextString = string.templateString;
    this.htmlTextString = string.templateString;
    this.toString = function () {
        return `${this.plainTextString}\n${this.htmlTextString}`;
    }
}


function copyJiraLabelToClipboard(templateString) {
    let string = new TemplateString(templateString);
    let stringToCopy = new StringToCopy(string);
    for (let value of string.valuesToArray()) {
        stringToCopy.plainTextString = stringToCopy.plainTextString.replace(`\{${value}\}`, getJiraLabelValue(value));
        stringToCopy.htmlTextString = stringToCopy.htmlTextString.replace(`\{${value}\}`, getJiraLabelValue(value, 'html'));
        //string.templateString = string.templateString.replace(`\{${value}\}`, getJiraLabelValue(value));
    }
    copyToClipboard(stringToCopy);
}


function getJiraLabelValue(jiraLabelName, type) {
    if (jiraLabelName == 'ticketTitle') {
        let label = document.getElementById('summary-val').textContent || document.getElementById('summary-val').innerText;
        return label;
    }
    if (jiraLabelName == 'ticketNo') {
        let label = document.getElementById('key-val').textContent || document.getElementById('key-val').innerText;
        return label;
    }
    if (jiraLabelName == 'ticketUrl') {
        if (type == 'html') {
            let label = document.getElementById('key-val').parentElement.innerHTML;
            label = label.replace(/\"\/browse\/.+\"/, `"${window.location.href}"`);
            return label;
        }
        let label = window.location.href;
        return label;
    }
    let itemHtmlCollection = document.getElementsByClassName('item');
    for (let value of itemHtmlCollection) {
        if (value.innerHTML.includes(jiraLabelName)) {
            let label = value.textContent ? value.textContent : value.innerText;
            label = label.replace(/\s{2,}/g, '');
            label = label.replace(`${jiraLabelName}:`, '');
            return label;
        }
    }
}


function copyToClipboard(objectToCopy) {
    function listener(e) {
        e.clipboardData.setData("text/html", objectToCopy.htmlTextString);
        e.clipboardData.setData("text/plain", objectToCopy.plainTextString);
        e.preventDefault();
    }
    let input = document.createElement('textarea');
    input.innerHTML = objectToCopy.toString();
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


window.addEventListener('load', createJiraLabelButton());