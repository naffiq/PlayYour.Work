class Project < ActiveRecord::Base
  belongs_to :wspace
  has_many :tasks

  def as_json(options = {})
  	super(options.merge(include: :tasks))
  end
end
