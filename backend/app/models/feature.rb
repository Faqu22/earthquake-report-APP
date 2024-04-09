class Feature < ApplicationRecord
  validates :title, :url, :place, :magType, presence: true
  validates :longitude, :latitude, presence: true
  validates :mag, numericality: { greater_than_or_equal_to: -1.0, less_than_or_equal_to: 10.0 }
  validates :latitude, numericality: { greater_than_or_equal_to: -90.0, less_than_or_equal_to: 90.0 }
  validates :longitude, numericality: { greater_than_or_equal_to: -180.0, less_than_or_equal_to: 180.0 }
  validates :title, uniqueness: { scope: [:url, :place, :magType, :longitude, :latitude] }
  has_many :comments, dependent: :destroy 
end
