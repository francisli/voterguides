Rails.application.routes.draw do
  namespace :api do
    resources :elections
    resources :measures do
      patch 'up'
      patch 'down'
    end
    resources :orgs
    resources :picks
  end

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'admin(/*path)', to: 'home#admin', as: 'admin'
  root to: 'home#index'
end unless ARGV.include? "assets:precompile" # hack to prevent errors during assets:precompile in Docker image build
