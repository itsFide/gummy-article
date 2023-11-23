document.addEventListener('DOMContentLoaded', ()=>{
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1; // Months are zero-indexed
    let year = date.getFullYear();

    let today =  day + '.' + month + '.' + year;
    let dateElements = document.querySelectorAll('.auto-date');
    console.log(today);
    dateElements.forEach(function(dateElement) {
        dateElement.textContent = today;
    });
    // Функция для добавления комментария
    let commentsForm = document.querySelector('.comments-form')
    
    let userComments = [];

    document.getElementById('comments-form').addEventListener('submit', function (event) {
        event.preventDefault(); 

        let name = document.getElementById('name').value;
        let message = document.getElementById('comments-message').value;
        if (name.trim() === '') {
            highlightField('name');
            return;
        }

        if (message.trim() === '') {
            highlightField('comments-message');
            return;
        }

        removeHighlight('name');
        removeHighlight('comments-message');
        let newComment = document.createElement('div');
        newComment.className = 'comments-item';
        newComment.innerHTML = '<h2 class="comments-item__name">' + name + '</h2>' +
            '<div class="comments-item__date">' + getCurrentDate() + '</div>' +
            '<div class="comments-item__message"><p>' + message + '</p></div>';

        let commentsItems = document.getElementById('comments-items');
        commentsItems.insertBefore(newComment, commentsItems.firstChild);

        userComments.unshift(newComment.outerHTML);

        saveCommentsToLocalStorage();
    });

    function getCurrentDate() {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        return day + '.' + month + '.' + year;
    }

    function saveCommentsToLocalStorage() {
        localStorage.setItem('userComments', JSON.stringify(userComments));
        let name = document.getElementById('name');
        let message = document.getElementById('comments-message');
        name.value = '';
        message.value = '';
    }

    function loadCommentsFromLocalStorage() {
        let commentsItems = document.getElementById('comments-items');
        
        let staticComments = commentsItems.innerHTML;

        let userCommentsJson = localStorage.getItem('userComments');

        if (userCommentsJson) {
            userComments = JSON.parse(userCommentsJson);
            let allComments = userComments.concat(staticComments);

            commentsItems.innerHTML = allComments.join('');
        }
    }

    loadCommentsFromLocalStorage();
})
function highlightField(fieldId) {
    let field = document.getElementById(fieldId);
    field.style.border = '2px solid #d16363';
}

function removeHighlight(fieldId) {
    let field = document.getElementById(fieldId);
    field.style.border = '';
}
