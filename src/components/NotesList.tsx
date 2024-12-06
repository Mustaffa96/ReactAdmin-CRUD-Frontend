import { FC } from 'react';
import { 
  List, 
  Datagrid, 
  TextField, 
  EditButton, 
  DeleteButton,
  DateField 
} from 'react-admin';

export const NotesList: FC = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="text" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);