export default function Textarea({
	value,
	onChange,
	placeholder,
}: {
	value: string
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
	placeholder?: string
}) {
	return (
		<textarea
			className="w-full p-1 min-h-32 sm:leading-5 border-gray-300 border rounded-md"
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			required
		/>
	)
}
