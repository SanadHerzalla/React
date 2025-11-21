export default function Input({ label, textArea, ...props }) {
  const classes =
    "w-full p-1 border-b-2 roudned-sm border-stone-300 bg-stone-200 textx-stone-600 foucs:outline foucs:border-stone-600";
  return (
    <p className="flex flex-col gap-1 my-4">
      <label className="text-sm fonr-bold uppercase text-stone-500">
        {label}
      </label>
      {textArea ? (
        <textArea className={classes} {...props} />
      ) : (
        <input className={classes} {...props} />
      )}
    </p>
  );
}
