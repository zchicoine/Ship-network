source 'https://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.1.9'
gem 'devise', '~> 3.4.1'
gem 'slim-rails' ,'~> 3.0.1' # for more info http://slim-lang.com/
gem 'sass-rails', '~> 4.0.3'# Use SCSS for stylesheets
gem 'jbuilder', '~> 2.0' # Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'coffee-rails', '~> 4.0.0'# Use CoffeeScript for .js.coffee assets and views
gem 'jquery-rails' # Use jquery as the JavaScript library
gem 'pg'
# Pagination
gem 'will_paginate',           '3.0.7'
gem 'bootstrap-will_paginate', '0.0.10'
# for front-end, for more info http://bower.io/
gem 'bower-rails', '~> 0.9.2'
=begin
    The reason is that Angular will request those assets at runtime,
    from the browser, and since your application isn't being served from your CDN,
    the browser, as a security measure, will refuse to allow Angular to read those assets.
    One solution to that problem is to configure Cross Origin Resource-Sharing (CORS),
    but this can be tricky to set up (or impossible, depending on your CDN).
    It is also very difficult to debug if it's not working properly.
    What we'd like to do is skip all of this entirely.
    Angular caches templates after it requests them the first time,
    so we really just need to pre-populate that cache.
    This way, Angular won't need to request any assets,
    thus eliminating both the asset pipeline problem as well as the same-origin security policy.
=end
gem 'angular-rails-templates', '~> 0.1.3'

gem 'KEE', :git => 'https://'z_chicoine@hotmail.com':'?bird1977'@github.com/zchicoine/KEE.git' , :branch => 'dev', require: 'KEE'
group :development, :test do
    # Use sqlite3 as the database for Active Record
    gem 'sqlite3' , '~> 1.3.9'
    gem 'rspec-rails', ' 3.0.1'
    gem 'rails-erd' , '~> 1.4.0'# for more info https://github.com/voormedia/rails-erd
end

group :test do
  gem 'selenium-webdriver', '~> 2.42.0' 
  gem 'capybara', '~> 2.3.0'
  gem 'shoulda', '~> 3.5.0'
  gem 'factory_girl_rails', '~> 4.4.1'
end



# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem 'therubyracer',  platforms: :ruby

gem 'geocoder'

# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'

# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0',          group: :doc

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Use debugger
# gem 'debugger', group: [:development, :test]

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin]
# for Heroku
group :production do
  gem 'rails_12factor'
end
