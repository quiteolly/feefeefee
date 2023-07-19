type AddItemButtonProps = {
	/**
	 * Callback for the Add item button.
	 */
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function AddItemButton({
	onClick
}: AddItemButtonProps) {
	return (
		<button type="button" onClick={onClick}>Add item</button>
	);
}