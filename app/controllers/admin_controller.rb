class AdminController < ApplicationController

  before_action :require_admin_authentification #the admin controller has to be protected to only let admins in.

  def require_admin_authentification
    unless current_broker.try(:admin?)
      redirect_to root_path                    #if a broker tries to view and admin page/action, they will be redirected to the main page.
    end
  end

  def index
      render ('index')  #render the admin view. The main page controller calls this action after the admin logs in
  end
end
