class AddWspaceToUser < ActiveRecord::Migration
  def change
    add_reference :users, :wspace, index: true, foreign_key: true
  end
end
