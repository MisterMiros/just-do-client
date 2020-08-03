import { Priority } from '../primitives/priority.enum';

export class Todo {
  public id: number;
  public title: string;
  public description: string;
  public dueDate: Date;
  public priority: Priority;
  public done: boolean;
}
