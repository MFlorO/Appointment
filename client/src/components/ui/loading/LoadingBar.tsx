
interface Props {
  height?: string;
}

const LoadingBar: React.FC = ({ height = "h-4" }:Props) => {
  return (
    <div className={`relative w-full ${height}`}>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-300 to-transparent opacity-75 animate-loading-bar"/>
    </div>
  );
};

export default LoadingBar;