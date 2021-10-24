import { useEffect, useState } from 'react';
import styles from './listItemBoolean.module.scss';
import dragIcon from '../../assets/icons/Drag_handle.svg';
import editIcon from '../../assets/icons/Edit_icon.svg';
import { ListItemElement } from '../AnamnesisList/AnamnesisList';
import ListItemButtons from '../ListItemButtons/ListItemButtons';

interface ListItemBooleanProps {
	listItemData: ListItemElement;
	openModal: (item: ListItemElement) => void;
}

const ListItemBoolean = ({
	listItemData,
	openModal,
}: ListItemBooleanProps): JSX.Element => {
	const [active, setActive] = useState(listItemData.defaultValue);

	useEffect(() => {
		setActive(listItemData.defaultValue);
	}, [listItemData]);

	return (
		<div className={styles.container}>
			<div className={styles.imgContainer}>
				<img src={dragIcon} alt='drag handle' className={styles.dragHandle} />
			</div>
			<div className={styles.questionContainer}>
				<p className={styles.question}>{listItemData.question}</p>
				<ListItemButtons active={active} setActive={setActive} />
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

export default ListItemBoolean;
