class Task < ActiveRecord::Base
  belongs_to :project

  belongs_to :executant, :class_name => "User"
  belongs_to :author, :class_name => "User"
end
