import { PencilIcon } from "@heroicons/react/solid";
import SignatureModal from "./__UserSignature";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function UserWaiver({ nextStep, handleFormData, formData }) {
  const WAIVER = `**Acknowledgements**\n\nYou acknowledge and accept that climbing/bouldering is a dangerous recreational activity with obvious risks. You are participating at your own risk.\n\nOne Up Bouldering provides a safe environment to all participants and utilises state of the art equipment to ensure the safety of all its members. However, as bouldering is inherently a dangerous recreational activity, it is a requirement that all participants sign the waiver below.\n\nParticipants under the age of 18 must have their parent or legal guardian fill out and sign the waiver below.\n\nBouldering may involve incidental and significant risks which may cause physical or psychological injuries and in extreme circumstances, death.\n\nThis waiver excludes any liability for the personal injury which might be incurred by One Up Bouldering, its employees, agents and representatives arising out of your voluntary participation in the activities offered at One Up Bouldering.\n\nBy completing this form, you will accept the terms and conditions and will be agreeing to exclude and limit One Up Bouldering’s liability.\n\nYou are not obligated to sign or waive the liability under this form, however, should you not agree to this waiver, One Up Bouldering may refuse to provide you with its services and access to the premises.\n\n**Waiver**\n\nI have been advised of the risks and dangers of bouldering and wish to participate at my own risk of injury.\n\nI understand that bouldering and the use of the equipment at One Up Bouldering could result in physical and psychological injuries and in extreme circumstances, death.\n\nI do not suffer from any medical condition or any other condition that may affect my ability to participate in bouldering safely. I assume the risk of injury to my health and safety.\n\nI agree not to participate in activities whilst under the influence of drugs of alcohol.\n\nI understand and accept the responsibility to review and comply with the rules and regulations, including any changes to these, at One Up Bouldering.\n\nI am aware that this waiver is ongoing and will continue to apply to all future occasions I participate with One Up Bouldering.\n\nI am at least 18 years of age and have legal capacity to sign this form or I am a parent or legal guardian responsible for the participant who is under the age of 18 years old.\n\nI hereby indemnify and release One Up Bouldering, its directors, its employees, agents and representatives involved in my participation of the recreational activities offered from any legal costs, demand, action or claim for compensation whether for personal injury or damage to property arising from my participation of the activities.`;

  const DECLARATION = `I have read and understood this form and the terms contained herein and have been provided with clarification on any concerns that I may have in relation to this.`;

  const [modalOpen, setModalOpen] = useState(false);

  const signatureProps = {
    modalOpen,
    setModalOpen,
    nextStep,
    formData,
    handleFormData,
  };

  return (
    <>
      {modalOpen && <SignatureModal {...signatureProps} />}
      <div className="h-screen bg-gray-900 flex flex-col justify-center items-center text-center lg:px-8 lg:overflow-hidden">
        <div className="max-h-screen px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-center lg:items-center">
          <div className="sm:py-12 lg:py-24">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-6xl xl:text-6xl">
              <span className="pb-3 block bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-green-400 sm:pb-5">
                Digital Waiver
              </span>
            </h1>
            <div className="max-h-screen-2/3 mt-2 p-10 overflow-y-scroll bg-gray-100 rounded-lg text-left">
              <h6 className="mb-4 text-md font-bold text-green-400">PLEASE READ CAREFULLY</h6>
              <ReactMarkdown className="whitespace-pre-wrap">{WAIVER}</ReactMarkdown>
              <div className="mt-4 py-4 space-y-4 bg-gray-100 rounded-lg text-center">
                <p className="block text-sm text-gray-700">{DECLARATION}</p>
                <div className="flex justify-center">
                  {!modalOpen && (
                    <>
                      <button
                        onClick={() => setModalOpen(true)}
                        className="mx-2 inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <PencilIcon
                          className="h-5 w-4 mr-1 text-green-200 group-hover:text-green-400"
                          aria-hidden="true"
                        />
                        Signature Canvas
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
