module ApplicationHelper
    include LocalizationHelper
    # this function return a string of the project name which is ship network to be used in views
    def project_name
        locales_CEW.websiteName
    end 

    def remove_white_space name = ""
        name.delete(' ')
    end
=begin
    @params
    number: an integer
    word: the word that need to be pluralized
    pluralize_word: the pluralize form of the word
    @return
    the word either pluralize or not based on the value of the number
=end
    def pluralize_word(number,word,pluralize_word)
        if(word.is_a? String  and pluralize_word.is_a? String)
            if(number > 1 )
                return pluralize_word
            else
                return word
            end
        end
    end

end
