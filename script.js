document.addEventListener('DOMContentLoaded', () => {
    const commentToggles = document.querySelectorAll('.comment-toggle');
    commentToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const comments = toggle.parentElement.querySelector('.comments');
            comments.classList.toggle('hidden');
        });
    });

    const postForm = document.getElementById('post-form');
    postForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        
        fetch('http://localhost:3000/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            postForm.reset();
        })
        .catch(error => console.error('Error:', error));
    });

    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = event.target.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            scrollToElement(targetElement);
        });
    });

    function scrollToElement(element) {
        window.scrollTo({
            top: element.offsetTop - 60,
            behavior: 'smooth'
        });
    }

    const relatedPostsContainer = document.getElementById('related-posts');
    fetch('http://localhost:3000/api/related-posts')
        .then(response => response.json())
        .then(relatedPosts => {
            relatedPosts.forEach(post => {
                const postItem = document.createElement('li');
                postItem.innerHTML = `<a href="#">${post}</a>`;
                relatedPostsContainer.querySelector('ul').appendChild(postItem);
            });
        })
        .catch(error => console.error('Error fetching related posts:', error));
});