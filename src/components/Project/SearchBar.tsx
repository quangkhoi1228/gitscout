import { Row, Col, Space, Input, Select, Button } from 'antd';
import { Link } from 'react-router-dom';
import Json from 'types/Json';

const { Option } = Select;

interface Props {
  filtersHandle: {
    filters: Json;
    setFilters: Function;
  };
}

const statusList: string[] = [''].concat(['OPEN', 'END', 'ACTIVE', 'DEACTIVE']);

const SearchBar = ({ filtersHandle }: Props) => {
  return (
    <Row justify='space-between' className='search-bar' gutter={[16, 16]}>
      <Col>
        <Space direction='horizontal'>
          <Input
            placeholder='Tìm tự án'
            value={filtersHandle.filters.name}
            onChange={(e) => {
              filtersHandle.setFilters({
                name: e.target.value.trim() === '' ? null : e.target.value,
              });
            }}
          />
          <Select
            value={filtersHandle.filters.status}
            placeholder='Trạng thái'
            style={{ width: 120, marginLeft: '1rem' }}
            onChange={(status) => {
              filtersHandle.setFilters({
                status: status === '' ? null : status,
              });
            }}
          >
            {statusList.map((status: string) => {
              return (
                <Option value={status} key={status}>
                  {!status ? 'ALL' : status}
                </Option>
              );
            })}
          </Select>
        </Space>
      </Col>
      <Col>
        <Link to={'/addproject'}>
          <Button type='primary' shape='round'>
            Thêm dự án
          </Button>
        </Link>
      </Col>
    </Row>
  );
};

export default SearchBar;
