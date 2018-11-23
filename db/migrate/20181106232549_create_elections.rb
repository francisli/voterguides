class CreateElections < ActiveRecord::Migration[5.2]
  def change
    create_table :elections, id: :uuid do |t|
      t.date :date, null: false
      t.jsonb :metadata
      t.timestamps
    end
    add_index :elections, :date, unique: true

    create_table :measures, id: :uuid do |t|
      t.uuid :election_id, null: false
      t.string :title, null: false
      t.integer :position
      t.jsonb :metadata
      t.timestamps
    end
    add_foreign_key :measures, :elections
    add_index :measures, [:election_id, :position]

    create_table :choices, id: :uuid do |t|
      t.uuid :measure_id, null: false
      t.string :title, null: false
      t.integer :position
      t.jsonb :metadata
      t.timestamps
    end
    add_foreign_key :choices, :measures
    add_index :choices, [:measure_id, :position]

    create_table :orgs, id: :uuid do |t|
      t.string :name, null: false
      t.jsonb :metadata
      t.timestamps
    end

    create_table :picks, id: :uuid do |t|
      t.uuid :org_id, null: false
      t.uuid :measure_id, null: false
      t.uuid :choice_id
      t.integer :position
      t.jsonb :metadata
      t.timestamps
    end
    add_foreign_key :picks, :orgs
    add_foreign_key :picks, :measures
    add_foreign_key :picks, :choices
    add_index :picks, [:org_id, :measure_id, :choice_id], unique: true
  end
end
