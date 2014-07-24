module UserHelper


    def sign_in?

        if(!session[:user].nil?)

            true
        else
            false
        end


    end
end

