Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".
    root 'main_pages#index'

    post 'side_bar/region' => 'side_bar#region'
    post 'side_bar/ship' => 'side_bar#ship'
    post 'side_bar/default' => 'side_bar#default'
    post 'side_bar/port' => 'side_bar#port'
    post 'side_bar/index' => 'side_bar#index'
    post  'google_map/port_coordinates' => 'google_map#port_coordinates'
    post  'google_map/display_ship_on_side_bar' => 'google_map#display_ship_on_side_bar'
    post 'user/sign_in' => 'user#sign_in'
    post 'user/sign_out' => 'user#sign_out'
    post 'link_list_back_history/refresh' => 'link_list_back_history#refresh'
    post 'main_pages/port' => "main_pages#port"
    get 'main_pages/loginpage'
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
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
