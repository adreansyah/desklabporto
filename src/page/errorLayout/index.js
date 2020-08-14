import React from 'react';
import Error from 'component/Error'

const index = (props) => {
	return (
		<Error status={'404'} props={props.history} />
	)
}

export default index