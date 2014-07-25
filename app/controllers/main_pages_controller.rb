=begin
    This is the main pages of the ship network
=end

class MainPagesController < ApplicationController
    include LinkListBackHistoryHelper

    def index
     create_history

    end
    def loginpage
        respond_to do |format|
            format.html {render :partial =>  'main_pages/login'}
            format.js {render 'main_pages/js/login'}
        end

    end
end
