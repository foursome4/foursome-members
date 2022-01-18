// import { CharacteristcsForm } from "../../components/CharacteristcsForm/CharacteristcsForm"
import { InformationsForm } from "../../components/InformationsForm/InformationsForm"
// import { PreferencesForm } from "../../components/PreferencesForm/PreferencesForm"
import './completeRegistration.css'

function CompleteRegistration() {
    return (
        <div className="content">
            <div className="registration2">
                {/* <PreferencesForm /> */}
                <InformationsForm />
                {/* <CharacteristcsForm /> */}
            </div>
        </div>
    )
}

export {CompleteRegistration}