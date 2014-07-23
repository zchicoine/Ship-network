module UserHelper


    def sign_in?

        if(!session[:user].nil?)

            true
        end

        false
    end
end

