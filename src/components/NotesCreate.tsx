import { FC } from 'react';
import { 
  Create, 
  SimpleForm, 
  TextInput,
  required 
} from 'react-admin';

export const NotesCreate: FC = () => (
  <Create>
    <SimpleForm>
      <TextInput 
        source="text" 
        validate={[required()]} 
        fullWidth 
        multiline 
        rows={4}
      />
    </SimpleForm>
  </Create>
);