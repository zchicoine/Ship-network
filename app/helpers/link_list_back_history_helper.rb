module LinkListBackHistoryHelper


    def create_history
        session[:link_list_back_history] = nil
        session[:link_list_back_history] = {}
        session[:link_list_back_history][:name] = ['Global']
        session[:link_list_back_history][:url] = root_path

        assign_seesion_to_the_variable
    end

    def push_to_history name = "nil"
        assign_seesion_to_the_variable
        @linklist_back_history['name'].push(name)
        a = @linklist_back_history
    end

    def pop_from_history
        @linklist_back_history[:name].pop
    end
    def insert_to_history index = -1, name ="nil"
        @linklist_back_history[:name].insert(index,name)
    end
    def remove_from_history index = -1
        @linklist_back_history[:name].delete_at index
    end


    def assign_seesion_to_the_variable
        @linklist_back_history = session[:link_list_back_history]

    end

end