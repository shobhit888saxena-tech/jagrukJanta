const API_KEY = '39755b60d8194ed19a881e2304eb11c1'; // 
const newsContainer = document.getElementById('news-container');

async function fetchNews() {
  try {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`);
    const data = await res.json();

    if (data.articles && data.articles.length > 0) {
      newsContainer.innerHTML = "";
      data.articles.forEach(article => {
        const newsEl = document.createElement('div');
        newsEl.className = 'article';
        newsEl.innerHTML = `
          <h2>${article.title}</h2>
          <p>${article.description || "No description available."}</p>
          <a href="${article.url}" target="_blank">Read More</a>
        `;
        newsContainer.appendChild(newsEl);
      });
    } else {
      newsContainer.innerHTML = "<p>No news found.</p>";
    }
  } catch (err) {
    newsContainer.innerHTML = "<p>Failed to load news. Please try again later.</p>";
    console.error(err);
  }
}

// Fetch news on load
fetchNews();
// Auto-refresh every 60 seconds
setInterval(fetchNews, 60000);
