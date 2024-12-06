import { RaRecord } from 'react-admin';

export interface Note extends RaRecord {
  text: string;
  createdAt?: string;
  updatedAt?: string;
}
