import React, { useRef, useState, useEffect } from 'react';
import styles from './anamnesisEditModal.module.scss';
import closeButton from '../../assets/buttons/Close_button.svg';
import { ListItemElement } from '../AnamnesisList/AnamnesisList';

export interface ModalProps {
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	removeItem: (listItem: ListItemElement) => void;
	saveItem: (listItem: ListItemElement) => void;
	createItem: (listItem: Omit<ListItemElement, 'id'>) => void;
	selectedItem?: ListItemElement;
}

const Modal = ({
	saveItem,
	setShowModal,
	selectedItem,
	removeItem,
	createItem,
}: ModalProps): JSX.Element => {
	const modalOutsideRef = useRef<HTMLInputElement>(null);
	const [item, setItem] = useState<Omit<ListItemElement, 'id'>>({
		defaultValue: 0,
		question: '',
		type: '',
	});

	useEffect(() => {
		if (selectedItem !== undefined) {
			setItem(selectedItem);
		}
	}, [selectedItem]);

	const closeModal = (e: React.SyntheticEvent<HTMLDivElement, MouseEvent>) => {
		if (modalOutsideRef.current === e.target) {
			setShowModal(false);
		}
	};

	const onChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;

		setItem((prev) => {
			return { ...prev, [name]: name === 'defaultValue' ? +value : value };
		});
	};

	return (
		<div
			ref={modalOutsideRef}
			onClick={closeModal}
			className={styles.container}
		>
			<div className={styles.modalWrapper}>
				<div className={styles.navbar}>
					<img
						className={styles.closeButton}
						src={closeButton}
						alt='close button'
						onClick={() => setShowModal(false)}
					/>
				</div>
				<div className={styles.form}>
					<div className={styles.formElement}>
						<div className={styles.titleContainer}>
							<p className={styles.title}>Űrlap mező típusa</p>
						</div>
						<select
							name='type'
							className={styles.typeSelect}
							value={item?.type}
							onChange={onChangeHandler}
						>
							<option value='' disabled>
								Válassz egy opciót
							</option>
							<option value='BOOLEAN'>Igen/Nem</option>
							<option value='TEXTAREA'>Részletes</option>
						</select>
					</div>
					<div className={styles.formElement}>
						<div className={styles.titleContainer}>
							<p className={styles.title}>Alapértelmezett állapot</p>
						</div>
						<div className={styles.radioButtons}>
							<input
								type='radio'
								id='none'
								name='defaultValue'
								value={0}
								onChange={onChangeHandler}
								checked={item?.defaultValue === 0}
							/>
							<label htmlFor='none'>Nincs</label>
							<input
								type='radio'
								id='yes'
								name='defaultValue'
								value={1}
								onChange={onChangeHandler}
								checked={item?.defaultValue === 1}
							/>
							<label htmlFor='yes'>Igen</label>
							<input
								type='radio'
								id='nope'
								name='defaultValue'
								value={2}
								checked={item?.defaultValue === 2}
								onChange={onChangeHandler}
							/>
							<label htmlFor='nope'>Nem</label>
						</div>
					</div>
					<div className={styles.formElement}>
						<div className={styles.switchElement}>
							<div className={styles.titleContainer}>
								<p className={styles.title}>
									Kitöltött állapotban jelentítse meg a bal oldali figyelmeztető
									sávban a páciens kartonban
								</p>
							</div>
							<label className={styles.switch}>
								<input type='checkbox' />
								<span className={styles.slider}></span>
							</label>
						</div>
					</div>
					<div className={styles.formElement}>
						<div className={styles.switchElement}>
							<div className={styles.titleContainer}>
								<p className={styles.title}>Megjelenítés a Páciens Portálon</p>
							</div>
							<label className={styles.switch}>
								<input type='checkbox' />
								<span className={styles.slider}></span>
							</label>
						</div>
					</div>
				</div>
				<div className={styles.form}>
					<div className={styles.formElement}>
						<div className={styles.titleContainer}>
							<p className={styles.title}>Mező elnevezése</p>
						</div>
						<div className={styles.inputContainer}>
							<input
								name='question'
								type='text'
								className={styles.textInput}
								value={item?.question}
								onChange={onChangeHandler}
							/>
						</div>
					</div>
				</div>
				<div className={styles.buttons}>
					{selectedItem ? (
						<button
							onClick={() => removeItem(selectedItem)}
							className={styles.destructive}
						>
							Mező törlése
						</button>
					) : null}
					<div className={styles.rightButtons}>
						<button
							className={styles.secondary}
							onClick={() => setShowModal(false)}
						>
							Mégsem
						</button>
						{selectedItem ? (
							<button
								onClick={() => saveItem({ ...selectedItem, ...item })}
								className={styles.primary}
							>
								Mentés
							</button>
						) : (
							<button
								onClick={() => createItem(item)}
								className={styles.primary}
								disabled={item.type === '' ? true : false}
								style={item.type === '' ? { opacity: 0.3 } : { opacity: 1 }}
							>
								Létrehozás
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;
