class CreateHotels < ActiveRecord::Migration[6.1]
  def change
    create_table :hotels do |t|
      t.text :hotel_name
      t.text :location
      t.text :amenities
    end
  end
end
