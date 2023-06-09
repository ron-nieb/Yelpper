puts "🌱 Seeding spices..."

# Seed your database here
user1 = User.create(user_name: "John")
user2 = User.create(user_name: "Mary")
user3 = User.create(user_name: "Ken")


hotel1 = Hotel.create(hotel_name: "Tarboosh", location: "Mombasa", amenities: "swimming pool" )
hotel2 = Hotel.create(hotel_name: "El paradiso", location: "Nairobi", amenities: "swimming pool")


Comment.create(user_id: user1.id, hotel_id: hotel1.id, comment: "Nice hotel")
Comment.create(user_id: user2.id, hotel_id: hotel1.id, comment: "Great hotel")
Comment.create(user_id: user1.id, hotel_id: hotel2.id, comment: "Not good")

puts "✅ Done seeding!"
