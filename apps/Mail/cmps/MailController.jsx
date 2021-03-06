
export class MailController extends React.Component {
    state = {
        text: null,
        category: 'inbox',
    }

    handleChanges = (ev) => {
        const { onFilterChange } = this.props;
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState({ [field]: value }, () => onFilterChange(this.state))
    }


    render() {
        const { newMail } = this.props;
        return (
            <div className="controller-container container flex space-between align-center">
                <select name="category" onChange={this.handleChanges}>
                    <option value="inbox">Inbox</option>
                    <option value="isSend">Sent</option>
                    <option value="isFavorite">Favorite</option>
                    <option value="isRead">Unread</option>
                </select>
                <label title="Compose new mail"><button className="compose-btn" onClick={() => newMail()}></button></label>
                <div className="mail-filter">
                    <label htmlFor="text-input">🔍</label>
                    <input name="text" type="text" id="text-input" placeholder="Search" onChange={this.handleChanges} />
                </div>

            </div>
        )
    }
}