import ContactForm from "./ContactForm";
import firebaseDb  from '../firebase'
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Contacts = () => {
    const [contacts, setContacts] = useState({})
    const [currentId, setCurrentId] = useState('')

    const addOrEdit = obj => {
        if (!obj.fullName || !obj.email || !obj.mobile) {
            alert('Name, Email and phone number is required')
        } else {
            currentId === ''? 
            firebaseDb.child('contacts').push(obj, err => {
                err ? console.log(err) : setCurrentId('')
            }) :
            firebaseDb.child(`contacts/${currentId}`).set(obj, err => {
                err ? console.log(err) : setCurrentId('')
            })
        }
    }
    const deleteContact = id => {
        if (window.confirm('are you sure you want to delete this record?')) {
            firebaseDb.child(`contacts/${id}`).remove(err => {
                err && console.log(err)
            })
        }
    }
    useEffect(() => {
        firebaseDb.child('contacts').on('value', snapshot => {
            if(snapshot.val() !== null) {
                setContacts({
                    ...snapshot.val()
                })
            }
        })
    }, [])


    return ( 
        <>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4 text-center">Contact Register</h1>
                </div>
                <div className="row">
                    <div className="col-md-5">
                        <ContactForm 
                            addOrEdit={addOrEdit} 
                            currentId={currentId} 
                            contacts={contacts} />
                    </div>
                    <div className="col-md-7">
                        <div>List of contacts</div>
                        <table className="table table-borderless table-stripped">
                            <thead className="thead-light"> 
                                <tr>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.keys(contacts).reverse().map(id => {
                                        return (
                                            <tr key={id}>
                                                <td>{contacts[id].fullName}</td>
                                                <td>{contacts[id].email}</td>
                                                <td>{contacts[id].mobile}</td>
                                                <td>
                                                    {/* eslint-disable-next-line */}
                                                    <a href="#" className="btn text-primary" onClick={() => {setCurrentId(id)}}>
                                                        <FontAwesomeIcon icon={faPencilAlt} />
                                                    </a>
                                                    {/* eslint-disable-next-line */}
                                                    <a href="#" className="btn text-danger" onClick={() => deleteContact(id)}>
                                                        <FontAwesomeIcon icon={faTrashAlt} />
                                                    </a>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Contacts;