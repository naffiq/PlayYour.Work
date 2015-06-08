class AddUserToTask < ActiveRecord::Migration
  def change
    add_column :tasks, :author_id, :integer
    add_column :tasks, :executant_id, :integer
    add_column :tasks, :xp, :integer
    add_column :tasks, :deadline, :date
  end
end
