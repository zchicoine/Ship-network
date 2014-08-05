class UserController < ApplicationController


    def sign_in

        if authentication_user? params[:username], params[:password]
            session[:user] = params[:username]

            respond_to do |format|
                format.html { redirect_to root_path}
                format.js {render 'main_pages/js/sign_in'}
            end
        else
            flash[:login_error] = "Username or password is incorrect"
        end


    end

    def sign_out
        session[:user] = nil
        redirect_to root_path

    end


    private

    def authentication_user? name, password

        if name == "Zack" and password =="ship"
            true
        else
            false
        end

    end
end