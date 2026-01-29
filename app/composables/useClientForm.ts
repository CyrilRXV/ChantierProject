export interface ClientDto {
  id: number | null;
  societyName: string;
  email: string;
  contact: string | undefined;
  address: string | undefined;
  postalCode: string | undefined;
  phone: string | undefined;
  logo: string | undefined;
}

const initForm = (): ClientDto => ({
  id: null,
  societyName: '',
  email: '',
  contact: undefined,
  address: undefined,
  postalCode: undefined,
  phone: undefined,
  logo: undefined
});

export const useClientForm = (data?: ClientDto) => {
  const form = reactive<ClientDto>(data ? data : initForm());

  return {
    form
  };
};
