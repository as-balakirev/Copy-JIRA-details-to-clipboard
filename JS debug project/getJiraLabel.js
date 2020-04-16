//document.body.onload = createJiraLabelButton;

function String (str) {
    this.str = str;
    this.valuesToArray = function () {
        let valuesArray = [];
        let isFound = false;
        let foundPos1 = -1;
        while ((foundPos1 = this.str.indexOf('\[', foundPos1 + 1)) !== -1) {
            let foundPos2 = foundPos1;
            while ((foundPos2 = this.str.indexOf('\]', foundPos2 + 1)) !== -1) {
                valuesArray.push(this.str.slice(foundPos1 + 1, foundPos2));
                isFound = true;
                foundPos1 = foundPos2 + 1;
                break;
            }
        }
        if (isFound == false) {
            console.log('no values found!');
            return undefined;
        }
        return valuesArray;
    }
}

function getJiraLabel (str) {
    let string = new String (str);
    for (let value of string.valuesToArray()) {
        if (value == 'ticketTitle') {
            string.str = string.str.replace (`\[${value}\]`, document.getElementById('summary-val').textContent || document.getElementById('summary-val').innerText);
            continue;
        } else if (value == 'ticketNo') {
            string.str = string.str.replace(`\[${value}\]`, document.getElementById('key-val').textContent || document.getElementById('key-val').innerText);
            continue;
        }
        string.str = string.str.replace(`\[${value}\]`, findLabel(value));
    }
    copyToClipboard(string.str);
    return string.str;
}

function findLabel (string) {
    let strongHtmlCollection = document.getElementsByClassName('item');
    for (let value of strongHtmlCollection ) {
        if (value.innerHTML.includes(string)) {
            let label = value.textContent ? value.textContent : value.innerText;
            label = label.replace(/\s{2,}/g, '');
            label = label.replace(string, '');
            return label;
        }
    }
}

function copyToClipboard(text) {
    let input = document.createElement('textarea');
    input.innerHTML = text;
    document.body.appendChild(input);
    input.select();
    let result = document.execCommand('copy');
    document.body.removeChild(input);
    return result;
}

function createJiraLabelButton() {
    let aElement = document.createElement('a');
    aElement.classList.add('aui-button', 'toolbar-trigger', 'issueaction-workflow-transition');
    let scriptElement = document.createElement('script');
    aElement.appendChild(scriptElement);
    let buttonLabel = document.createTextNode('custom button label');
    aElement.appendChild(buttonLabel);
    let opsBarElement = document.getElementById('opsbar-opsbar-transitions');
    let parentDiv = document.getElementById('opsbar-opsbar-transitions').parentNode;
    parentDiv.insertBefore(aElement, opsBarElement);
    aElement.onclick = function () {
        getJiraLabel('[ticketNo] / [ticketTitle] / [Type:] / [Priority:] / [Epic Link:] some  text');
    }
}

createJiraLabelButton();