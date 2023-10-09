Welcome to my blog !

[//]: # ()
[//]: # ()
[//]: # (To sort categories and sub-categories by weight using _data/categories_weight.yml and assign category_name = categories concat category_weight, you can modify the code snippet you provided in the following way:)

[//]: # ()
[//]: # (First, load the categories_weight.yml file into a YAML object using Jekyll's built-in site.data variable:)

[//]: # ()
[//]: # ({% assign categories_weight = site.data.categories_weight %})

[//]: # (Modify the sort_categories assignment to sort the categories based on their corresponding weights in categories_weight.yml:)

[//]: # ()
[//]: # ({% assign sort_categories = site.categories | sort_by: '{{ item | first | lookup: categories_weight }}' %})

[//]: # (Here, we use the lookup filter to get the weight associated with each category in categories_weight.yml.)

[//]: # ()
[//]: # (Update the category_name assignment to include the weight of each category:)

[//]: # ()
[//]: # ({% assign category_name = category | first %})

[//]: # ({% assign category_weight = categories_weight[category_name] %})

[//]: # ({% assign category_display_name = category_name | append: ' ' | append: category_weight %})

[//]: # (Here, we extract the weight of each category from categories_weight.yml and append it to the category_name variable.)

[//]: # ()
[//]: # (Sort the subcategories for each category by their weights:)

[//]: # ()
[//]: # ({% assign sub_categories = site.categories[category_name] | map: 'categories' | join: ',' | split: ',' | uniq %})

[//]: # ({% assign sorted_sub_categories = sub_categories | sort_by: '{{ item | lookup: categories_weight }}' %})

[//]: # (We first extract all the subcategories for a given category using map, join, and split filters. Then, we sort the resulting list of subcategories based on their corresponding weights in categories_weight.yml using the sort_by filter.)

[//]: # ()
[//]: # (Putting it all together, here's the modified code snippet:)

[//]: # ()
[//]: # ({% assign categories_weight = site.data.categories_weight %})

[//]: # ()
[//]: # ({% assign group_index = 0 %})

[//]: # ({% assign sort_categories = site.categories | sort_by: '{{ item | first | lookup: categories_weight }}' %})

[//]: # ()
[//]: # ({% for category in sort_categories %})

[//]: # ({% assign category_name = category | first %})

[//]: # ({% assign category_weight = categories_weight[category_name] %})

[//]: # ({% assign category_display_name = category_name | append: ' ' | append: category_weight %})

[//]: # ({% assign posts_of_category = category | last %})

[//]: # ({% assign first_post = posts_of_category | first %})

[//]: # ()
[//]: # ({% if category_name == first_post.categories[0] %})

[//]: # ({% assign sub_categories = site.categories[category_name] | map: 'categories' | join: ',' | split: ',' | uniq %})

[//]: # ({% assign sorted_sub_categories = sub_categories | sort_by: '{{ item | lookup: categories_weight }}' %})

[//]: # ({% assign sub_categories_size = sorted_sub_categories | size %})

[//]: # ()
[//]: # (    <div class="card categories">)

[//]: # (      <!-- top-category -->)

[//]: # (      <div class="card-header d-flex justify-content-between hide-border-bottom")

[//]: # (          id="{{ HEAD_PREFIX }}{{ group_index }}">)

[//]: # (        <span>)

[//]: # (        {% if sub_categories_size > 0 %})

[//]: # (          <i class="far fa-folder-open fa-fw"></i>)

[//]: # (        {% else %})

[//]: # (          <i class="far fa-folder fa-fw"></i>)

[//]: # (        {% endif %})

[//]: # (          <a href="{{ site.baseurl }}/categories/{{ category_name | slugify | url_encode }}/")

[//]: # (            class="ml-1 mr-2">)

[//]: # (            {{ category_display_name }})

[//]: # (          </a>)

[//]: # ()
[//]: # (          <!-- content count -->)

[//]: # (          {% assign top_posts_size = site.categories[category_name] | size %})

[//]: # (          <span class="text-muted small font-weight-light">)

[//]: # (            {% if sub_categories_size > 0 %})

[//]: # (              {{ sub_categories_size }})

[//]: # (              {% if sub_categories_size > 1 %}categories{% else %}category{% endif %},)

[//]: # (            {% endif %})

[//]: # (              {{ top_posts_size }})

[//]: # (              post{% if top_posts_size > 1 %}s{% endif %})

[//]: # (          </span>)

[//]: # (        </span>)

[//]: # ()
[//]: # (        <!-- arrow -->)

[//]: # (        {% if sub_categories_size > 0%})

[//]: # (        <a href="#{{ LIST_PREFIX }}{{ group_index }}" data-toggle="collapse")

[//]: # (          aria-expanded="true" aria-label="{{ HEAD_PREFIX }}{{ group_index }}-trigger")

[//]: # (          class="category-trigger hide-border-bottom">)

[//]: # (          <i class="fas fa-fw fa-angle-down"></i>)

[//]: # (        </a>)

[//]: # (        {% else %})

[//]: # (        <span data-toggle="collapse" class="category-trigger hide-border-bottom disabled">)

[//]: # (          <i class="fas fa-fw fa-angle-right"></i>)

[//]: # (        </span>)

[//]: # (        {% endif %})

[//]: # ()
[//]: # (      </div> <!-- .card-header -->)

[//]: # ()
[//]: # (      <!-- Sub-categories -->)

[//]: # (      {% if sub_categories_size > 0 %})

[//]: # (      <div id="{{ LIST_PREFIX }}{{ group_index }}" class="collapse show" aria-expanded="true">)

[//]: # (        <ul class="list-group">)

[//]: # (          {% for)

[//]: # ()
[//]: # ()
[//]: # ()
[//]: # (6/7/2023, 2:42:32 PM)

[//]: # ()
[//]: # (continue)

[//]: # ()
[//]: # (6/7/2023, 2:42:57 PM)

[//]: # ()
[//]: # (sub_category in sorted_sub_categories %})

[//]: # (<li class="list-group-item d-flex justify-content-between align-items-center pl-4">)

[//]: # (<a href="{{ site.baseurl }}/categories/{{ sub_category | slugify | url_encode }}/")

[//]: # (class="ml-1 mr-2">)

[//]: # ({{ sub_category }})

[//]: # (</a>)

[//]: # (<!-- content count for sub-categories -->)

[//]: # ({% assign sub_posts_size = site.categories[sub_category] | size %})

[//]: # (<span class="badge badge-secondary badge-pill">)

[//]: # ({{ sub_posts_size }})

[//]: # (</span>)

[//]: # (</li>)

[//]: # ({% endfor %})

[//]: # (</ul>)

[//]: # (</div> <!-- .collapse -->)

[//]: # ({% endif %})

[//]: # ()
[//]: # (</div> <!-- .card -->)

[//]: # ()
[//]: # ({% assign group_index = group_index | plus: 1 %})

[//]: # ({% endif %})

[//]: # ({% endfor %})

[//]: # ()
[//]: # ()
[//]: # (Note that this modified code assumes that the `categories_weight.yml` file is structured as follows:)

[//]: # ()
[//]: # (category1: weight1)

[//]: # (category2: weight2)

[//]: # (category3: weight3)

[//]: # (...)

[//]: # ()
[//]: # ()
[//]: # (where `categoryX` represents the name of a category, and `weightX` represents its associated weight. The weights can be any numeric value, positive or negative.)
