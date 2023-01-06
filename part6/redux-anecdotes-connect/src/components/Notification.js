import { connect } from 'react-redux'

const Notification = (props) => {
	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1,
	}

	if (props.notification !== null) {
		return (
			<div style={style}>
				{props.notification}
			</div>
		)
	}
	return <div style={{ display: 'none' }}></div>
}

const mapStateToProps = (state) => {
	return {
		notification: state.notification
	}
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
