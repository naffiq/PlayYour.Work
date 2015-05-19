class WspacesController < ApplicationController
  def index
  	respond_with Wspace.all
  end

  def show
  	respond_with Wspace.find(params[:id])
  end

  def create
    respond_with Wspace.create(wspace_params)
  end

  private
  def wspace_params
    params.require(:wspace).permit(:title, :user_id)
  end
end
