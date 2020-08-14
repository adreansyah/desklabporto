import React from 'react';
import {
	Button,
	ButtonGroup,
	ButtonLink,
	Col,
	FormControl,
	Icon,
	Row,
	Segment,
	Spinner,
	Textfield
} from '@elevenia/master-ui/components/Atom';
import { validateForm } from 'helper';
import { useInput, useSingleToggle, useAction, useAlertBlock } from 'hooks';
import { useSelector } from 'react-redux';
import { requestAuthentication } from 'store/actions/authentication';
import logo from 'assets/image/desklab.png';

const Layout = props => {
	document.title = props.title;
	const { hasFetch } = useAction();
	const [open, setOpen] = useSingleToggle(false);
	const { value, bindChange } = useInput({
		initialObjects: {
			username: "",
			password: ""
		},
		identity: "myForm",
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		const account = {
			username: value.username,
			password: value.password
		}
		const valid = validateForm(e.target.id);
		valid && hasFetch(requestAuthentication(account));
	}
	const { AlertBlockComponent } = useAlertBlock({ TimeOut: 3000 })
	const loading = useSelector(state => state.authentication.loading);

	return (
		<Segment style={{ height: '100vh' }} alignItems={'center'}>
			<Row>
				<Col
					wide={6}
					offset={3}
					bg={'white'}
					justifyContent={'center'}
					pt={80}
					pb={160}
					borderRadius={12}
				>
					<Segment width={300}>
						<Segment justifyContent={'center'} flexDirection={'column'} alignItems={'center'} mb={48}>
							<img src={logo} alt="Logo" width={196} />
						</Segment>
						{AlertBlockComponent}
						<form id="myForm" onSubmit={handleSubmit} autoComplete="false">
							<FormControl label={'Username'} mb={24}>
								<Textfield
									inputProps={{
										...bindChange,
										type: "text",
										name: 'username',
										className: 'validate[required]',
										placeholder: 'Username',
									}}
									state="normal"
									model="default"
								/>
							</FormControl>
							<FormControl label={'Password'} mb={32}>
								<Textfield
									inputProps={{
										...bindChange,
										type: open ? 'text' : 'password',
										name: 'password',
										className: 'validate[required]',
										placeholder: 'Password',
									}}
									right={
										<ButtonLink type="button" onClick={setOpen}>
											<Icon
												name={open ? 'visible' : 'invisible'}
												size={16}
												fillColor="#70727D"
											/>
										</ButtonLink>
									}
									state="normal"
								/>
							</FormControl>
							<ButtonGroup responsive>
								<Button disabled={loading} type="submit" variant="primary">
									{loading ? <Spinner color="#2a93d6" /> : "Sign in"}
								</Button>
							</ButtonGroup>
						</form>
						<Segment justifyContent={'center'} flexDirection={'column'} alignItems={'center'} mt={20}>
							<small>v{process.env.REACT_APP_VERSION} - {process.env.REACT_APP_ENVIRONMENT}</small>
						</Segment>
					</Segment>
				</Col>
			</Row>
		</Segment>
	)
}

export default Layout