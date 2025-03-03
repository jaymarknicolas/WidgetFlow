// @ts-expect-error "React" is a valid prop
const NotepadWidget = ({ content, onChange, placeholder }) => {
  return (
    <textarea
      className="w-full h-full p-2 rounded-md resize-none focus-visible:border-none outline-none bg-green-50"
      value={content}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default NotepadWidget;
