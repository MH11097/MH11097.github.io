module Jekyll
  module Filters
    def sort_by_weight(categories)
      weights = data['category_weights']
      categories.sort_by { |category| weights[category.downcase] || 9999 }
    end
  end
end
