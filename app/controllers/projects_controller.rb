class ProjectsController < ApplicationController
  def index
  	respond_with Project.all
  end

  def create
  	respond_with Project.create(project_params)
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

  private
  def project_params
  	params.require(:project).permit(:title, :priority)
  end
end
