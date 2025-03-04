/**
 * A widget for taking notes.
 *
 * @param {{ content: string, onChange: (value: string) => void, placeholder?: string }} props
 * @returns {JSX.Element}
 */
// @ts-expect-error "React" is a valid prop

const NotepadWidget = ({ content, onChange, placeholder }) => {
  return (
    <textarea
      /**
       * The CSS class for the textarea.
       *
       * This is using the `rounded-md` class from Tailwind CSS to make the textarea
       * have a rounded corner.
       */
      className="w-full h-full p-2 rounded-md resize-none focus-visible:border-none outline-none bg-green-50"
      /**
       * The value of the textarea.
       *
       * This is the actual text that the user types into the textarea.
       */
      value={content}
      /**
       * The function to call when the user types into the textarea.
       *
       * This is a callback function that is passed in as a prop, and it will be called
       * every time the user types something into the textarea.
       */
      onChange={(e) => onChange(e.target.value)}
      /**
       * The placeholder text for the textarea.
       *
       * This is the text that is displayed in the textarea when the user has not typed
       * anything into it yet.
       */
      placeholder={placeholder}
    />
  );
};

export default NotepadWidget;
