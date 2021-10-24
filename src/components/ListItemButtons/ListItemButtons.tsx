import styles from './listItemButtons.module.scss';

const ListItemButtons = ({
	active,
	setActive,
}: {
	active: number;
	setActive: (arg0: number) => void;
}): JSX.Element => {
	return (
		<div className={styles.buttons}>
			<button
				className={active === 1 ? styles.active : styles.button}
				onClick={() => setActive(1)}
			>
				Igen
			</button>
			<button
				className={active === 2 ? styles.active : styles.button}
				onClick={() => setActive(2)}
			>
				Nem
			</button>
		</div>
	);
};

export default ListItemButtons;
