import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useMyContext } from "../../pages/Home";

function useOnclickOutside(ref: any) {
  const { setListOptions } = useMyContext();
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setListOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setListOptions]);
}

function OnClickOutside(props: any) {
  const wrapperRef = useRef(null);
  useOnclickOutside(wrapperRef);

  return <div ref={wrapperRef}>{props.children}</div>;
}

OnClickOutside.propTypes = {
  children: PropTypes.element.isRequired,
};

export default OnClickOutside;
