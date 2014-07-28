module LinkListBackHistoryHelperC
    include LevelDefine

    def create_history
        session[:link_list_back_history] = nil
        session[:link_list_back_history] = {}
        session[:link_list_back_history]['name'] = ['Global']
        session[:link_list_back_history]['url'] = [root_path]

        assign_session_to_the_variable
    end

    def push_to_history_with_url name = "nil", url = root_path
        assign_session_to_the_variable
        @linklist_back_history['name'].push(name)
        @linklist_back_history['url'].push(url)
        assign_the_variable_to_session
    end

    def push_to_history_with_level name = "nil", level = 0
        assign_session_to_the_variable
        @linklist_back_history['name'].push(name)
        @linklist_back_history['url'].push(level_to_url name, level)
        assign_the_variable_to_session
    end

    def pop_from_history
        @linklist_back_history['name'].pop
        @linklist_back_history['url'].pop
    end
    def remove_from_history_include_level level = 0
        assign_session_to_the_variable
        temp_array = @linklist_back_history['name']
        temp_array_length = temp_array.length
        if level < temp_array_length
            indices = level..temp_array_length - 1
            indices.reverse_each do |index|
                temp_array.delete_at index
            end
            assign_the_variable_to_session
        end


    end
    # not include the level number, this when the user clicks on the history link list
    def remove_from_history_not_include_level level = 0
        assign_session_to_the_variable
        temp_array = @linklist_back_history['name']
        temp_array_length = temp_array.length
        temp_level = level + 1
        if temp_level < temp_array_length
            indices = temp_level..temp_array_length - 1
            indices.each do |index|
                temp_array.delete_at index
            end
            assign_the_variable_to_session
        end


    end
    # def insert_to_history index = -1, name ="nil"
    #     @linklist_back_history['name'].insert(index,name)
    # end
    # def remove_from_history index = -1
    #     @linklist_back_history[:name].delete_at index
    # end

    #
    #

    private
    def assign_session_to_the_variable
        @linklist_back_history = session[:link_list_back_history]
        a = @linklist_back_history

    end
    def assign_the_variable_to_session
         session[:link_list_back_history] = @linklist_back_history
    end
    def level_to_url name = "nil",level = 0
        _level = level.to_i
        case _level
            when GLOBAL_LEVEL
                root_path
            when REGION_LEVEL
                main_pages_region_path(:region_info => {name:name})
            when PORT_LEVEL
                main_pages_port_path(:port_info => {port_name:name})
            when SHIP_LEVEL
                main_pages_ship_path(:ship_info => {ship_name:name})

        end


    end
end