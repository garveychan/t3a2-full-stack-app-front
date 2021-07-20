import SignatureModal from "./__UserSignature";
import { useState } from "react";

export default function UserWaiver({ prevStep, nextStep, handleChange }) {
  const ACKNOWLEDGEMENTS = `
  You acknowledge and accept that climbing/bouldering is a dangerous recreational activity with obvious risks. You are participating at your own risk.
  One Up Bouldering provides a safe environment to all participants and utilises state of the art equipment to ensure the safety of all its members. However, as bouldering is inherently a dangerous recreational activity, it is a requirement that all participants sign the waiver below.
  Participants under the age of 18 must have their parent or legal guardian fill out and sign the waiver below.
  Bouldering may involve incidental and significant risks which may cause physical or psychological injuries and in extreme circumstances, death.
  This waiver excludes any liability for the personal injury which might be incurred by One Up Bouldering, its employees, agents and representatives arising out of your voluntary participation in the activities offered at One Up Bouldering.
  By completing this form, you will accept the terms and conditions and will be agreeing to exclude and limit One Up Bouldering’s liability. You are not obligated to sign or waive the liability under this form, however, should you not agree to this waiver, One Up Bouldering may refuse to provide you with its services and access to the premises.
  `;

  const WAIVER = `
  I have been advised of the risks and dangers of bouldering and wish to participate at my own risk of injury.
  I understand that bouldering and the use of the equipment at One Up Bouldering could result in physical and psychological injuries and in extreme circumstances, death.
  I do not suffer from any medical condition or any other condition that may affect my ability to participate in bouldering safely. I assume the risk of injury to my health and safety.
  I agree not to participate in activities whilst under the influence of drugs of alcohol.
  I understand and accept the responsibility to review and comply with the rules and regulations, including any changes to these, at One Up Bouldering.
  I am aware that this waiver is ongoing and will continue to apply to all future occasions I participate with One Up Bouldering.
  I am at least 18 years of age and have legal capacity to sign this form or I am a parent or legal guardian responsible for the participant who is under the age of 18 years old.
  I hereby indemnify and release One Up Bouldering, its directors, its employees, agents and representatives involved in my participation of the recreational activities offered from any legal costs, demand, action or claim for compensation whether for personal injury or damage to property arising from my participation of the activities.
  `;

  const DECLARATION = `I have read and understood this form and the terms contained herein and have been provided with clarification on any concerns that I may have in relation to this.`;

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {modalOpen && (
        <SignatureModal modalOpen={modalOpen} setModalOpen={setModalOpen} nextStep={nextStep} />
      )}
      <div className="max-h-screen px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-center lg:items-center">
        <div className="sm:py-12 lg:py-24">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-6xl xl:text-6xl">
            <span className="pb-3 block bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-green-400 sm:pb-5">
              Acknowledgements
            </span>
          </h1>
          <div className="max-h-screen-2/3 mt-2 p-10 overflow-y-scroll bg-gray-100 rounded-lg text-left">
            <h6 className="text-md font-bold text-green-400">PLEASE READ CAREFULLY</h6>
            <div className="my-2">
              <h3 className="block text-lg font-medium text-gray-700">Acknowledgements</h3>
              <p className="block text-sm font-light text-gray-700">{ACKNOWLEDGEMENTS}</p>
            </div>
            <div className="my-4">
              <h3 className="block text-lg font-medium text-gray-700">Waiver</h3>
              <p className="block text-sm font-light text-gray-700">{WAIVER}</p>
            </div>
            <div className="mt-4 py-4 space-y-4 bg-gray-100 rounded-lg text-center">
              <p className="block text-sm text-gray-700">{DECLARATION}</p>
              <div className="flex justify-center">
                {!modalOpen && (
                  <>
                    <button
                      onClick={prevStep}
                      className="mx-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setModalOpen(true)}
                      className="mx-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Signature
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
