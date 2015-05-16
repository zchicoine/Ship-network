# TODO review this file and delete unnecessary comments and code

class LinkListBackHistoryController <ApplicationController
    include  LinkListBackHistoryHelperC


    def refresh

        parameters = params
        level = parameters[:level].to_i
        unless level.nil? and !level.is_a? Integer
            remove_history_after_include_level level
        end
        push_to_history_with_level parameters[:name], level
        render :partial =>  'main_pages/link_list_back_history/index'
    end

    private

    def remove_history_after_level level = 0
        remove_from_history_not_include_level level
    end
    def remove_history_after_include_level level = 0

        remove_from_history_include_level level
    end
end