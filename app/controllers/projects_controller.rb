class ProjectsController < ApplicationController
  def index
    wspace = Wspace.find(current_user.wspace_id)
    respond_with wspace.projects.all
  end

  def create
    wspace = Wspace.find(params[:wspace_id])
    respond_with wspace.projects.create(project_params)
  end

  def show
    respond_with Project.find(params[:id])
  end

  def priority
    project = Project.find(params[:id])
    if project.priority >= 4
      project.priority = 0
    end
    project.priority += 1;
    project.save!

    respond_with project
  end

  def change
    wspace = current_user.wspaces.find(params[:id])
    if !wspace.nil?
      current_user.wspace_id = wspace
      current_user.save!
    end

    respond_with current_user.wspace
  end

  private
  def project_params
    params.require(:project).permit(:title, :priority)
  end
end
