var sjs = SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.querySelector('.search__results'),
  json: '/search.json',
  searchResultTemplate: '<li><a href="{url}"><img src="{image}"><span>{title}</span></a></li>',
  noResultsText: '<li class="search__not-found">Ничего не найдено 🙁</li>'
})