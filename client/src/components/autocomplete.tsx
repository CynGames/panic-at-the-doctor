import classNames from "classnames";
import React, {memo, useRef, useState} from "react";

type Props = {
  items: {
    key: string,
    value: string
  }[];
  value: null | string;
  onChange(item: {
    key: string,
    value: string
  }): void;
};

export const Autocomplete = memo((props: Props) => {
  const {items, value, onChange} = props;
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  
  return (
    <div
      className={classNames({
        "dropdown w-full": true,
        "dropdown-open": open,
      })}
      ref={ref}
    >
      <input
        type="text"
        readOnly={true}
        disabled={!items.length}
        className="input input-bordered w-full"
        value={items.find((item) => {
          return item.key === value;
        })?.value ?? ""}
        placeholder={items.length ? "Select doctor..." : "No doctors available"}
        tabIndex={0}
      />
      {items.length ? (<div className="dropdown-content bg-base-200 top-14 max-h-96 overflow-auto flex-col rounded-md">
        <ul
          className="menu menu-compact "
          // use ref to calculate the width of parent
          style={{width: ref.current?.clientWidth}}
        >
          {items.map((item, index) => {
            return (
              <li
                key={index}
                tabIndex={index + 1}
                onClick={() => {
                  onChange(item);
                  setOpen(false);
                }}
                className="border-b border-b-base-content/10 w-full"
              >
                <button>{item.value}</button>
              </li>
            );
          })}
        </ul>
      </div>) : null}
    </div>
  );
});
