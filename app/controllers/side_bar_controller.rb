class SideBarController < ApplicationController

    @table # to decide which table will be display
    @region_info

    def region

    @table =self.action_name
       # unless name.is_a?(as_json)
       #     "Error: has to be json object."
       #  end
       # @region_info = JSON.parse(params[:name])
      @region_info = { name:'North America'}
        render 'side_bar/_region.html.erb'
       # respond_to do |format|
       #     msg = { :status => "ok", :message => "Success!", :html => "<b>...</b>" }
       #     format.json  { render :json => msg } # don't do msg.to_json
       # end

    end
    def default

        @table = self.action_name
    end


end