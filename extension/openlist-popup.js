function initPopup() {
    chrome.windows.getCurrent( function(window) {
        chrome.tabs.getAllInWindow(window.id, function(tabs){
            if (!tabs.length) return;

            var listTextArea = document.getElementById("list");

            chrome.storage.sync.get({formatType: 'markdown'}, function(result) {
                listTextArea.value += 'Value currently is ' + result.key + '\n\n';
            });

            listTextArea.value += 'This is a test\n\n';

            for (var i=0; i<tabs.length; ++i) {
		        if (tabs[i].url.startsWith('chrome-extension://'))
		            url = tabs[i].url.split('&uri=')[1]
		        else
		            url = tabs[i].url

                listTextArea.value += " - [" + tabs[i].title + "](" + url + ")\n";
            }

            if (location.search != "?focusHack") location.search = "?focusHack";
            listTextArea.select();
        });
    });

    document.getElementById("openButton").addEventListener("click", openTextAreaList);
}

function openTextAreaList() {
    openList(document.getElementById("list").value);
}

window.addEventListener("load", initPopup);
