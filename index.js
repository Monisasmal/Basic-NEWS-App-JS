const apiKey = '298422ff5aee67425b86f0a2b7459d45'; // <-- Paste your real API key here
const targetUrl = `https://gnews.io/api/v4/top-headlines?token=${apiKey}&lang=en&country=in&max=10`;
const url = `https://cors-anywhere.herokuapp.com/${targetUrl}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const newsContainer = document.getElementById('newsContainer');
    let newsHTML = '';

    data.articles.forEach((article, index) => {
      const newsItem = `
        <div class="news-card">
          <h2>${index + 1}. ${article.title}</h2>
          <p>${article.description || "No description available."}</p>
          <a href="${article.url}" target="_blank" class="read-more">Read More</a>
        </div>
      `;
      newsHTML += newsItem;
    });

    newsContainer.innerHTML = newsHTML;
  })
  .catch(error => {
    console.error('Error fetching news:', error);
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = `<p style="color: red;">Failed to load news. Please try again later.</p>`;
  });

