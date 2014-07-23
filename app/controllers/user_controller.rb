class User < ApplicationController


    def sign_in user_name
        session[:user] = user_name

    end

end