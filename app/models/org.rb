class Org < ApplicationRecord
  validates :name, presence: true

  METADATA_SCHEMA = {
    "type": "object",
    "$schema": "http://json-schema.org/draft-04/schema",
    "properties": {
      "url": { "type": "string" }
    },
    "required": ["url"],
    "additionalProperties": false
  }
  validates :metadata, json: { schema: METADATA_SCHEMA }
end
