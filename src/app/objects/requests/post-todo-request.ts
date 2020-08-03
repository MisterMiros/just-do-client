import { Priority } from "../primitives/priority.enum";

export class PostTodoRequest {
  public title: string;
  public description: string;
  public dueDate: Date;
  public priority: Priority;
}
