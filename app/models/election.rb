class Election < ApplicationRecord
  validates :date, uniqueness: true
  has_many :measures, ->{ order(:position) }
  has_many :picks, through: :measures
end
