class Measure < ApplicationRecord
  belongs_to :election
  acts_as_list scope: :election

  has_many :choices, ->{ order(:position) }, inverse_of: :measure
  accepts_nested_attributes_for :choices, allow_destroy: true

  has_many :picks

  validates :title, presence: true

  METADATA_SCHEMA = {
    "type": "object",
    "$schema": "http://json-schema.org/draft-04/schema",
    "properties": {
      "question": { "type": "string" },
      "info": { "type": "string" },
      "short_info": { "type": "string" },
      "type": {
        "type": "string",
        "pattern": "election|measure"
      },
      "voting_method": {
        "type": "string",
        "pattern": "plurality|approval|instant-runoff|ranked"
      },
      "threshold": { "type": "string" },
    },
    "required": ["type"],
    "additionalProperties": false
  }
  validates :metadata, json: { schema: METADATA_SCHEMA }
end
