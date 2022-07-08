import { TablePaginationConfig } from 'antd';
import ProjectTable from 'components/Project/ProjectTable';
import SearchBar from 'components/Project/SearchBar';
import useApi from 'hooks/useApi';
import { useEffect, useState } from 'react';
import ApiResponse from 'types/ApiResponse';
import DataPagination, { DataPaginationEmpty } from 'types/DataPagination';
import Template from './Template';
const title = 'Dự án';

const Project = () => {
  const [data, setData] = useState<DataPagination>(new DataPaginationEmpty());
  const [filters, setFilters] = useState({
    name: null,
    status: null,
  });

  const [sort, setSort] = useState({});
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 0,
    pageSize: 10,
    total: 0,
  });

  const getProjectList = () => {
    setLoading(true);
    useApi.get('/api/v1/bo/project', {
      authen: true,
      params: {
        ...filters,
        ...sort,
        size: pagination.pageSize,
        page: pagination.current,
      },
      onSuccess: (data: ApiResponse) => {
        setData(data);
        // setPagination({
        //   current: data.meta.page,
        //   total: data.meta.totalPage,
        // });
      },
      onFinally: () => setLoading(false),
    });
  };

  useEffect(() => {
    getProjectList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sort, pagination]);

  return (
    <Template title={title}>
      <section className='section project-container'>
        <SearchBar filtersHandle={{ filters, setFilters }} />
        <ProjectTable
          data={data}
          paginationHandle={{ pagination, setPagination }}
          sortHandle={{ sort, setSort }}
          loadingHandle={{ loading, setLoading }}
        />
      </section>
    </Template>
  );
};

export default Project;
