document.addEventListener('DOMContentLoaded', function() {
    const allSections = document.querySelectorAll('.site-section');
    const fullBlogPostSection = document.getElementById('full-blog-post-section');
    const fullBlogPostContent = document.getElementById('full-blog-post-content');
    const backToMainBtn = document.getElementById('back-to-main');
    const heroSection = document.getElementById('home-section');

    // Handle "Read More" clicks
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const postUrl = this.getAttribute('data-post-url');
            fetch(postUrl)
                .then(response => response.text())
                .then(html => {
                    fullBlogPostContent.innerHTML = html;
                    // Hide all sections except the full blog post
                    allSections.forEach(section => {
                        if (section !== fullBlogPostSection) {
                            section.style.display = 'none';
                        }
                    });
                    // Explicitly hide the hero section

                    if (heroSection) {
                        heroSection.style.display = 'none';
                    }
                    fullBlogPostSection.style.display = 'block';
                    const scrollOffset = window.innerHeight * 0.05;
                    window.scrollTo({
                    top: scrollOffset,
                    behavior: 'smooth' // Optional: adds a smooth scrolling effect
                });
                })
                .catch(error => console.error('Error loading blog post:', error));
        });
    });

    // Handle "Back to Main Site" clicks
    if (backToMainBtn) {
        backToMainBtn.addEventListener('click', function() {
            fullBlogPostSection.style.display = 'none';
            // Show all sections again, except those that were originally hidden
            allSections.forEach(section => {
                if (section.id !== 'team-section' && section.id !== 'full-blog-post-section') {
                    section.style.removeProperty('display');
                }
            });
            // Explicitly show the hero section

            if (heroSection) {
                heroSection.style.removeProperty('display');
            }
             window.scrollTo({
                    top: 0,
                    behavior: 'smooth' // Optional: adds a smooth scrolling effect
                });
        });
    } else {
        console.error("Back to main button not found");
    }
});