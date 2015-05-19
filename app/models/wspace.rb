class Wspace < ActiveRecord::Base
  has_many :projects

  def as_json(options = {})
  	super(options.merge(include: :projects))
  end
end
