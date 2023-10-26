import { Component } from "react"
import { styled } from "styled-components";
import { AddContact } from "./AddContact/AddContact";
import { nanoid } from "nanoid";
import { ContactsList } from "./ContactsList/ContactsList";
import { FilterContacts } from "./FilterContacts/FilterContacts";


const Wrapper = styled.div`
padding: 30px;
`

export class App extends Component {
  
 state = {
   contacts: [],
  filter: ''
}
  
  componentDidMount() {
    const stringifiedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(stringifiedContacts) ?? this.state.contacts;

    this.setState({ contacts: parsedContacts });
  }
  
 componentDidUpdate(_, prevState) {
    if(prevState.contacts !== this.state.contacts) {
     const stringifiedContacts = JSON.stringify(this.state.contacts);
     localStorage.setItem('contacts', stringifiedContacts);
    }
  }

  handleAddContact = contactData => {
    const isExist = this.state.contacts.some(
      contact => contact.name === contactData.name);
    if (isExist) {
    alert(`${contactData.name} is already in contacts.`);
    return
    };
    const finalContact = {
      ...contactData,
      id: nanoid(),
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, finalContact],
    }));
  };

  handleDeleteContact = (contactId) => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== contactId),
    });
  };
  

  filteredContacts = () => this.state.contacts.filter(contact => contact.name.toLowerCase().includes(this.state.filter.toLowerCase()));
  
  addToFilter = value => this.setState({
      filter: value,
    });
  
  render() {
    return (<Wrapper>
      <h1>Phonebook</h1>
      <AddContact handleAddContact={this.handleAddContact} />
      <h2>Contacts</h2>
      <FilterContacts addToFilter={this.addToFilter} />
      <ContactsList filteredContacts={this.filteredContacts()} handleDeleteContact={this.handleDeleteContact} />
    </Wrapper>
    )
  }
}