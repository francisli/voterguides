class Pick < ApplicationRecord
  belongs_to :org
  belongs_to :measure
  belongs_to :choice, optional: true
  acts_as_list scope: [:org, :measure]

  METADATA_SCHEMA = {
    "type": "object",
    "$schema": "http://json-schema.org/draft-04/schema",
    "properties": {
      "recommendation": { "type": "boolean" },
      "info": { "type": "string" }
    },
    "required": ["recommendation"],
    "additionalProperties": false
  }
  validates :metadata, json: { schema: METADATA_SCHEMA }
end
