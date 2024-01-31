import ReactLoading from "react-loading";
import "./Loading.css";

const Loading = ({ type, color }) => (
  <div className="loading">
    <ReactLoading type={"spin"} color={"#000"} height={50} width={50} />
  </div>
);

export default Loading;
