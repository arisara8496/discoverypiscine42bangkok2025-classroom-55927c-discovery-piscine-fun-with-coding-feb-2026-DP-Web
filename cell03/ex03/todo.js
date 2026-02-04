const ftList = document.getElementById('ft_list');
const newBtn = document.getElementById('new_btn');

window.onload = function() {
    const cookies = document.cookie.split(';');
    const todoCookie = cookies.find(c => c.trim().startsWith('todos='));
    if (todoCookie) {
        const todos = JSON.parse(decodeURIComponent(todoCookie.split('=')[1]));
        todos.forEach(text => addToList(text, false));
    }
};

function addToList(text, save = true) {
    const div = document.createElement('div');
    div.textContent = text;
    
    div.onclick = function() {
        if (confirm("Do you want to remove this TO DO?")) {
            div.remove();
            updateCookies();
        }
    };
    
    ftList.prepend(div);
    
    if (save) updateCookies();
}

newBtn.onclick = function() {
    const text = prompt("Enter a new TO DO:");
    if (text && text.trim() !== "") {
        addToList(text);
    }
};

function updateCookies() {
    const todos = [];
    const items = ftList.querySelectorAll('div');
    for (let i = items.length - 1; i >= 0; i--) {
        todos.push(items[i].textContent);
    }

    const expires = new Date();
    expires.setTime(expires.getTime() + (7 * 24 * 60 * 60 * 1000));
    document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + ";expires=" + expires.toUTCString() + ";path=/";
}