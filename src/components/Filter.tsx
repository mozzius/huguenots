import React, { Fragment, useReducer } from "react";
import { IoChevronDown as ChevronIcon } from "react-icons/io5";
import classes from "./filter.module.css";

const useToggle = () => {
  return useReducer<React.ReducerWithoutAction<boolean>>(
    (state) => !state,
    false
  );
};

export type Options =
  | string[]
  | { [key: string]: (string | { [key: string]: string[] })[] };

interface Props {
  label: string;
  options: Options;
  values: string[];
  selectOptions: (select: string) => void;
}

export const Filter = ({ label, options, values, selectOptions }: Props) => {
  const [isOpen, toggle] = useToggle();

  return (
    <div className={classes.container}>
      <div className={classes.filter} onClick={toggle}>
        <p>{label}</p>
        <ChevronIcon
          className={`${classes.chevron} ${isOpen ? classes.active : ""}`}
        />
      </div>
      {isOpen && (
        <div className={classes.options}>
          {Array.isArray(options)
            ? options.map((option) => (
                <FilterOption
                  label={option}
                  key={option}
                  values={values}
                  selectOptions={selectOptions}
                />
              ))
            : Object.entries(options).map(([title, options]) => (
                <Fragment key={title}>
                  <h3>{title}</h3>
                  {options.map((option) =>
                    typeof option === "string" ? (
                      <FilterOption
                        label={option}
                        key={option}
                        values={values}
                        selectOptions={selectOptions}
                      />
                    ) : (
                      Object.entries(option).map(([parent, children]) => (
                        <FilterOption
                          label={parent}
                          key={parent}
                          values={values}
                          selectOptions={selectOptions}
                        >
                          {children.map((child) => (
                            <FilterOption
                              label={child}
                              key={child}
                              values={values}
                              selectOptions={selectOptions}
                            />
                          ))}
                        </FilterOption>
                      ))
                    )
                  )}
                </Fragment>
              ))}
        </div>
      )}
    </div>
  );
};

interface FilterOptionProps {
  label: string;
  children?: React.ReactNode;
  onClick?: () => void;
  values: string[];
  selectOptions: (select: string) => void;
}

const FilterOption = ({
  label,
  children,
  values,
  selectOptions,
}: FilterOptionProps) => {
  return (
    <>
      <label className={classes.option}>
        <input
          type="checkbox"
          checked={values.includes(label)}
          onChange={() => selectOptions(label)}
        />
        <span>{label}</span>
      </label>
      {children && <div className={classes.children}>{children}</div>}
    </>
  );
};
