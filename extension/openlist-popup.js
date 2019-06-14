function initPopup() {
    chrome.windows.getCurrent( function(window) {
        chrome.tabs.getAllInWindow(window.id, function(tabs){
            if (!tabs.length) return;

            var listTextArea = document.getElementById("list");

            // Get optional output format
            var format = localStorage.getItem('format')

            //listTextArea.value += 'Debug:' + format + '\n\n';

            for (var i=0; i<tabs.length; ++i) {
                if (tabs[i].url.startsWith('chrome-extension://'))
                    url = tabs[i].url.split('&uri=')[1]
                else
                    url = tabs[i].url

                switch(format) {
                    case 'markdown':
                        listTextArea.value += " - [" + tabs[i].title + "](" + url + ")\n";
                        break;
                    case 'html':
                        listTextArea.value += '<a href="' + url + '">' + tabs[i].title + '</a>\n';
                        break;
                    case 'plain_with_titles':
                        listTextArea.value += tabs[i].title + "\n" + url + "\n\n";
                        break;
                    case 'plain':
                        listTextArea.value += url + "\n";
                        break;
                    default:
                        listTextArea.value += " - [" + tabs[i].title + "](" + url + ")\n";
                }
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
