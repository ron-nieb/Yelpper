class Hotel < ActiveRecord::Base
    has_many :comments
    has_many :user, through: :comments
end