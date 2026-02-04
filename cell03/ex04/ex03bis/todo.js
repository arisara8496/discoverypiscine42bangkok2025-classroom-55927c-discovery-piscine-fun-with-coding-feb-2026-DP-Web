$(function() {
    const $ftList = $('#ft_list');

    function loadCookies() {
        const cookies = document.cookie.split(';');
        const todoCookie = cookies.find(c => c.trim().startsWith('todos='));
        if (todoCookie) {
            const todos = JSON.parse(decodeURIComponent(todoCookie.split('=')[1]));
            todos.forEach(text => addToList(text, false));
        }
    }

    function updateCookies() {
        const todos = [];
        $ftList.find('div').each(function() {
            todos.push($(this).text());
        });

        const expires = new Date();
        expires.setTime(expires.getTime() + (7 * 24 * 60 * 60 * 1000));
        document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + 
                          ";expires=" + expires.toUTCString() + ";path=/";
    }

    function addToList(text, save = true) {
        const $newDiv = $('<div></div>').text(text);
        
        $newDiv.on('click', function() {
            if (confirm("Do you want to remove this TO DO?")) {
                $(this).remove();
                updateCookies();
            }
        });
        
        $ftList.prepend($newDiv); 
        
        if (save) updateCookies();
    }

    $('#new_btn').on('click', function() {
        const text = prompt("Enter a new TO DO:");
        if (text && text.trim() !== "") {
            addToList(text);
        }
    });

    loadCookies();
});