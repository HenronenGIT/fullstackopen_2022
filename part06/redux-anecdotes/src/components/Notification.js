import { useSelector } from 'react-redux'

const Notification = () => {
	const notification = useSelector(selector => selector.notification)

	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1,
	}

	if (notification !== null) {
		return (
			<div style={style}>
				{notification}
			</div>
		)
	}
	return <div style={{ display: 'none' }}></div>

}

export default Notification
