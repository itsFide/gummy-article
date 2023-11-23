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

    // Add submit event listener to the form
    document.getElementById('comments-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting traditionally

        // Get the values from the form
        let name = document.getElementById('name').value;
        let message = document.getElementById('comments-message').value;

        // Create a new comment element
        let newComment = document.createElement('div');
        newComment.className = 'comments-item';
        newComment.innerHTML = '<h2 class="comments-item__name">' + name + '</h2>' +
            '<div class="comments-item__date">' + getCurrentDate() + '</div>' +
            '<div class="comments-item__message"><p>' + message + '</p></div>';

        // Insert the new comment at the beginning of the comments-items
        let commentsItems = document.getElementById('comments-items');
        commentsItems.insertBefore(newComment, commentsItems.firstChild);

        // Add the new comment to the userComments array
        userComments.push(newComment.outerHTML);

        // Save userComments to localStorage
        saveCommentsToLocalStorage();
    });

    function getCurrentDate() {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1; // Months are zero-indexed
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
        
        // Load static comments from the HTML
        let staticComments = commentsItems.innerHTML;

        // Load userComments from localStorage
        let userCommentsJson = localStorage.getItem('userComments');

        if (userCommentsJson) {
            userComments = JSON.parse(userCommentsJson);

            // Combine static comments with userComments
            let allComments = userComments.concat(staticComments);

            // Display all comments in the comments-items
            commentsItems.innerHTML = allComments.join('');
        }
    }

    // Load comments from localStorage on page load
    loadCommentsFromLocalStorage();
})