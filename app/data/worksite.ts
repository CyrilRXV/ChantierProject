import type { WorksiteInterface } from '~/components/Worksites/Types/worksite.interface';
import { WorksiteStatusEnum } from '~/components/Worksites/Types/worksiteStatusEnum';

export const worksitesData: WorksiteInterface[] = [
  {
    id: 1,
    worksiteName: 'Chantier A',
    client: 'bob A',
    place: 'lieu A',
    startDate: new Date(2025, 10, 1),
    endDate: undefined,
    status: WorksiteStatusEnum.InProgress
  },
  {
    id: 2,
    worksiteName: 'Chantier B',
    client: 'bob B',
    place: 'lieu B',
    startDate: new Date(2025, 10, 1),
    endDate: undefined,
    status: WorksiteStatusEnum.InProgress
  },
  {
    id: 3,
    worksiteName: 'Chantier C',
    client: 'bob C',
    place: 'lieu C',
    startDate: new Date(2025, 10, 1),
    endDate: new Date(2026, 10, 1),
    status: WorksiteStatusEnum.Finished
  },
  {
    id: 4,
    worksiteName: 'Chantier D',
    place: 'lieu D',
    client: 'bob D',
    startDate: undefined,
    endDate: undefined,
    status: WorksiteStatusEnum.ToDo
  },
  {
    id: 5,
    worksiteName: 'Chantier E',
    client: 'bob E',
    place: 'lieu E',
    startDate: new Date(2024, 10, 1),
    endDate: undefined,
    status: WorksiteStatusEnum.Pending
  }
];
