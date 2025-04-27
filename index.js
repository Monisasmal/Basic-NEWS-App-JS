let apiKey = '047aed9f871343aeb3a055340046027d';
let sources = 'bbc-news';

let newsAccordion = document.getElementById('newsAccordion');

async function fetchNews() {
    try {
        let response = await fetch(`https://newsapi.org/v2/top-headlines?sources=${sources}&apiKey=${apiKey}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        let data = await response.json();
        let articles = data.articles;
        console.log(articles);

        let newsHtml = "";

        articles.forEach((element, index) => {
            let news = `
                <div class="accordion-item">
                    <div class="accordion-header" onclick="toggleAccordion(this)">
                        <b>Breaking News ${index + 1}:</b> ${element.title}
                    </div>
                    <div class="accordion-content">
                        ${element.content ? element.content : "No content available."}
                        <br><br>
                        <a href="${element.url}" target="_blank">Read more</a>
                    </div>
                </div>`;
            newsHtml += news;
        });

        newsAccordion.innerHTML = newsHtml;
    } catch (error) {
        console.error('Error fetching the news:', error);
        newsAccordion.innerHTML = `<p style="color:red;">Unable to load news. Please try again later.</p>`;
    }
}

fetchNews();

// Accordion toggle
function toggleAccordion(header) {
    const item = header.parentElement;
    item.classList.toggle('active');
}
