Rails.application.routes.draw do

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".
    root 'main_pages#index'

    devise_for :brokers, controllers: { sessions: 'brokers/sessions'}

    #-------------- Admin panel --------------#
    match 'admin/', to: 'admin/main#index', via: 'get'
    match 'admin/upload_ports_file', to: 'admin/main#upload_ports_file', via: 'post'
    match 'admin/upload_ships_file', to: 'admin/main#upload_ships_file', via: 'post'
    match 'admin/reset_ships', to: 'admin/main#reset_ships', via: 'post'
    match 'admin/reset_ports', to: 'admin/main#reset_ports', via: 'post'
    #--------------
    match 'admin/shipment', to: 'admin/shipment#index', via: 'get'
    match 'admin/shipment/upload', to: 'admin/shipment#upload_shipments_file', via: 'post'
    match 'admin/shipment/reset', to: 'admin/shipment#reset', via: 'post'
    #--------------
    match 'admin/email', to: 'admin/email#index', via: 'get'
    match 'admin/email/categorize', to: 'admin/email#categorize', via: 'post'
    match 'admin/email/categorize_update', to: 'admin/email#categorize_update', via: 'post'
    match 'admin/email/update_broker_ship_emails', to: 'admin/email#update_broker_ship_emails', via: 'post'
    match 'admin/email/reset', to: 'admin/email#reset', via: 'post'
    #--------------
    match 'admin/broker', to: 'admin/broker#index', via: 'get'
    match 'admin/broker/upload_brokers_file', to: 'admin/broker#upload_brokers_file', via: 'post'
    match 'admin/broker/reset', to: 'admin/broker#reset', via: 'post'
    #-------------- End Admin panel --------------#
    #--------------
    post 'side_panel/index' => 'side_panel#index'
    post 'side_panel/region_short_info' => 'side_panel#region_short_info'
    post 'side_panel/broker_contact' => 'side_panel#broker_contact'
    #--------------
    post 'google_map/port_coordinates' => 'google_map#port_coordinates'
    post 'google_map/index' => 'google_map#index'

    #--------------
    post 'ship_details/show' => 'ship_details#show'
    post  'ship_details/close' => 'ship_details#close'
    #--------------
    post 'main_pages/region' => 'main_pages#region'
    post 'main_pages/port' => 'main_pages#port'
    post 'main_pages/ship' => 'main_pages#ship'



  # You can have the root of your site routed with "root"
 

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin_helpers do
  #     # Directs /admin_helpers/products/* to Admin::ProductsController
  #     # (app/controllers/admin_helpers/products_controller.rb)
  #     resources :products
  #   end
end
