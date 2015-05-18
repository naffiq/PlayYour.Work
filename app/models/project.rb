class Project < ActiveRecord::Base
  has_many :tasks

  def as_json(options = {})
  	super(options.merge(include: :tasks))
  end
end
