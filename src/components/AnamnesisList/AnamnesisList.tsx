import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './anamnesisList.module.scss';
import ListItemBoolean from '../ListItemBoolean/ListItemBoolean';
import ListItemTextArea from '../ListItemTextArea/ListItemTextArea';
import Modal from '../AnamnesisEditModal/AnamnesisEditModal';

export interface ListItemElement {
	id: string;
	type: string;
	question: string;
	defaultValue: number;
	text?: string;
}

const dummyData: ListItemElement[] = [
	{
		id: uuidv4(),
		type: 'BOOLEAN',
		question: 'Hajlamos-e ájulásra?',
		defaultValue: 1,
	},
	{
		id: uuidv4(),
		type: 'TEXTAREA',
		question: 'Gyógyszeres kezelés alatt áll?',
		text: 'Milyen gyógyszereket szed?',
		defaultValue: 2,
	},
];

const AnamnesisList = () => {
	const [items, setItems] = useState<ListItemElement[]>(dummyData);
	const [showModal, setShowModal] = useState(false);
	const [selectedItem, setSelectedItem] = useState<ListItemElement | undefined>(
		undefined
	);

	const openModal = (listItem: ListItemElement | undefined) => {
		setSelectedItem(listItem);
		setShowModal((prev) => !prev);
	};

	const removeItem = (listItem: ListItemElement) => {
		setItems((prevItems) =>
			prevItems.filter((item) => item.id !== listItem.id)
		);
		setShowModal(false);
	};

	const saveItem = (listItem: ListItemElement) => {
		setItems((prevItems) => {
			const index = prevItems.findIndex((item) => item.id === listItem.id);
			prevItems[index] = listItem;
			return prevItems;
		});
		setShowModal(false);
	};

	const createItem = (listItem: Omit<ListItemElement, 'id'>) => {
		setItems((prevItems) => [...prevItems, { ...listItem, id: uuidv4() }]);
		setShowModal(false);
	};

	return (
		<div className={styles.container}>
			{items.length > 0
				? items.map((item) => {
						if (item.type === 'BOOLEAN') {
							return (
								<ListItemBoolean
									listItemData={item}
									key={item.id}
									openModal={openModal}
								/>
							);
						} else if (item.type === 'TEXTAREA') {
							return (
								<ListItemTextArea
									listItemData={item}
									key={item.id}
									openModal={openModal}
								/>
							);
						} else {
							return null;
						}
				  })
				: null}
			<div className={styles.buttonContainer}>
				<button
					className={styles.addButton}
					onClick={() => openModal(undefined)}
				>
					+ Új mező hozzáadása
				</button>
			</div>
			{showModal ? (
				<Modal
					saveItem={saveItem}
					createItem={createItem}
					removeItem={removeItem}
					setShowModal={setShowModal}
					selectedItem={selectedItem}
				/>
			) : null}
		</div>
	);
};

export default AnamnesisList;
