import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Pagination, Form, Button, Modal } from 'react-bootstrap';

import { getTaskList, createTask, updateTask } from '../redux/actions/task';
import '../styles/task-list.css';

class TaskList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			params: {
				sort_field: 'id',
				sort_direction: 'asc',
				page: 1
			},
			countPage: null,
			isShow: false,
			isEdit: false,
			formData: {
				username: '',
				email: '',
				text: ''
			},
			currentTask: null
		}
	}
	componentDidMount() {
		this.props.getTaskList(this.state.params);
		this.setState({
			countPage: Math.ceil(this.props.count / 3)
		})
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.count !== this.props.count) {
			this.setState({
				countPage: Math.ceil(nextProps.count / 3)
			})
		}
		if (nextProps.toggleStatus !== this.props.toggleStatus) {
			this.props.getTaskList(this.state.params);
		}
	}

	toPrevPage = () => {
		if (this.state.params.page > 1) {
			this.setState({
				params: {
					...this.state.params,
					page: this.state.params.page - 1
				}
			}, () => {
				this.props.getTaskList(this.state.params)
			})
		}
	}

	toNextPage = () => {
		if (this.state.params.page < this.state.countPage) {
			this.setState({
				params: {
					...this.state.params,
					page: this.state.params.page + 1
				}
			}, () => {
				this.props.getTaskList(this.state.params)
			})
		}
	}

	toFirstPage = () => {
		if (this.state.params.page > 1) {
			this.setState({
				params: {
					...this.state.params,
					page: 1
				}
			}, () => {
				this.props.getTaskList(this.state.params)
			})
		}
	}

	toLastPage = () => {
		if (this.state.params.page < this.state.countPage) {
			this.setState({
				params: {
					...this.state.params,
					page: this.state.countPage
				}
			}, () => {
				this.props.getTaskList(this.state.params)
			})
		}
	}

	sortData = e => {
		this.setState({
			params: {
				...this.state.params,
				page: 1,
				sort_field: e.target.id,
				sort_direction: this.state.params.sort_direction === 'asc' ? 'desc' : 'asc'
			}
		}, () => {
			this.props.getTaskList(this.state.params)
		})
	}

	openModal = (isEdit, task) => {
		this.setState({
			isEdit,
			isShow: true,
		});
		if (isEdit) {
			this.setState({
				formData: {
					username: task.username,
					email: task.email,
					text: task.text
				},
				currentTask: task
			})
		}
	}

	closeModal = () => {
		this.setState({
			isShow: false,
			isEdit: false,
			formData: {
				username: '',
				email: '',
				text: ''
			},
			currentTask: null
		});
	}

	editValue = e => {
		this.setState({
			formData: {
				...this.state.formData,
				[e.target.id]: e.target.value
			}
		})
	}

	handleForm = e => {
		e.preventDefault();
		const formData = new FormData();
		if (!this.state.isEdit) {
			formData.append("username", this.state.formData.username);
			formData.append("email", this.state.formData.email);
			formData.append("text", this.state.formData.text);
			this.props.createTask(formData);
		} else {
			formData.append("text", this.state.formData.text);
			formData.append("token", this.props.token);
			this.props.updateTask(this.state.currentTask.id, formData);
		}
		this.closeModal()
	}

	changeStatus = task => {
		const formData = new FormData();
		const status = task.status ? 0 : 10;
		formData.append("status", status);
		formData.append("token", this.props.token);
		this.props.updateTask(task.id, formData);
	}

	render() {
		const { params, isShow, isEdit, formData } = this.state;
		const { tasks, token } = this.props;

		return (
			<div className="task-list">
				<Button variant="info" onClick={() => this.openModal(false)}>Create task</Button>
				<Table striped bordered>
					<thead>
						<tr>
							<th id="username" className="text-center sort" onClick={this.sortData}>Username</th>
							<th id="email" className="text-center sort" onClick={this.sortData}>Email</th>
							<th id="text" className="text-center">Text</th>
							<th id="status" className="text-center sort" onClick={this.sortData}>Status</th>
							{
								token && (
									<th className="text-center">Actions</th>
								)
							}
						</tr>
					</thead>
					<tbody>
						{
							tasks.map(task => (
								<tr key={task.id}>
									<td>{task.username}</td>
									<td>{task.email}</td>
									<td>{task.text}</td>
									<td className="text-center">
										<Form.Check
											id="custom-checkbox"
											type="checkbox"
											disabled={!token}
											checked={task.status}
											onChange={() => this.changeStatus(task)}
										/>
									</td>
									{
										token && (
											<th className="text-center action-col">
												<span onClick={() => this.openModal(true, task)}>Edit</span>
											</th>
										)
									}
								</tr>
							))
						}
					</tbody>
				</Table>
				<div className="pagination">
					<Pagination>
						<Pagination.First onClick={this.toFirstPage} />
						<Pagination.Prev onClick={this.toPrevPage} />
						<Pagination.Item>{params.page}</Pagination.Item>
						<Pagination.Next onClick={this.toNextPage} />
						<Pagination.Last onClick={this.toLastPage} />
					</Pagination>
				</div>

				<Modal show={isShow} onHide={this.closeModal}>
					<Modal.Header closeButton></Modal.Header>
					<Modal.Body>
						<Form onSubmit={this.handleForm}>
							<Form.Group>
								<Form.Label>Username</Form.Label>
								<Form.Control id="username" type="text" placeholder="Enter username" value={formData.username} disabled={isEdit} required onChange={this.editValue} />
							</Form.Group>

							<Form.Group>
								<Form.Label>Email address</Form.Label>
								<Form.Control id="email" type="email" placeholder="Enter email" value={formData.email} disabled={isEdit} required onChange={this.editValue} />
							</Form.Group>

							<Form.Group>
								<Form.Label>Text</Form.Label>
								<Form.Control id="text" as="textarea" rows="3" value={formData.text} required onChange={this.editValue} />
							</Form.Group>

							<Button variant="primary" type="submit">
								{isEdit ? 'Update' : 'Create'}
							</Button>
						</Form>
					</Modal.Body>
				</Modal>
			</div>
		);
	}
}

export default connect(
	state => ({
		tasks: state.tasks.data,
		count: state.tasks.count,
		toggleStatus: state.tasks.toggleStatus,
		token: state.user.token
	}),
	dispatch => ({
		getTaskList: params => {
			dispatch(getTaskList(params));
		},
		createTask: data => {
			dispatch(createTask(data));
		},
		updateTask: (taskId, data) => {
			dispatch(updateTask(taskId, data));
		}
	})
)(TaskList);
