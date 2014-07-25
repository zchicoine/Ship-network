class LinkListBackHistoryController <ApplicationController
    include LinkListBackHistoryHelper


    def refresh
        parameters = params[:name]
        push_to_history parameters

      #  render inline: "<div class='link_list_back_history'>
    # <% @linklist_back_history['name'].each do |value| %>
    #
    #     <%= link_to  value  , '#', class:'link_list_back_history' , method: :get %>
    #
    #     <% end %>
    #
    # </div>"
        render :partial =>  'main_pages/link_list_back_history/index'
    end
end