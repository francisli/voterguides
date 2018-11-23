class Choice < ApplicationRecord
  belongs_to :measure
  acts_as_list scope: :measure

  validates :title, presence: true

  METADATA_SCHEMA = {
    "type": "object",
    "$schema": "http://json-schema.org/draft-04/schema",
    "properties": {
      "info": { "type": "string" },
    },
    "additionalProperties": false
  }
  validates :metadata, json: { schema: METADATA_SCHEMA }
end
