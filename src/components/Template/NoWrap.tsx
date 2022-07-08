
interface Props {
  children: JSX.Element;
}

const NoWrap = ({ children }: Props) => {
  return <div className='no-wrap'>{children}</div>;
};

export default NoWrap;
