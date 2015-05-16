# TODO explain what this file responsibility

class ParameterSanitizer < Devise::ParameterSanitizer

        def sign_in
            default_params.permit(:username)
        end

        # def sign_up
        #     default_params.permit(:username, :email, :password)
        # end
    end
