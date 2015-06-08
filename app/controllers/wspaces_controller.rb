class WspacesController < ApplicationController
  def index
  	respond_with current_user.wspaces.all
  end

  def show
    wspace = current_user.wspaces.find(params[:id])
    if wspace
      current_user.wspace_id = params[:id]
      current_user.save!
    end
  	respond_with wspace
  end

  def create
    wspace = current_user.wspaces.create(wspace_params)
    # wspace.user_id = current_user.id
    # wspace.save!
    respond_with wspace
  end

  def invite
  	wspace = Wspace.find(params[:id])
  	user = User.find_by_email(params[:email])

  	if !user.nil? && !Wgrouping.exists?(wspace_id: wspace.id, user_id: user.id)
  		wspace.users.push(user)
  	end

    respond_with wspace
  end

  def remove
    # wspace = Wspace.find(params[:id])
    # user = User.find_by_email(params[:email])

    # Wgrouping.fin
  end

  private
  def wspace_params
    params.require(:wspace).permit(:title, :user_id)
  end
end
