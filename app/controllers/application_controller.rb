class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # this is used to know from which layer (Port,Ship etc) the request coming from
  include LevelDefine
  require 'parameter_sanitizer'

  protected

  def devise_parameter_sanitizer
      if resource_class == Broker
          ParameterSanitizer.new(Broker, :broker, params)
      else
          super # Use the default one
      end
  end


end
