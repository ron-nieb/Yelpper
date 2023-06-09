class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'
  
  # All hotels
  get "/hotels" do
    hotels=Hotel.All
    hotels.to_json
  end
  #all reviews
  get "/reviews" do
    reviews=Reviews.All
    reviews.to_json
  end
  #all users
  get "/users" do
    users=User.All
    users.to_json
  end
  #delete reviews
  get "/reviews/:id" do
    reviews=Reviews.find(params[:id])
    reviews.destroy
    reviews.to_json
  end
  #post hotel
  #add review
  #patch review
  
end
