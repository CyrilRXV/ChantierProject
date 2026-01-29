export enum WorksiteStatusEnum {
  ToDo = 'to_do',
  InProgress = 'in_progress',
  Pending = 'pending',
  Finished = 'finished'
}

export const WorksiteStatusEnumMap = new Map<
  WorksiteStatusEnum,
  string
>([
  [WorksiteStatusEnum.ToDo, 'A faire'],
  [WorksiteStatusEnum.InProgress, 'En cours'],
  [WorksiteStatusEnum.Pending, 'En attente'],
  [WorksiteStatusEnum.Finished, 'Terminé']
]);


