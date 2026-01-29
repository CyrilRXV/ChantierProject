import type { ClientInterface } from '~/components/Clients/Types/client.interface';
import logo1 from 'assets/logos/logo1.png';
import logo2 from 'assets/logos/logo2.jpeg';
import logo3 from 'assets/logos/logo3.png';
import logo4 from 'assets/logos/logo4.png';

export const clientsData: ClientInterface[] = [
  {
    id: 1,
    societyName: 'Société A',
    email: 'societea@societea.fr',
    contact: 'jean',
    address: '1 rue du data',
    postalCode: '69001',
    phone: '0601020304',
    logo: logo1
  },
  {
    id: 2,
    societyName: 'Société B',
    email: 'societeb@societeb.fr',
    contact: 'paul',
    address: '2 rue du data',
    postalCode: '69002',
    phone: '0601020304',
    logo: logo2
  },
  {
    id: 3,
    societyName: 'Société C',
    email: 'societec@societec.fr',
    contact: 'pierre',
    address: '3 rue du data',
    postalCode: '69003',
    phone: '0601020304',
    logo: logo3
  },
  {
    id: 4,
    societyName: 'Société D',
    email: 'societed@societed.fr',
    contact: 'jacque',
    address: '4 rue du data',
    postalCode: '69004',
    phone: '0601020304',
    logo: logo4
  },
  {
    id: 5,
    societyName: 'Société E',
    email: 'societee@societed.fr',
    contact: 'jacque',
    address: '5 rue du data',
    postalCode: '69004',
    phone: '0601020304',
    logo: logo1
  },
  {
    id: 6,
    societyName: 'Société F',
    email: 'societeg@societed.fr',
    contact: 'jacque',
    address: '6 rue du data',
    postalCode: '69004',
    phone: '0601020304',
    logo: logo3
  },
  {
    id: 7,
    societyName: 'Société D',
    email: 'societeh@societed.fr',
    contact: 'jacque',
    address: '7 rue du data',
    postalCode: '69004',
    phone: '0601020304',
    logo: logo4
  }
];
