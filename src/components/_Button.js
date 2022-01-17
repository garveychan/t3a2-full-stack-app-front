import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerThird } from "@fortawesome/pro-duotone-svg-icons";

export default function Button({
  props: { disable, classNames, ...rest },
  children,
}) {
  return (
    <button
      type="submit"
      data-cy="submit-button"
      className={`${classNames} disabled:opacity-70 disabled:cursor-default`}
      disabled={disable}
      {...rest}
    >
      {disable ? (
        <FontAwesomeIcon icon={faSpinnerThird} className="animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}
