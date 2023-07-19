type AddItemButtonProps = {
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function AddItemButton({
	onClick
}: AddItemButtonProps) {
	return (
		<button type="button" onClick={onClick}>Add item</button>
	);
}