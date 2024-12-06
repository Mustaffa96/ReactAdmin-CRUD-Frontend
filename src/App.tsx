import { FC } from 'react';
import { Admin, Resource } from 'react-admin';
import { dataProvider } from './dataProvider';
import { NotesList } from './components/NotesList';
import { NotesEdit } from './components/NotesEdit';
import { NotesCreate } from './components/NotesCreate';
import NoteIcon from '@mui/icons-material/Note';

const App: FC = () => (
  <Admin dataProvider={dataProvider}>
    <Resource 
      name="notes" 
      list={NotesList}
      edit={NotesEdit}
      create={NotesCreate}
      icon={NoteIcon}
    />
  </Admin>
);

export default App;
