import React, { useContext, useState } from 'react'
import { SettingsContext } from '../context/SettingsContext'

const SetPomodoro = () => {

    const [newTimer, setNewTimer] = useState({
        work: 3,
        short: 1,
        long: 2,
        active: 'work'
    })

    const {updateExecute} = useContext(SettingsContext)

    const handleChange = input => {
        const {name, value} = input.target
        switch (name) {
            case 'work':
                setNewTimer({
                    ...newTimer,
                    work: parseInt(value)
                })
                break;
            case 'shortBreak':
                setNewTimer({
                    ...newTimer,
                    short: parseInt(value)
                })
                break;
            case 'longBreak':
                setNewTimer({
                    ...newTimer,
                    long: parseInt(value)
                })
                break;
        }
    }
    const handleSubmit = e => {
        e.preventDefault()
        updateExecute(newTimer)
    }
    return (
        <div className="form-container">
            <form noValidate onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <div className="input-title">work
                    <input className="input" type="number" name="work" onChange={handleChange} value={newTimer.work} />
                    </div>
                    <div className="input-title">short
                    <input className="input" type="number" name="shortBreak" onChange={handleChange} value={newTimer.short} />
                    </div>
                    <div className="input-title">long
                    <input className="input" type="number" name="longBreak" onChange={handleChange} value={newTimer.long} />
                    </div>
                </div>
                <button type='submit'>set timer</button>
            </form>
        </div>
    )
}

export default SetPomodoro
