module ApplicationHelper
    # this function return a string of the project name which is ship network to be used in views
    
    def project_name
        "The Ship Network"
    end 

    def remove_white_space name = ""

        name.delete(' ')
    end
end
