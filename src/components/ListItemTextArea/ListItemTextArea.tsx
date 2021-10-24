import { useState, useEffect } from 'react';
import styles from './listItemTextArea.module.scss';
import dragIcon from '../../assets/icons/Drag_handle.svg';
import editIcon from '../../assets/icons/Edit_icon.svg';
import { ListItemElement } from '../AnamnesisList/AnamnesisList';
import ListItemButtons from '../ListItemButtons/ListItemButtons';

interface ListItemTextAreaProps {
	listItemData: ListItemElement;
	openModal: (item: ListItemElement) => void;
}

const ListItemTextArea = ({
	listItemData,
	openModal,
}: ListItemTextAreaProps): JSX.Element => {
	const [active, setActive] = useState(listItemData.defaultValue);

	useEffect(() => {
		setActive(listItemData.defaultValue);
	}, [listItemData]);

	return (
		<div className={styles.container}>
			<div className={styles.imgContainer}>
				<img src={dragIcon} alt='drag handle' className={styles.dragHandle} />
			</div>
			<div className={styles.textContainer}>
				<div className={styles.questionContainer}>
					<p className={styles.question}>{listItemData.question}</p>
					<ListItemButtons active={active} setActive={setActive} />
				</div>
				<div className={styles.textAreaContainer}>
					<textarea
						className={active !== 1 ? styles.textArea : styles.activeTextArea}
						placeholder={listItemData.text}
						disabled={active === 1 ? false : true}
					></textarea>
				</div>
			</div>
			<div className={styles.imgContainer}>
				<img
					src={editIcon}
					className={styles.editIcon}
					alt='edit icon'
					onClick={() => openModal(listItemData)}
				/>
			</div>
		</div>
	);
};

export default ListItemTextArea;
