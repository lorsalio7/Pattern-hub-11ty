module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("/sitemap.xml");
  eleventyConfig.addPassthroughCopy("css/");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("img/");
  eleventyConfig.addPassthroughCopy("fonts/");
  eleventyConfig.addPassthroughCopy("js/");
  eleventyConfig.addPassthroughCopy("images/");
  eleventyConfig.addPassthroughCopy("/search.json");
  eleventyConfig.addPassthroughCopy("CNAME");

  eleventyConfig.addFilter("isHomePage", function(page) {
    return page.url === "/";
  });

  /* Фильтр для русской даты  */
  eleventyConfig.addFilter("ruDate", function(value) {
    return value.toLocaleString("ru", {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    }).replace(" г.", "");
  });

  /* Фильтр для sitemap даты  */
  eleventyConfig.addFilter("mapDate", function(value) {
    return value.toISOString().split('T')[0];
  });

  eleventyConfig.addGlobalData("siteTitle", "Бесплатные бесшовные паттерны с возможностью коммерческого использования")
  eleventyConfig.addGlobalData("siteName", "Pattern Hub - бесплатные бесшовные паттерны")
  eleventyConfig.addGlobalData("siteUrl", "https://pattern-hub.ru")
  eleventyConfig.addGlobalData("siteDescription", "Скачайте бесплатно бесшовные паттерны для создания уникальных эффектов и фонов! В нашем ассортименте вы найдете разнообразные дизайны, включая векторный формат, позволяющий изменять палитру цветов.")
  eleventyConfig.addGlobalData("aboutDescription", "На нашем ресурсе вы можете найти множество бесплатных графических паттернов, помогающие создавать оригинальный и запоминающийся стиль любым вашим проектам.")
  eleventyConfig.addGlobalData("contactsDescription", "Здесь вы найдете все способы связи с нами, задать вопрос, оставить отзыв или обсудить сотрудничество. Мы всегда рады помочь.")

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "includes",
      layouts: "layouts"
    },
    dataTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk"]
  }
}