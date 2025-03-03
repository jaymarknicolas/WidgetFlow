// @ts-expect-error "React" is a valid prop
const YoutubeEmbedWidget = ({ content, placeholder }) => {
  return (
    <iframe
      src={content}
      className="w-full h-full p-2 rounded-md resize-none focus-visible:border-none outline-none bg-red-50"
      title={`Embed `}
      aria-placeholder={placeholder}
    />
  );
};

export default YoutubeEmbedWidget;
