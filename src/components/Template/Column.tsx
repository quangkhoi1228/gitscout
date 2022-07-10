import { Col } from 'antd';

interface Props {
  span?: number | 'auto' | string;
  children?: JSX.Element | JSX.Element[];
}

interface ColumnSettingProps {
  span?: number;
  xl?: number;
  md?: number;
  sm?: number;
  flex?: number | 'auto' | string;
}

const   Column = ({ span = 'auto', children }: Props) => {
  const setting = getSetting(span);

  return <Col {...setting}>{children}</Col>;
};

const getSetting = (span: number | 'auto' | string) => {
  let setting: ColumnSettingProps;

  if (typeof span === 'string') {
    setting = { flex: span };
  } else {
    switch (span) {
      case 6:
        setting = {
          span: 12,
          xl: 6,
          md: 12,
          sm: 12,
        };
        break;
      case 8:
        setting = {
          span: 24,
          xl: 8,
          md: 12,
          sm: 24,
        };
        break;
      case 10:
        setting = {
          span: 24,
          xl: 10,
          md: 24,
          sm: 24,
        };
        break;
      case 14:
        setting = {
          span: 24,
          xl: 14,
          md: 24,
          sm: 24,
        };
        break;
      case 16:
        setting = {
          span: 24,
          xl: 16,
          md: 12,
          sm: 24,
        };
        break;
      case 18:
        setting = {
          span: 24,
          xl: 18,
          md: 12,
          sm: 24,
        };
        break;
      case 12:
        setting = {
          span: 24,
          xl: 12,
          md: 24,
          sm: 24,
        };
        break;
      case 24:
        setting = {
          span: 24,
          xl: 24,
          md: 24,
          sm: 24,
        };
        break;
      default:
        setting = {
          span: span,
          xl: 24,
          md: 24,
          sm: 24,
        };
        break;
    }
  }

  return setting;
};

export default Column;
