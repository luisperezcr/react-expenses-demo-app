import { useState } from 'react';

import './ExpenseForm.css';

const ExpenseForm = (props) => {
    const [userInput, setUserInput] = useState({
        title: '',
        amount: '',
        date: ''
    });
    const [showForm, setShowForm] = useState(false);

    const titleChangeHandler = (evt) => {
        setUserInput((prevState) => {
            return { ...prevState, title: evt.target.value };
        });
    };

    const amountChangeHandler = (evt) => {
        setUserInput((prevState) => {
            return { ...prevState, amount: +evt.target.value };
        });
    };

    const dateChangeHandler = (evt) => {
        setUserInput((prevState) => {
            return { ...prevState, date: evt.target.value };
        });
    };

    const submitHandler = (evt) => {
        evt.preventDefault();
        const formDate = { ...userInput, date: new Date(userInput.date) };
        setUserInput({
            date: '',
            amount: '',
            title: ''
        });
        props.onSaveExpenseData(formDate);
        showFormHandler();
    };

    const showFormHandler = () => {
        setShowForm((prevShowForm) => !prevShowForm);
    }

    return (
        <div>
            { !showForm && <button type="button" onClick={showFormHandler}>Add New Expense</button> }
            { showForm &&
                <form onSubmit={submitHandler}>
                    <div className="new-expense__controls">
                        <div className="new-expense__control">
                            <label>Title</label>
                            <input type="text" value={userInput.title} onChange={titleChangeHandler} />
                        </div>
                        <div className="new-expense__control">
                            <label>Amount</label>
                            <input type="number" min="0.01" step="0.01" value={userInput.amount} onChange={amountChangeHandler} />
                        </div>
                        <div className="new-expense__control">
                            <label>Date</label>
                            <input type="date" min="2019-01-01" max="2023-12-31" value={userInput.date} onChange={dateChangeHandler} />
                        </div>
                    </div>
                    <div className="new-expense__actions">
                        <button type="button" onClick={showFormHandler}>Cancel</button>
                        <button type="submit">Add Expense</button>
                    </div>
                </form>
            }
        </div>
    );
};

export default ExpenseForm;