import { faEnvelope, faMobile, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

const ContactForm = (props) => {
    let initialValue = {
        fullName: '',
        email: '',
        mobile: '',
        address: ''
    }
    const [values, setValues] = useState(initialValue)

    useEffect(() => {
        if (props.currentId === '') {
            setValues(initialValue)
        } else {
            let selectedContact = props.contacts[props.currentId]
            setValues(selectedContact)
        }
        // eslint-disable-next-line
    }, [props.currentId, props.contacts])

    const handleInputChange = e => {
        let { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    const submit = e => {
        e.preventDefault();
        props.addOrEdit(values)
    }
    return (
        <form autoComplete="off" onSubmit={submit}>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <input
                        className="form-control"
                        placeholder="Full Name"
                        name="fullName"
                        value={values.fullName}
                        onChange={handleInputChange} />
                </div>
            </div>
            <div className="row">
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <FontAwesomeIcon icon={faMobile} />
                        </div>
                        <input
                            className="form-control"
                            placeholder="Mobile"
                            name="mobile"
                            value={values.mobile}
                            onChange={handleInputChange} />
                    </div>
                </div>
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                        <input
                            className="form-control"
                            placeholder="email"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange} />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <textarea
                    className="form-control"
                    placeholder="address"
                    name="address"
                    value={values.address}
                    onChange={handleInputChange} />
            </div>
            <div className="form-control">
                <input type="submit" value={props.currentId ? "edit" : "save"} className="btn btn-primary btn-block" />
            </div>
        </form>
    );
}

export default ContactForm;