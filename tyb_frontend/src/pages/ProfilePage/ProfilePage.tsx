import React, {useContext} from 'react';
import './ProfilePage.scss';
import {AuthContext} from "../../AuthContext";
import PageTitle from "../../components/PageTitle/PageTitle";
import InputTextComponent from "../../components/form-fields/InputTextComponent/InputTextComponent";


const ProfilePage = () => {

    const {user} = useContext(AuthContext);
    return (
        <div>
            <PageTitle title={"Dettaglio Profilo"}/>

            <div className="d-flex justify-content-around mt-5">
                    <div>
                        <InputTextComponent name={"username"} label={"Username"} type={"text"} value={user.username}
                                            disabled={true} />
                        <InputTextComponent name={"name"} label={"Nome"} type={"text"} value={user.name} disabled={true}/>
                        <InputTextComponent name={"surname"} label={"Cognome"} type={"text"} value={user.surname}
                                            disabled={true} />
                        <InputTextComponent name={"email"} label={"Email"} type={"text"} value={user.email} disabled={true}
                                           />
                        <InputTextComponent name={"role"} label={"Ruolo"} type={"text"} value={user.role} disabled={true}
                                           />
                    </div>
            </div>


        </div>
    );
};

export default ProfilePage;

// Esempio di utilizzo del componente UserProfile
// import UserProfile from './UserProfile';

// const user = {
//   name: 'John Doe',
//   email: 'johndoe@example.com',
//   profilePicture: 'https://example.com/johndoe.jpg',
//   bio: 'Software engineer with a passion for open source projects and community building.',
// };

// function App() {
//   return (
//     <div>
//       <UserProfile user={user} />
//     </div>
//   );
// }

// export default App;
