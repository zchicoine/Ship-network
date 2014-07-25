class LinkListBackHistoryController <ApplicationController
    include LinkListBackHistoryHelper


    def refresh
        parameters = params[:name]
        push_to_history parameters
        render :partial =>  'main_pages/link_list_back_history/index'
    end
end