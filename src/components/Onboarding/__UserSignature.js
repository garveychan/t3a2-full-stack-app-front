import SignatureCanvas from "react-signature-canvas";
import { Fragment, useState, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function SignatureModal({
  modalOpen: open,
  setModalOpen: setOpen,
  formData,
  handleFormData,
  nextStep,
}) {
  const signatureCanvas = useRef(null);
  const signerNameRef = useRef();

  const [signature, setSignature] = useState(null);
  const [signatureURI, setSignatureURI] = useState(null);
  const [signerName, setSignerName] = useState("");

  const handleChange = () => {
    setSignerName(signerNameRef.current.value);
    setSignature(signatureCanvas.current.toData());
    setSignatureURI(signatureCanvas.current.toDataURL());
  };

  const handleReset = () => {
    setSignerName("");
    setSignature(null);
    setSignatureURI(null);
    handleFormData({
      target: { name: "waiverName", value: null },
    });
    handleFormData({
      target: { name: "waiverSignature", value: null },
    });
    handleFormData({
      target: { name: "waiverSignatureURI", value: null },
    });
    signatureCanvas.current.clear();
  };

  const handleSave = () => {
    handleFormData({
      target: { name: "waiverName", value: signerName },
    });
    handleFormData({
      target: { name: "waiverSignature", value: signature },
    });
    handleFormData({
      target: { name: "waiverSignatureURI", value: signatureURI },
    });
    setOpen(false)
  };

  useEffect(() => {
    setSignerName(formData.waiverName);
    setSignature(formData.waiverSignature);
    setSignatureURI(formData.waiverSignatureURI);
    if (formData.waiverSignature) signatureCanvas.current.fromData(formData.waiverSignature);
  }, [formData.waiverSignature, formData.waiverSignatureURI, formData.waiverName]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* center the modal */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-center bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="flex flex-col space-y-4 items-center justify-center text-center">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    Please sign here and enter your name below.
                  </label>
                  <SignatureCanvas
                    penColor="black"
                    canvasProps={{
                      width: 320,
                      height: 200,
                      className:
                        "sigCanvas border-2 border-gray-300 hover:border-green-300 rounded-md",
                    }}
                    onEnd={handleChange}
                    ref={signatureCanvas}
                  />
                  <div className="w-3/4">
                    <input
                      type="text"
                      name="signerName"
                      id="signer-name"
                      ref={signerNameRef}
                      value={signerName}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-green-300 focus:border-green-300 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:col-start-2 sm:text-sm"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
