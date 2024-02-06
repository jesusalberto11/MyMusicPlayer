const SVGIcon = (props: { icon: string }) => {
  return (
    <svg width="16" height="16" className="SVG-ICON" viewBox="0 0 16 16">
      <path d={props.icon}></path>
    </svg>
  );
};

export default SVGIcon;
