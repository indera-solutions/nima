import { NimaTitle } from '../components';
import styles from './index.module.scss';


interface IndexProps {
}

export default function Index(props: IndexProps) {
	return (
		<>
			<NimaTitle title={ 'Overview' }/>
			<div className={ styles.page }>
				Dashboard
			</div>
		</>
	);
}
