class ElectionSerializer
  include FastJsonapi::ObjectSerializer
  attributes :date, :metadata, :updated_at, :created_at
end
