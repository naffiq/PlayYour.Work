class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  after_update :create_wspace

  private
  def create_wspace
    if !self.wspace_id && !Wspace.exists?(id: self.id)
      wspace = Wspace.new
      wspace.title = 'My workspace'
      wspace.user_id = self.id  
      wspace.save!
      self.wspace_id = wspace.id
      self.save!
    end
  end
end
