import AddProjectForm from 'components/AddProject/AddProjectForm';
import Template from './Template';
const title = 'Thêm dự án';

const AddProject = () => {
  return (
    <Template title={title}>
      <section className='section add-project-container'>
        <h2>{title}</h2>

        <AddProjectForm />
      </section>
    </Template>
  );
};

export default AddProject;
