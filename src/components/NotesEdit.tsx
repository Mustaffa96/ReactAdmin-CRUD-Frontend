import { FC } from 'react';
import { 
  Edit, 
  SimpleForm, 
  TextInput,
  required 
} from 'react-admin';

export const NotesEdit: FC = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput 
        source="text" 
        validate={[required()]} 
        fullWidth 
        multiline 
        rows={4}
      />
    </SimpleForm>
  </Edit>
);