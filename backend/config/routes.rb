Rails.application.routes.draw do
  resources :comments

  namespace :api do
    resources :features, only: [:index]
  end
  
  namespace :api do
    resources :features do
      resources :comments, only: [:create] 
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check

end
