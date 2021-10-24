import styles from './anamnesis.module.scss';
import helpLogo from '../../assets/icons/help_black_24dp.svg';
import AnamnesisList from '../AnamnesisList/AnamnesisList';

const Anamnesis = () => {
	return (
		<div className={styles.content}>
			<div className={styles.navbar} />
			<div className={styles.container}>
				<h3 className={styles.title}>Anamnézis mezők</h3>
				<div className={styles.notificationBox}>
					<img src={helpLogo} alt='help logo' className={styles.helpLogo} />
					<p className={styles.helpDescription}>
						Itt tudod szerkeszteni a páciens egészségügyi anamnézis mezőket.
						Lorem ipsum dolor sit amet.
						<br />
						<a href='/' className={styles.link}>
							Nézd meg videónkat és leírást itt
						</a>
					</p>
				</div>
				<p className={styles.altTitle}>Anamnézis űrlap</p>
				<p className={styles.description}>
					Ez az űrlap lesz a páciens számára is elérhető majd a Páciens Portál
					modul-ban. Hamarosan érkezik! Így a páciens már akár otthonról, vagy a
					rendelőben egy tabletről is kitöltheti az adatait, ezáltal lényegesen
					csökkentve az adminisztrációs terheket és a hiba lehetőséget a
					rendelőben.
				</p>
				<AnamnesisList />
			</div>
		</div>
	);
};

export default Anamnesis;
