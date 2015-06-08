class TasksController < ApplicationController

  def create
  	project = Project.find(params[:project_id])
  	task = current_user.tasks.create(task_params.merge(project_id: params[:project_id]))
  	respond_with project, task
  end

  def priority
  	project = Project.find(params[:project_id])
  	task = project.tasks.find(params[:id])

  	if task.priority >= 4
  	  task.priority = 0
  	end
  	task.priority += 1
  	task.save!

  	respond_with task
  end

  def complete
  	project = Project.find(params[:project_id])
  	task = project.tasks.find(params[:id])

  	task.status = !task.status
    task.save!

  	respond_with project, task
  end

  private
  def task_params
  	params.require(:task).permit(:body, :state, :priority)
  end
end
