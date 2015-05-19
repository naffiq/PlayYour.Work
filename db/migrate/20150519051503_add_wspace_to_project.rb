class AddWspaceToProject < ActiveRecord::Migration
  def change
    add_reference :projects, :wspace, index: true, foreign_key: true
  end
end
