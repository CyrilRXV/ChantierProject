import type { WorksiteStatusEnum } from '~/components/Worksites/Types/worksiteStatusEnum';

export interface WorksiteDto {
  id: number | null;
  worksiteName: string | null;
  client: string | null;
  place: string | null;
  startDate: number | null;
  endDate: number | null;
  status: WorksiteStatusEnum | null;
}

const initForm = (): WorksiteDto => ({
  id: null,
  worksiteName: null,
  client: '',
  place: '',
  startDate: null,
  endDate: null,
  status: null
});

export const useWorksiteForm = (data?: WorksiteDto) => {
  const form = reactive<WorksiteDto>(data ? data : initForm());

  return {
    form
  };
};
