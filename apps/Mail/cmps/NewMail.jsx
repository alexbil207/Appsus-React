export class NewMail extends React.Component {
    state = {
        from: null,
        to: null,
        body: null,
        subject: null,
        isSend: true,
        isRead: true,
    }
    handleChanges = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState(prevState => ({ ...prevState, [field]: value }))
    }
    onSubmit = (ev) => {
        ev.preventDefault();
        const { addMail, newMail } = this.props;
        newMail();
        addMail(this.state);
    }




    render() {
        const { newMail } = this.props;
        return (
            <form className="new-mail-container container flex column">
                <label htmlFor="to">To: <input name="to" id="to" type="text" onChange={this.handleChanges}></input></label>
                <label htmlFor="from">From: <input name="from" id="from" type="text" onChange={this.handleChanges}></input></label>
                <label htmlFor="subject">Subject: <input name="subject" id="subject" type="text" onChange={this.handleChanges}></input></label>
                <textarea name="body" placeholder="Body" onChange={this.handleChanges}></textarea>
                <div className="btns flex" >
                    <button onClick={() => newMail()}>Close</button>
                    <button onClick={this.onSubmit}>Submit</button>
                </div>
            </form>

        )
    }
}