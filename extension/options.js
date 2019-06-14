// Saves options to chrome.storage
function save_options() {
  // Save format to local storage
  localStorage.setItem('format', document.getElementById('format').value)
}

// Restores select box and checkbox state
function restore_options() {
  document.getElementById('format').value = localStorage.getItem('format')
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);