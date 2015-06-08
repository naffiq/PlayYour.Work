class Wspace < ActiveRecord::Base
  has_many :projects

  has_many :wgroupings, :dependent => :destroy
  has_many :users, :through => :wgroupings

  def as_json(options = {})
  	super(options.merge(include: [:projects, :users]))
  end
end
