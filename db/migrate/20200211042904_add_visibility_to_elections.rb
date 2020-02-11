class AddVisibilityToElections < ActiveRecord::Migration[5.2]
  def change
    add_column :elections, :visible, :boolean, null: false, default: false
  end
end
