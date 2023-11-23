document.addEventListener('DOMContentLoaded', ()=>{
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = dd + '.' + mm + '.' + yyyy;
    let dateElements = document.querySelectorAll('.comments-item__date');

    dateElements.forEach(function(dateElement) {
        dateElement.textContent = today;
    });
    // Функция для добавления комментария
    let commentsForm = document.querySelector('.comments-form')
    
        // Load existing comments from localStorage and display them
        loadCommentsFromLocalStorage();

        // Add submit event listener to the form
        document.getElementById('comments-form').addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the form from submitting traditionally

            // Get the values from the form
            var name = document.getElementById('name').value;
            var message = document.getElementById('comments-message').value;

            // Create a new comment element
            var newComment = document.createElement('div');
            newComment.className = 'comments-item';
            newComment.innerHTML = '<h2 class="comments-item__name">' + name + '</h2>' +
                '<div class="comments-item__date">' + getCurrentDate() + '</div>' +
                '<div class="comments-item__message"><p>' + message + '</p></div>';

            // Insert the new comment at the beginning of the comments-items
            var commentsItems = document.getElementById('comments-items');
            commentsItems.insertBefore(newComment, commentsItems.firstChild);

            // Save comments to localStorage
            saveCommentsToLocalStorage();
        });

        function getCurrentDate() {
            var date = new Date();
            var day = date.getDate();
            var month = date.getMonth() + 1; // Months are zero-indexed
            var year = date.getFullYear();

            return day + '.' + month + '.' + year;
        }

        function saveCommentsToLocalStorage(e) {
            e.preventDefault()
            var commentsItems = document.getElementById('comments-items');
            var comments = commentsItems.innerHTML;
            localStorage.setItem('comments', comments);
            var name = document.getElementById('name');
            var message = document.getElementById('comments-message');
            name.value = ''
            message.value = ''
        }

        function loadCommentsFromLocalStorage() {
            var commentsItems = document.getElementById('comments-items');
            var comments = localStorage.getItem('comments');

            if (comments) {
                commentsItems.innerHTML = comments;
            }
        }
    commentsForm.addEventListener('submit',saveCommentsToLocalStorage)
})