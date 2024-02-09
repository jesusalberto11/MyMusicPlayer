import "../../styles/shared/SimpleButton.css";

const SimpleButton = (props: {
  showTitle: boolean;
  title: string;
  icon: string;
  onClickItem?: any;
}) => {
  return (
    <button
      className="simple-button"
      type="button"
      title={props.title}
      onClick={() => props.onClickItem()}
    >
      <svg
        width="22"
        height="22"
        className="simple-button-icon"
        viewBox="0 0 16 16"
      >
        <path d={props.icon}></path>
      </svg>
      {props.showTitle ? props.title : ""}
    </button>
  );
};

export default SimpleButton;
