require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ShipNetwork
  class Application < Rails::Application
    include Kee
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
     #config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
      config.autoload_paths += Dir[Rails.root.join('app', 'models', '*.{**/}').to_s]
      config.autoload_paths += Dir[Rails.root.join('app', 'models', '{**}')]
      config.autoload_paths += Dir[Rails.root.join('app', 'helpers', '*.{**/}').to_s]
      config.autoload_paths += Dir[Rails.root.join('app', 'helpers', '{**}')]
      config.autoload_paths += Dir[Rails.root.join('app', 'helpers/controller_helpers', '*.{**/}').to_s]
    # config.i18n.default_locale = :de

    # config.after_initialize takes a block which will be run after Rails has finished initializing the application.
    # That includes the initialization of the framework itself
    config.after_initialize do
      email_config = {auth_type: :basic , email_address:'strtupfab5@gmail.com',password:'Hj12!@#$'}
      Kee.config_connection(email_config)
    end

  end
end
