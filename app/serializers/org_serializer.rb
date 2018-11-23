class OrgSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :metadata, :updated_at, :created_at
end
