import { Priority } from "../primitives/priority.enum";

export class PutTodoRequest {
  public title: string;
  public description: string;
  public dueDate: Date;
  public priority: Priority;
  public done: boolean;
}
