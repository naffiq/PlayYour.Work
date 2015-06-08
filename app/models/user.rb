class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  after_update :create_wspace

  has_many :wgroupings, :dependent => :destroy
  has_many :wspaces, :through => :wgroupings

  has_many :projects, :through => :wspaces

  has_many :tasks, :class_name => "Task", :foreign_key => "author_id"
  has_many :assigned_tasks, :class_name => "Task", :foreign_key => "executant_id"

  belongs_to :wspace

  private
  def create_wspace
    if !self.wspace_id && !Wspace.exists?(user_id: self.id)
      wspace = Wspace.create({title: 'My workspace', user_id: self.id})

      self.wgroupings.create({wspace_id: wspace.id})
      self.wspace = wspace
      self.save!
    end
  end
end
