---
title: "Бесплатные паттерны"
layout: "base.njk"
pagination:
  data: collections.patterns
  size: 9
  alias: posts
  reverse: true
permalink: "{% if pagination.pageNumber > 0 %}/pages/page-{{ pagination.pageNumber + 1 }}{% endif %}/index.html"
---

{% for post in pagination.items %}
  {% include "small-post.njk" %}
{% endfor %}
