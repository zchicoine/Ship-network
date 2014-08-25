class Brokers::SessionsController < Devise::SessionsController

    respond_to :html, :js
    #Get broker/sing_in
    def new
        self.resource = resource_class.new(sign_in_params)
        clean_up_passwords(resource)
        respond_with(resource, serialize_options(resource)) do |format|
            format.html {render :partial =>  'main_pages/login'}
            format.js {render 'main_pages/js/login' , :locals => { error: nil}}
        end
    end

    # POST /resource/sign_in
    def create

       broker =  catch :warden do
               self.resource = warden.authenticate!(auth_options)
        end
           if broker.is_a? Broker
               set_flash_message(:notice, :signed_in) if is_flashing_format?
               sign_in(resource_name, resource)
               yield resource if block_given?
               respond_with(resource) do |format|
                   format.html {root_path}
                   format.js {render 'main_pages/js/sign_in'}
               end
           else
               render 'main_pages/js/login', :locals => { error: "invaild username or password" }
           end



    end
end

